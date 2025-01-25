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

export const projects: Project[] =  [
    {
      name: "E-commerce Platform",
      overview:
        "A fully-featured e-commerce platform with a responsive design, secure payment processing, and real-time inventory management.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Redux",
        "Stripe API",
        "Docker",
      ],
      keyFeatures: [
        "User authentication and authorization",
        "Product catalog with search and filter functionality",
        "Shopping cart and wishlist management",
        "Secure checkout process with Stripe integration",
        "Admin dashboard for inventory and order management",
        "Real-time inventory updates",
        "Responsive design for mobile and desktop",
      ],
      challenges: [
        "Implementing real-time inventory updates across multiple users",
        "Ensuring secure handling of sensitive payment information",
        "Optimizing database queries for large product catalogs",
      ],
      solutions: [
        "Utilized Socket.io for real-time communication between server and clients",
        "Implemented Stripe Elements for secure payment processing",
        "Designed efficient MongoDB indexes and implemented pagination for product listings",
      ],
      githubLink: "https://github.com/yourusername/e-commerce-platform",
      demoLink: "https://your-ecommerce-demo.com",
      imagePath: "/assets/1.png",
    },
    {
      name: "Task Management App",
      overview:
        "A collaborative task management application with real-time updates and team collaboration features.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "React Query",
      ],
      keyFeatures: [
        "User authentication with role-based access control",
        "Real-time task updates and notifications",
        "Drag-and-drop task organization",
        "Team collaboration with shared workspaces",
        "Task commenting and file attachments",
        "Performance analytics and reporting",
      ],
      challenges: [
        "Implementing real-time updates without compromising performance",
        "Designing an intuitive and responsive user interface",
        "Managing complex state across multiple components",
      ],
      solutions: [
        "Leveraged Supabase's real-time subscriptions for instant updates",
        "Utilized Tailwind CSS for rapid UI development and responsiveness",
        "Implemented React Query for efficient state management and caching",
      ],
      githubLink: "https://github.com/yourusername/task-management-app",
      demoLink: "https://your-task-app-demo.com",
      imagePath: "/assets/2.png",
    },
    {
      name: "AI-Powered Chatbot",
      overview:
        "An intelligent chatbot leveraging natural language processing to provide customer support and information retrieval.",
      technologies: [
        "Python",
        "Flask",
        "TensorFlow",
        "NLTK",
        "React",
        "Docker",
      ],
      keyFeatures: [
        "Natural language understanding and intent classification",
        "Integration with knowledge base for accurate responses",
        "Multi-language support",
        "Conversation context maintenance",
        "Easy integration with existing customer support systems",
      ],
      challenges: [
        "Achieving high accuracy in intent classification",
        "Maintaining context across long conversations",
        "Optimizing response time for real-time interactions",
      ],
      solutions: [
        "Fine-tuned BERT model for improved intent classification",
        "Implemented a context management system using Redis",
        "Utilized caching and model quantization for faster inference",
      ],
      githubLink: "https://github.com/yourusername/ai-chatbot",
      demoLink: "https://your-chatbot-demo.com",
      imagePath: "/assets/3.png",
    },
    {
      name: "Fitness Tracking Mobile App",
      overview:
        "A comprehensive mobile application for tracking workouts, nutrition, and health metrics with personalized insights.",
      technologies: [
        "React Native",
        "Redux",
        "Node.js",
        "MongoDB",
        "GraphQL",
        "AWS",
      ],
      keyFeatures: [
        "Customizable workout plans and exercise library",
        "Nutrition tracking with barcode scanning",
        "Integration with wearable devices for health metrics",
        "Progress visualization and goal setting",
        "Social features for community engagement",
        "Offline mode support",
      ],
      challenges: [
        "Ensuring data accuracy and consistency across devices",
        "Implementing efficient syncing mechanism for offline mode",
        "Optimizing battery usage while tracking activities",
      ],
      solutions: [
        "Implemented robust data validation and conflict resolution algorithms",
        "Used a combination of local storage and queue-based syncing for offline support",
        "Optimized background processes and implemented intelligent polling",
      ],
      githubLink: "https://github.com/yourusername/fitness-tracker-app",
      demoLink: "https://your-fitness-app-demo.com",
      imagePath: "/assets/4.png",
    },
  ];