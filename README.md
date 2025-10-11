# Mono React Router Frontend App

![Image](https://github.com/user-attachments/assets/bfb11bd1-fa4b-4b6f-90c5-c6d9ada46ae1)

Mono is a modern, professional React Router template designed for creative agencies, freelancers, and businesses who want to showcase their work with style and performance. Built with [React Router v7](https://reactrouter.com/), React 19, [Tailwind CSS](https://tailwindcss.com/), [Shadcn/ui](https://ui.shadcn.com/) components, and [Framer Motion](https://www.framer.com/motion/) animations, Mono offers a fully responsive layout, dark mode support, and a clean, contemporary design that adapts to any device.

This template is ideal for building agency websites, portfolio sites, and business showcases. It includes essential sections such as hero, features, work portfolio, testimonials, and contact forms, making it easy to present your services professionally. Perfect for creative agencies, design studios, and businesses looking to showcase their services with a professional, contemporary design. Mono is optimized for performance and SEO, ensuring fast load times and excellent user experience.

Whether you're a designer, developer, or agency owner, Mono provides a solid foundation for your online presence. The codebase is well-structured and documented, making customization and extension straightforward. Start your next creative project with Mono and stand out in the digital landscape.

## 🚀 Features

- **Modern Stack**: Built with React Router v7, TypeScript, and Tailwind CSS
- **Shadcn/ui Components**: Beautiful pre-built components with smooth animations
- **Creative Design**: Tailored specifically for agencies, portfolios, and business websites
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Interactive Elements**: Hero animations, floating cursor effects, and engaging UI components
- **Dark Mode**: Theme switching with react-router-theme
- **Performance Optimized**: Fast routing with React Router v7
- **Easy Configuration**: Setup takes minutes with modern tooling
- **Framer Motion**: Smooth animations and transitions

## 🛠️ Tech Stack

- **Framework**: React Router v7 with modern routing
- **Styling**: Tailwind CSS 4 with custom animations
- **UI Components**: Radix UI primitives + Shadcn/ui
- **Icons**: Lucide React icons
- **Animation**: Framer Motion
- **Theme**: React Router Theme for dark/light mode
- **Development**: TypeScript, Vite
- **Package Manager**: Bun (with lockfile)

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bforbilly24/mono-reactrouter-frontend-app.git
cd mono-reactrouter-frontend-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying files in the `app/` directory. The page auto-updates as you edit the file.

## 📁 Project Structure

```
mono-reactrouter-frontend-app/
├── 📁 app/
│   ├── root.tsx              # Root application component
│   ├── routes.ts             # Route definitions
│   ├── components/           # Reusable components
│   │   ├── atoms/           # Basic UI components
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── rating.tsx
│   │   │   └── typography.tsx
│   │   └── molecules/       # Composed components
│   │       └── toggle-theme-button.tsx
│   ├── contents/            # Static content data
│   │   ├── features.ts
│   │   ├── process-steps.ts
│   │   ├── projects.ts
│   │   └── testimonials.ts
│   ├── features/            # Feature-specific components
│   │   └── home/
│   │       ├── _components/
│   │       │   ├── floating-cursor.tsx
│   │       │   ├── noise-background.tsx
│   │       │   └── TextGenerateEffect.tsx
│   │       └── partials/    # Page sections
│   │           ├── contact-section.tsx
│   │           ├── features-section.tsx
│   │           ├── hero-section.tsx
│   │           ├── pricing-section.tsx
│   │           ├── process-section.tsx
│   │           ├── testimonials-section.tsx
│   │           └── work-section.tsx
│   ├── layouts/             # Layout components
│   │   ├── footer.tsx
│   │   ├── layout.tsx
│   │   └── navbar.tsx
│   ├── lib/                 # Utilities
│   │   └── utils.ts
│   ├── providers/           # Context providers
│   │   └── theme-context.tsx
│   ├── routes/              # Route components
│   │   └── home.tsx
│   └── styles/              # Global styles
│       └── globals.css
├── 📁 public/               # Static assets
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── image.png
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── works/               # Portfolio images
│       ├── 1.webp
│       ├── 2.webp
│       ├── 3.webp
│       └── 4.webp
├── 📄 components.json       # Shadcn/ui configuration
├── 📄 package.json
├── 📄 tailwind.config.ts
├── 📄 vite.config.ts
└── 📄 tsconfig.json
```

## 🎨 Components

This project includes various pre-built sections:

- **Hero Section**: Eye-catching landing hero with text generation effects
- **Features Section**: Highlight key features and capabilities
- **Work Section**: Portfolio showcase with project galleries
- **Process Section**: Step-by-step process visualization
- **Testimonials**: Client testimonials with ratings
- **Contact Section**: Contact forms and information
- **Pricing Section**: Service pricing and packages
- **Interactive Effects**: Floating cursor, noise background, and smooth animations

## 🚀 Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## ⚙️ Configuration

### Customizing Content
- Edit content data in `app/contents/` directory
- Modify landing page sections in `app/features/home/partials/`
- Update layout components in `app/layouts/`
- Customize theme settings in `app/providers/theme-context.tsx`

### Styling
- Modify Tailwind configuration in `tailwind.config.ts`
- Theme switching is handled by `react-router-theme`
- Global styles are in `app/styles/globals.css`
- Component styles use Tailwind CSS classes

### Components
- Atomic components are in `app/components/atoms/`
- Molecular components are in `app/components/molecules/`
- Feature-specific components are in `app/features/`
- Shared utilities are in `app/lib/`

### Routing
- Route definitions are in `app/routes.ts`
- Route components are in `app/routes/`
- Layout configuration in `app/layouts/layout.tsx`

## 📚 Learn More

To learn more about the technologies used in this project:

- [React Router Documentation](https://reactrouter.com/en/main) - Learn about React Router v7 features
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library for React
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy your React Router app is to use the [Vercel Platform](https://vercel.com/new).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbforbilly24%2Fmono-reactrouter-frontend-app)

### Deploy on Netlify

You can also deploy this application on [Netlify](https://www.netlify.com/):

1. Build the project: `npm run build`
2. Deploy the `build/client` directory

### Other Deployment Options

You can also deploy this application on:
- **Railway**: Simple deployment with Git integration
- **DigitalOcean App Platform**: Container-based deployment
- **AWS Amplify**: Full-stack deployment with hosting services
- **Cloudflare Pages**: Fast global deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Halim Putra**

- GitHub: [@bforbilly24](https://github.com/bforbilly24)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/bforbilly24/mono-reactrouter-frontend-app/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!
