import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Chip,
  Surface,
  useTheme,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const LandingScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [activeFeature, setActiveFeature] = useState(0);

  const features: Feature[] = [
    {
      icon: "view-dashboard",
      title: "Project Management",
      description:
        "Comprehensive project tracking with Gantt charts and milestone management",
      color: theme.colors.primary,
    },
    {
      icon: "account-group",
      title: "Team Collaboration",
      description:
        "Real-time communication and task assignment for your entire team",
      color: theme.colors.secondary,
    },
    {
      icon: "calendar-clock",
      title: "Smart Scheduling",
      description: "AI-powered scheduling optimization and resource allocation",
      color: theme.colors.tertiary,
    },
    {
      icon: "chart-line",
      title: "Advanced Analytics",
      description: "Detailed insights and reporting for data-driven decisions",
      color: "#10b981",
    },
    {
      icon: "shield-check",
      title: "Enterprise Security",
      description: "Bank-level security with multi-tenant data isolation",
      color: "#f59e0b",
    },
    {
      icon: "cellphone-link",
      title: "Mobile First",
      description:
        "Native mobile apps for iOS and Android with offline support",
      color: "#ef4444",
    },
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: [
        "Up to 5 projects",
        "10 team members",
        "Basic reporting",
        "Email support",
        "Mobile app access",
      ],
      color: theme.colors.primary,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: [
        "Unlimited projects",
        "50 team members",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom integrations",
      ],
      popular: true,
      color: theme.colors.secondary,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: [
        "Everything in Pro",
        "Unlimited users",
        "White-label solution",
        "Dedicated support",
        "Custom development",
        "SLA guarantee",
      ],
      color: theme.colors.tertiary,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "BuildCorp Inc.",
      content:
        "JobBlox transformed how we manage our construction projects. The mobile app keeps our field teams connected.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Mike Chen",
      role: "CEO",
      company: "Urban Builders",
      content:
        "The analytics and reporting features have given us insights we never had before. ROI was immediate.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
      name: "Lisa Rodriguez",
      role: "Operations Director",
      company: "Skyline Construction",
      content:
        "Customer communication has never been easier. Our clients love the transparency and real-time updates.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    },
  ];

  const handleGetStarted = () => {
    navigation.navigate("Login" as never);
  };

  const handleWatchDemo = () => {
    // Handle demo video or navigation
    console.log("Watch demo pressed");
  };

  const renderHeader = () => (
    <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.headerContent}>
        <View style={styles.logo}>
          <Icon name="domain" size={32} color={theme.colors.primary} />
          <Text style={[styles.logoText, { color: theme.colors.onSurface }]}>
            JobBlox
          </Text>
        </View>
        <TouchableOpacity onPress={handleGetStarted}>
          <Text style={[styles.signInText, { color: theme.colors.primary }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </Surface>
  );

  const renderHero = () => (
    <LinearGradient
      colors={[
        `${theme.colors.primary}15`,
        `${theme.colors.secondary}15`,
        `${theme.colors.tertiary}15`,
      ]}
      style={styles.heroSection}
    >
      <View style={styles.heroContent}>
        <Chip
          icon="lightning-bolt"
          style={[
            styles.heroChip,
            { backgroundColor: `${theme.colors.primary}20` },
          ]}
          textStyle={{ color: theme.colors.primary }}
        >
          Now with AI-Powered Insights
        </Chip>

        <Title style={[styles.heroTitle, { color: theme.colors.onSurface }]}>
          Construction Management{" "}
          <Text style={{ color: theme.colors.primary }}>Made Simple</Text>
        </Title>

        <Paragraph
          style={[
            styles.heroDescription,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          Streamline your construction projects with our all-in-one platform.
          From project planning to client communication, JobBlox has everything
          you need to build success.
        </Paragraph>

        <View style={styles.heroButtons}>
          <Button
            mode="contained"
            onPress={handleGetStarted}
            style={[
              styles.primaryButton,
              { backgroundColor: theme.colors.primary },
            ]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Start Free Trial
          </Button>

          <Button
            mode="outlined"
            onPress={handleWatchDemo}
            style={styles.secondaryButton}
            contentStyle={styles.buttonContent}
            labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
            icon="play"
          >
            Watch Demo
          </Button>
        </View>

        <Text
          style={[styles.heroSubtext, { color: theme.colors.onSurfaceVariant }]}
        >
          No credit card required • 14-day free trial • Cancel anytime
        </Text>
      </View>
    </LinearGradient>
  );

  const renderFeatures = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Title style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          Everything You Need
        </Title>
        <Paragraph
          style={[
            styles.sectionDescription,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          Powerful features designed specifically for construction companies
        </Paragraph>
      </View>

      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCardContainer}
            onPress={() => setActiveFeature(index)}
            activeOpacity={0.7}
          >
            <Card
              style={[
                styles.featureCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor:
                    activeFeature === index
                      ? feature.color
                      : theme.colors.outline,
                  borderWidth: activeFeature === index ? 2 : 1,
                },
              ]}
              elevation={activeFeature === index ? 8 : 2}
            >
              <Card.Content style={styles.featureCardContent}>
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: `${feature.color}15` },
                  ]}
                >
                  <Icon name={feature.icon} size={32} color={feature.color} />
                </View>
                <Title
                  style={[
                    styles.featureTitle,
                    { color: theme.colors.onSurface },
                  ]}
                >
                  {feature.title}
                </Title>
                <Paragraph
                  style={[
                    styles.featureDescription,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {feature.description}
                </Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPricing = () => (
    <View
      style={[
        styles.section,
        { backgroundColor: `${theme.colors.surfaceVariant}50` },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Title style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          Simple, Transparent Pricing
        </Title>
        <Paragraph
          style={[
            styles.sectionDescription,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          Choose the perfect plan for your construction business
        </Paragraph>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pricingScroll}
      >
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            style={[
              styles.pricingCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: plan.popular ? plan.color : theme.colors.outline,
                borderWidth: plan.popular ? 2 : 1,
              },
            ]}
            elevation={plan.popular ? 8 : 2}
          >
            {plan.popular && (
              <Chip
                style={[styles.popularChip, { backgroundColor: plan.color }]}
                textStyle={{ color: "white", fontWeight: "bold" }}
              >
                Most Popular
              </Chip>
            )}

            <Card.Content style={styles.pricingCardContent}>
              <Title
                style={[styles.planName, { color: theme.colors.onSurface }]}
              >
                {plan.name}
              </Title>

              <View style={styles.priceContainer}>
                <Text style={[styles.price, { color: plan.color }]}>
                  {plan.price}
                </Text>
                <Text
                  style={[
                    styles.period,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {plan.period}
                </Text>
              </View>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.featureItem}>
                    <Icon name="check" size={16} color={plan.color} />
                    <Text
                      style={[
                        styles.featureText,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              <Button
                mode={plan.popular ? "contained" : "outlined"}
                onPress={handleGetStarted}
                style={[
                  styles.planButton,
                  plan.popular && { backgroundColor: plan.color },
                ]}
                contentStyle={styles.buttonContent}
              >
                Get Started
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );

  const renderTestimonials = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Title style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          Trusted by Industry Leaders
        </Title>
        <Paragraph
          style={[
            styles.sectionDescription,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          See what our customers have to say about JobBlox
        </Paragraph>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.testimonialsScroll}
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            style={[
              styles.testimonialCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Card.Content style={styles.testimonialContent}>
              <View style={styles.testimonialHeader}>
                <Image
                  source={{ uri: testimonial.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.testimonialInfo}>
                  <Text
                    style={[
                      styles.testimonialName,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {testimonial.name}
                  </Text>
                  <Text
                    style={[
                      styles.testimonialRole,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {testimonial.role} at {testimonial.company}
                  </Text>
                </View>
                <View style={styles.rating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="star" size={16} color="#fbbf24" />
                  ))}
                </View>
              </View>

              <Paragraph
                style={[
                  styles.testimonialText,
                  { color: theme.colors.onSurface },
                ]}
              >
                "{testimonial.content}"
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );

  const renderFooter = () => (
    <View
      style={[styles.footer, { backgroundColor: theme.colors.surfaceVariant }]}
    >
      <View style={styles.footerContent}>
        <View style={styles.footerSection}>
          <View style={styles.logo}>
            <Icon name="domain" size={24} color={theme.colors.primary} />
            <Text
              style={[styles.footerLogoText, { color: theme.colors.onSurface }]}
            >
              JobBlox
            </Text>
          </View>
          <Paragraph
            style={[
              styles.footerDescription,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            The complete construction management platform for modern builders.
          </Paragraph>
        </View>

        <View style={styles.footerLinks}>
          <TouchableOpacity style={styles.footerLink}>
            <Text
              style={[
                styles.footerLinkText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text
              style={[
                styles.footerLinkText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Terms of Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text
              style={[
                styles.footerLinkText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Support
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.copyright, { color: theme.colors.onSurfaceVariant }]}
        >
          © 2024 JobBlox. All rights reserved.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.surface}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {renderHeader()}
        {renderHero()}
        {renderFeatures()}
        {renderPricing()}
        {renderTestimonials()}
        {renderFooter()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "600",
  },
  heroSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: "center",
  },
  heroChip: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  heroDescription: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  heroButtons: {
    width: "100%",
    gap: 16,
    marginBottom: 16,
  },
  primaryButton: {
    borderRadius: 12,
  },
  secondaryButton: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  heroSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
  section: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  featureCardContainer: {
    width: width < 768 ? "100%" : "48%",
  },
  featureCard: {
    borderRadius: 16,
  },
  featureCardContent: {
    alignItems: "center",
    padding: 24,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  pricingScroll: {
    paddingLeft: 20,
  },
  pricingCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    position: "relative",
  },
  popularChip: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    zIndex: 1,
  },
  pricingCardContent: {
    padding: 24,
    paddingTop: 32,
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 24,
  },
  price: {
    fontSize: 36,
    fontWeight: "bold",
  },
  period: {
    fontSize: 16,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  planButton: {
    borderRadius: 12,
  },
  testimonialsScroll: {
    paddingLeft: 20,
  },
  testimonialCard: {
    width: 300,
    marginRight: 16,
    borderRadius: 16,
  },
  testimonialContent: {
    padding: 20,
  },
  testimonialHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  testimonialRole: {
    fontSize: 14,
  },
  rating: {
    flexDirection: "row",
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  footerContent: {
    alignItems: "center",
  },
  footerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  footerLogoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  footerDescription: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  footerLink: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  footerLinkText: {
    fontSize: 14,
  },
  copyright: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default LandingScreen;
