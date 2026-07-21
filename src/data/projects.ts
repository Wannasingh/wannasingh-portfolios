export interface Project {
  name: string;
  overview: string;
  technologies: string[];
  keyFeatures: string[];
  challenges: string[];
  solutions: string[];
  githubLink: string;
  demoLink: string;
  imagePath: string;
}

export const projects: Project[] = [
  {
    name: "wannasingh-master-data-management",
    overview: "An enterprise-grade Master Data Management system designed with Python, SQLAlchemy, and Alembic database migrations. Resolves duplicate identity records and enforces gold-record standards across distributed transactional systems.",
    technologies: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "Redis", "HashiCorp Vault", "Docker", "Jenkins CI/CD"],
    keyFeatures: [
      "Duplicate identity deduplication matching",
      "Gold-record master schema enforcement",
      "Alembic transaction-safe schema migrations",
      "HashiCorp Vault secure secrets storage integration",
      "Docker containerized staging environment",
      "Jenkins auto-build & test pipeline"
    ],
    challenges: [
      "Resolving record conflicts from legacy databases with inconsistent schema structures.",
      "Maintaining rollback capabilities during massive batch migrations."
    ],
    solutions: [
      "Developed an Alembic migration suite with robust downgrade scripts and mapped entities to SQLAlchemy core models.",
      "Built custom record merging algorithms utilizing edit-distance indexing."
    ],
    githubLink: "https://github.com/Wannasingh/wannasingh-master-data-management",
    demoLink: "#",
    imagePath: "/assets/1.png"
  },
  {
    name: "Oracle OCI Enterprise Database Architecture",
    overview: "Design and deployment of high-availability Oracle Database Services on Oracle Cloud Infrastructure (OCI). Features Active Data Guard replication, Oracle Autonomous DB instances, and secure OCI Virtual Cloud Networks (VCN).",
    technologies: ["Oracle 21c", "OCI VCN", "Active Data Guard", "Oracle Autonomous Database", "Terraform", "OCI IAM"],
    keyFeatures: [
      "Multi-region Active Data Guard disaster recovery replication",
      "Automated patching and backup configurations on OCI DB Systems",
      "Private subnet isolation architecture with OCI Security Lists",
      "Terraform infrastructure-as-code deployment scripts"
    ],
    challenges: [
      "Minimizing failover latency for transactional applications during network partitions.",
      "Enforcing strict zero-trust access permissions for DBA roles."
    ],
    solutions: [
      "Configured Fast-Start Failover (FSFO) with an OCI Observer instance across separate availability domains.",
      "Integrated OCI Identity and Access Management (IAM) with fine-grained policy control."
    ],
    githubLink: "#",
    demoLink: "#",
    imagePath: "/assets/2.png"
  },
  {
    name: "ETL-ELT Nuxt & Supabase Integration",
    overview: "High-throughput data extraction and loading pipeline built with Nuxt 3, PostgreSQL, and Supabase. Optimized for streaming data files into structured database schemas.",
    technologies: ["Nuxt.js 3", "Vue.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS", "Chart.js"],
    keyFeatures: [
      "Streaming CSV/JSON bulk upload integrations",
      "Supabase Real-time database event triggers",
      "Dynamic data transformation stages",
      "Vue Chart.js interactive data analytics dashboards"
    ],
    challenges: [
      "Handling memory leaks when processing multi-gigabyte flat files on serverless environments.",
      "Maintaining data validation consistency."
    ],
    solutions: [
      "Implemented read streaming chunks on the Node server and batched INSERT statements.",
      "Utilized PostgreSQL schema constraints and database-level validation functions."
    ],
    githubLink: "https://github.com/Wannasingh/ELT_ETL",
    demoLink: "#",
    imagePath: "/assets/3.png"
  },
  {
    name: "wannasingh-e-commerce",
    overview: "A full-stack, enterprise-grade e-commerce application. Focuses on test-driven development (TDD) using Cypress, containerized services with Docker Compose, and automated testing inside a Jenkins CI/CD pipeline.",
    technologies: ["MedusaJS v2", "Astro", "React", "Docker", "Cypress", "Jenkins", "SonarQube", "PostgreSQL", "Stripe API"],
    keyFeatures: [
      "Astro server-side rendered (SSR) catalog storefront",
      "MedusaJS headless e-commerce backend platform",
      "Cypress end-to-end integration test coverage",
      "Jenkins continuous integration pipelines",
      "SonarQube static code quality analysis",
      "Multi-container Docker Compose staging architecture"
    ],
    challenges: [
      "Reducing pipeline build and test bottlenecks in automated CI/CD steps.",
      "Ensuring database stability during load testing."
    ],
    solutions: [
      "Optimized Cypress parallel execution runs and cached node_modules inside Jenkins build layers.",
      "Configured connection pooling with PgBouncer."
    ],
    githubLink: "https://github.com/Wannasingh/wannasingh-e-comerce",
    demoLink: "https://e-commerce.wannasingh.dev",
    imagePath: "/assets/4.png"
  },
  {
    name: "BytesTutor Academic Platform",
    overview: "A comprehensive tutoring management and learning platform (TUTORA) designed with a clean API service layer and responsive client interface.",
    technologies: ["Go (Golang)", "Gin Web Framework", "pgx (PostgreSQL)", "AWS SDK Go v2", "LiveKit WebRTC", "Omise API", "Redis", "React 19", "Zustand", "TanStack React Query", "HLS.js", "Docker"],
    keyFeatures: [
      "Gin-based high-performance RESTful API backend service",
      "React 19 composition client app with Radix primitives",
      "LiveKit WebRTC integrated virtual classroom modules",
      "Interactive tutoring scheduling and booking workflows",
      "Zustand lightweight client-side state management",
      "Omise & Stripe secure payment gateway integrations",
      "AWS SDK Go v2 cloud file uploads to R2 object storage"
    ],
    challenges: [
      "Handling concurrent booking requests on popular tutoring time slots.",
      "Ensuring secure handling of private student notes."
    ],
    solutions: [
      "Utilized database transaction locks (SELECT FOR UPDATE) to prevent race conditions during booking.",
      "Implemented AES-256 field-level encryption for private notes columns."
    ],
    githubLink: "https://github.com/Wannasingh/TUTORA_GO",
    demoLink: "https://wannasingh.dev",
    imagePath: "/assets/1.png"
  },
  {
    name: "DevOps Local Developer Lab",
    overview: "A robust developer lab environment containing pre-configured Docker containers for database monitoring, application logging, and pipeline orchestration.",
    technologies: ["Docker", "Grafana", "Prometheus", "Uptime Kuma", "Nginx Proxy Manager", "GlitchTip", "Apache Atlas", "Jenkins"],
    keyFeatures: [
      "Nginx Proxy Manager domain routing",
      "Grafana database performance dashboard",
      "Prometheus resource usage scraper metrics",
      "Uptime Kuma latency and health monitor alerts",
      "GlitchTip real-time error tracking and exception capturing",
      "Apache Atlas data governance metadata tracking"
    ],
    challenges: [
      "Configuring seamless inter-container routing and domain mapping on localhost.",
      "Managing memory constraints when running multiple heavy services simultaneously."
    ],
    solutions: [
      "Created isolated Docker networks with local DNS routing via dnsmasq.",
      "Tuned JVM parameters for Jenkins and Apache Atlas containers to run in low-memory profiles."
    ],
    githubLink: "#",
    demoLink: "https://jenkins.wannasingh.dev",
    imagePath: "/assets/2.png"
  },
  {
    name: "note-app",
    overview: "A monorepo note-taking application designed for high developer productivity. Leverages Supabase backend services, real-time sync, and Next.js frontend pages.",
    technologies: ["C# ASP.NET Core", "Supabase", "React Native", "Expo", "TypeScript", "Tailwind CSS", "Turborepo"],
    keyFeatures: [
      "C# ASP.NET Core REST API controller service",
      "Expo React Native cross-platform mobile client",
      "Turborepo fast incremental caching builds",
      "Supabase real-time row synchronization",
      "Markdown parsing notes canvas",
      "Supabase Auth authentication integration"
    ],
    challenges: [
      "Managing complex build dependencies between frontend and backend in a monorepo structure.",
      "Implementing low-latency notes syncing."
    ],
    solutions: [
      "Configured workspace dependencies and shared package structures via npm workspaces.",
      "Leveraged Supabase realtime-js subscription listeners."
    ],
    githubLink: "#",
    demoLink: "#",
    imagePath: "/assets/3.png"
  },
  {
    name: "wannasingh-blog",
    overview: "A personal blog engine featuring dynamic article rendering, database migrations, and a clean build deployment pipeline.",
    technologies: ["Node.js", "Express", "Oracle Database", "oracledb", "Supabase", "React", "Vite", "Swagger/OpenAPI", "Jenkins"],
    keyFeatures: [
      "Node.js native `oracledb` query driver integration",
      "Express API framework with Swagger OpenAPI documentation UI",
      "Vite React client with Radix components",
      "Sequelize automatic database migration tools",
      "Dynamic article markdown parser",
      "Jenkins continuous deployment script"
    ],
    challenges: [
      "Preventing SQL injection through rich text markdown inputs.",
      "Ensuring fast load times for asset-heavy articles."
    ],
    solutions: [
      "Parsed markdown strictly using sanitized DOM Purify checks on the client.",
      "Implemented server-side cache headers and image compression."
    ],
    githubLink: "https://github.com/Wannasingh/wannasingh-blog",
    demoLink: "#",
    imagePath: "/assets/4.png"
  },
  {
    name: "miji-store",
    overview: "A lightweight, custom e-commerce web application featuring a Vue 3 frontend and a Python Flask API backend, integrated with Supabase and Stripe.",
    technologies: ["Vue.js 3", "Vite", "Flask", "Supabase", "Stripe API", "Tailwind CSS"],
    keyFeatures: [
      "Vue 3 composition API reactive frontend",
      "Flask lightweight REST API backend",
      "Supabase authentication and data synchronization",
      "Stripe secure credit card payments checkout flow"
    ],
    challenges: [
      "Handling secure payment verification callbacks in development.",
      "Synchronizing cart state in real-time."
    ],
    solutions: [
      "Implemented Stripe webhook listeners that update database orders upon payment verification.",
      "Utilized Vue reactive stores to sync local state with Supabase tables."
    ],
    githubLink: "https://github.com/Wannasingh/miji-store",
    demoLink: "#",
    imagePath: "/assets/1.png"
  },
  {
    name: "widget-toei",
    overview: "A native iOS SwiftUI Widget application built with Swift and Xcode, designed to deliver dynamic, high-performance information widgets directly to the iOS home screen.",
    technologies: ["Swift", "SwiftUI", "iOS WidgetKit", "Xcode", "iOS SDK"],
    keyFeatures: [
      "SwiftUI declarative layouts",
      "WidgetKit background updates scheduling",
      "Dynamic configuration intent options",
      "Clean Apple-compliant UI design"
    ],
    challenges: [
      "Meeting strict iOS memory limits (30MB constraint) for widget extensions.",
      "Updating widgets efficiently in the background without draining battery life."
    ],
    solutions: [
      "Optimized data structures and limited heavy library imports inside the widget target.",
      "Scheduled updates utilizing WidgetCenter TimelineProvider APIs."
    ],
    githubLink: "#",
    demoLink: "#",
    imagePath: "/assets/2.png"
  }
];