// Data validation utilities for multi-tenant SaaS
import {
  JsonSchema,
  ValidationResult,
  ValidationError,
  ValidationWarning,
} from "../types/backend";

// Tenant isolation validation
export const validateTenantIsolation = (
  data: any,
  expectedTenantId: string,
  context: { userId: string; sessionId: string; traceId: string },
): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Recursively check for tenant ID fields
  const checkTenantId = (obj: any, path: string = "") => {
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => checkTenantId(item, `${path}[${index}]`));
      } else {
        Object.keys(obj).forEach((key) => {
          const currentPath = path ? `${path}.${key}` : key;

          if (key === "tenantId" && obj[key] !== expectedTenantId) {
            errors.push({
              field: currentPath,
              code: "TENANT_ISOLATION_VIOLATION",
              message: `Data contains tenantId '${obj[key]}' but expected '${expectedTenantId}'`,
              value: obj[key],
              constraint: `tenantId must equal '${expectedTenantId}'`,
            });

            console.error("CRITICAL: Tenant isolation violation detected", {
              path: currentPath,
              expectedTenantId,
              foundTenantId: obj[key],
              ...context,
            });
          }

          checkTenantId(obj[key], currentPath);
        });
      }
    }
  };

  checkTenantId(data);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    schema: "tenant-isolation-v1",
    version: "1.0.0",
  };
};

// JSON Schema validator
export class SchemaValidator {
  private schemas: Map<string, JsonSchema> = new Map();

  registerSchema(name: string, schema: JsonSchema) {
    this.schemas.set(name, schema);
    console.info("Schema registered", { name, version: schema.$schema });
  }

  validate(data: any, schemaName: string, context?: any): ValidationResult {
    const schema = this.schemas.get(schemaName);
    if (!schema) {
      return {
        isValid: false,
        errors: [
          {
            field: "schema",
            code: "SCHEMA_NOT_FOUND",
            message: `Schema '${schemaName}' not found`,
            value: schemaName,
          },
        ],
        warnings: [],
        schema: schemaName,
        version: "unknown",
      };
    }

    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    this.validateObject(data, schema, "", errors, warnings, context);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      schema: schemaName,
      version: schema.$schema,
    };
  }

  private validateObject(
    data: any,
    schema: JsonSchema,
    path: string,
    errors: ValidationError[],
    warnings: ValidationWarning[],
    context?: any,
  ) {
    if (schema.type === "object" && typeof data === "object" && data !== null) {
      // Check required properties
      if (schema.required) {
        schema.required.forEach((prop) => {
          if (!(prop in data)) {
            errors.push({
              field: path ? `${path}.${prop}` : prop,
              code: "REQUIRED_FIELD_MISSING",
              message: `Required field '${prop}' is missing`,
              constraint: "required",
            });
          }
        });
      }

      // Validate properties
      if (schema.properties) {
        Object.keys(schema.properties).forEach((prop) => {
          if (prop in data) {
            const propPath = path ? `${path}.${prop}` : prop;
            this.validateProperty(
              data[prop],
              schema.properties![prop],
              propPath,
              errors,
              warnings,
              context,
            );
          }
        });
      }

      // Check for additional properties
      if (schema.additionalProperties === false) {
        Object.keys(data).forEach((prop) => {
          if (schema.properties && !(prop in schema.properties)) {
            warnings.push({
              field: path ? `${path}.${prop}` : prop,
              code: "ADDITIONAL_PROPERTY",
              message: `Additional property '${prop}' found`,
              suggestion: "Remove this property or update the schema",
            });
          }
        });
      }
    } else if (schema.type !== typeof data) {
      errors.push({
        field: path,
        code: "TYPE_MISMATCH",
        message: `Expected type '${schema.type}' but got '${typeof data}'`,
        value: data,
        constraint: `type: ${schema.type}`,
      });
    }
  }

  private validateProperty(
    value: any,
    schema: any,
    path: string,
    errors: ValidationError[],
    warnings: ValidationWarning[],
    context?: any,
  ) {
    // Type validation
    const expectedTypes = Array.isArray(schema.type)
      ? schema.type
      : [schema.type];
    const actualType = Array.isArray(value) ? "array" : typeof value;

    if (!expectedTypes.includes(actualType)) {
      errors.push({
        field: path,
        code: "TYPE_MISMATCH",
        message: `Expected type(s) ${expectedTypes.join(", ")} but got '${actualType}'`,
        value,
        constraint: `type: ${expectedTypes.join(" | ")}`,
      });
      return;
    }

    // String validations
    if (typeof value === "string") {
      if (schema.minLength && value.length < schema.minLength) {
        errors.push({
          field: path,
          code: "MIN_LENGTH",
          message: `String length ${value.length} is less than minimum ${schema.minLength}`,
          value,
          constraint: `minLength: ${schema.minLength}`,
        });
      }

      if (schema.maxLength && value.length > schema.maxLength) {
        errors.push({
          field: path,
          code: "MAX_LENGTH",
          message: `String length ${value.length} exceeds maximum ${schema.maxLength}`,
          value,
          constraint: `maxLength: ${schema.maxLength}`,
        });
      }

      if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
        errors.push({
          field: path,
          code: "PATTERN_MISMATCH",
          message: `String does not match required pattern`,
          value,
          constraint: `pattern: ${schema.pattern}`,
        });
      }

      if (schema.format) {
        this.validateFormat(value, schema.format, path, errors, warnings);
      }
    }

    // Number validations
    if (typeof value === "number") {
      if (schema.minimum !== undefined && value < schema.minimum) {
        errors.push({
          field: path,
          code: "MINIMUM",
          message: `Value ${value} is less than minimum ${schema.minimum}`,
          value,
          constraint: `minimum: ${schema.minimum}`,
        });
      }

      if (schema.maximum !== undefined && value > schema.maximum) {
        errors.push({
          field: path,
          code: "MAXIMUM",
          message: `Value ${value} exceeds maximum ${schema.maximum}`,
          value,
          constraint: `maximum: ${schema.maximum}`,
        });
      }
    }

    // Enum validation
    if (schema.enum && !schema.enum.includes(value)) {
      errors.push({
        field: path,
        code: "ENUM_MISMATCH",
        message: `Value must be one of: ${schema.enum.join(", ")}`,
        value,
        constraint: `enum: [${schema.enum.join(", ")}]`,
      });
    }

    // Array validation
    if (Array.isArray(value) && schema.items) {
      value.forEach((item, index) => {
        this.validateProperty(
          item,
          schema.items,
          `${path}[${index}]`,
          errors,
          warnings,
          context,
        );
      });
    }

    // Object validation
    if (typeof value === "object" && value !== null && schema.properties) {
      this.validateObject(value, schema, path, errors, warnings, context);
    }
  }

  private validateFormat(
    value: string,
    format: string,
    path: string,
    errors: ValidationError[],
    warnings: ValidationWarning[],
  ) {
    const formatValidators: Record<string, RegExp> = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      uri: /^https?:\/\/.+/,
      "date-time": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      date: /^\d{4}-\d{2}-\d{2}$/,
      time: /^\d{2}:\d{2}:\d{2}$/,
      uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      phone: /^\+?[1-9]\d{1,14}$/,
    };

    const validator = formatValidators[format];
    if (validator && !validator.test(value)) {
      errors.push({
        field: path,
        code: "FORMAT_INVALID",
        message: `Value does not match required format '${format}'`,
        value,
        constraint: `format: ${format}`,
      });
    }
  }
}

// Data sanitization utilities
export const sanitizeData = (data: any, rules: any): any => {
  if (!data || typeof data !== "object") {
    return data;
  }

  const sanitized = Array.isArray(data) ? [...data] : { ...data };

  Object.keys(sanitized).forEach((key) => {
    const value = sanitized[key];

    if (typeof value === "string") {
      // Strip HTML tags
      if (rules.stripHtml?.includes(key)) {
        sanitized[key] = value.replace(/<[^>]*>/g, "");
      }

      // Trim whitespace
      if (rules.trimWhitespace?.includes(key)) {
        sanitized[key] = value.trim();
      }

      // Convert to lowercase
      if (rules.toLowerCase?.includes(key)) {
        sanitized[key] = value.toLowerCase();
      }

      // Normalize email
      if (rules.normalizeEmail?.includes(key)) {
        sanitized[key] = value.toLowerCase().trim();
      }

      // Sanitize phone number
      if (rules.sanitizePhone?.includes(key)) {
        sanitized[key] = value.replace(/[^\d+]/g, "");
      }

      // Remove special characters
      if (rules.removeSpecialChars?.includes(key)) {
        sanitized[key] = value.replace(/[^a-zA-Z0-9\s]/g, "");
      }
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeData(value, rules);
    }
  });

  return sanitized;
};

// Create global schema validator instance
export const globalValidator = new SchemaValidator();

// Register common schemas
globalValidator.registerSchema("user", {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    firstName: { type: "string", minLength: 1, maxLength: 50 },
    lastName: { type: "string", minLength: 1, maxLength: 50 },
    role: {
      type: "string",
      enum: [
        "owner",
        "admin",
        "manager",
        "field_worker",
        "sales_rep",
        "subcontractor",
      ],
    },
    tenantId: { type: "string", format: "uuid" },
    status: { type: "string", enum: ["active", "inactive", "suspended"] },
  },
  required: [
    "id",
    "email",
    "firstName",
    "lastName",
    "role",
    "tenantId",
    "status",
  ],
  additionalProperties: false,
});

globalValidator.registerSchema("customer", {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    tenantId: { type: "string", format: "uuid" },
    name: { type: "string", minLength: 1, maxLength: 100 },
    email: { type: "string", format: "email" },
    phone: { type: "string", format: "phone" },
    type: { type: "string", enum: ["residential", "commercial", "industrial"] },
    status: {
      type: "string",
      enum: ["active", "inactive", "prospect", "archived"],
    },
  },
  required: ["id", "tenantId", "name", "email", "type", "status"],
  additionalProperties: false,
});

export default {
  validateTenantIsolation,
  SchemaValidator,
  sanitizeData,
  globalValidator,
};
