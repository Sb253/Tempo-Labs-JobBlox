# Construction Management CRM

A multi-tenant SaaS CRM designed specifically for construction companies to manage clients, projects, and workflows with company-specific data isolation.

## Features

- Dashboard with key metrics (active projects, upcoming deadlines, client status)
- Project management module with Gantt charts and resource allocation
- Client portal with document sharing and approval workflows
- Multi-tenant architecture with complete data separation between companies
- Role-based permissions system for different team members (admin, project manager, field worker)

## System Architecture

```mermaid
graph TD
    A[User Login] --> B{Authenticate}
    B -->|Success| C{User Role}
    B -->|Failure| D[Show Error Message]
    D --> A
    
    C -->|Admin| E[Admin Dashboard]
    C -->|Project Manager| F[PM Dashboard]
    C -->|Field Worker| G[Field Dashboard]
    
    subgraph Admin Actions
      E --> E1[Manage Users]
      E --> E2[Company Settings]
      E --> E3[View All Projects]
      E --> E4[View All Clients]
      E --> E5[Access Reports]
    end
    
    subgraph Project Manager Actions
      F --> F1[View Assigned Projects]
      F --> F2[Manage Project Timeline]
      F --> F3[Resource Allocation]
      F --> F4[Client Communication]
      F --> F5[Document Management]
    end
    
    subgraph Field Worker Actions
      G --> G1[View Assigned Tasks]
      G --> G2[Update Task Status]
      G --> G3[Upload Site Photos]
      G --> G4[Log Time/Materials]
    end
    
    E3 --> H[Project Dashboard]
    F1 --> H
    E4 --> I[Client Management]
    F4 --> I
    
    subgraph Project Management
      H --> H1[Gantt Chart View]
      H --> H2[Task Assignment]
      H --> H3[Progress Tracking]
      H --> H4[Document Repository]
      H --> H5[Client Approval Workflow]
    end
    
    subgraph Client Portal
      J[Client Login] --> K{Authenticate Client}
      K -->|Success| L[Client Dashboard]
      K -->|Failure| M[Client Error Message]
      M --> J
      L --> L1[View Project Status]
      L --> L2[Access Shared Documents]
      L --> L3[Approval Requests]
      L --> L4[Communication Thread]
    end
    
    H5 --> L3
    L3 -->|Approved| N[Update Project Status]
    L3 -->|Rejected| O[Notification to Project Manager]
    O --> F4
    
    I --> I1[Client Details]
    I --> I2[Project History]
    I --> I3[Communication Log]
    I --> I4[Document Sharing]
    
    I4 --> H4
    I4 --> L2
```

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: ShadCN/UI + Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **State Management**: React Context
- **Authentication**: Custom Auth Context

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Development

This project uses Vite for fast development and hot module replacement (HMR).

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── clients/        # Client portal components
│   ├── dashboard/      # Dashboard components
│   ├── projects/       # Project management components
│   ├── integrations/   # Integration management
│   └── ui/            # Reusable UI components
├── contexts/          # React contexts
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```
