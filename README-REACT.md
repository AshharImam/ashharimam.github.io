# Ashhar Portfolio - React + Vite

Modern, responsive portfolio built with React, Vite, and Framer Motion.

## Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React with hooks
- 🎨 **Framer Motion** - Smooth animations
- 📱 **Mobile Responsive** - Perfect on all devices
- 🎯 **Horizontal Carousel** - Smooth project navigation
- 🌈 **Dynamic Background** - Animated gradient orbs
- 💎 **Glass Morphism** - Modern UI design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Loader.jsx
│   ├── BackgroundOrbs.jsx
│   ├── ProjectsCarousel.jsx
│   ├── ProjectCard.jsx
│   ├── DeviceBezel.jsx
│   ├── ProjectDetails.jsx
│   ├── TechStack.jsx
│   ├── Stats.jsx
│   └── NavigationArrows.jsx
├── hooks/              # Custom React hooks
│   ├── useCarouselScroll.js
│   └── useMobileDeviceSizing.js
├── styles/             # CSS files
│   └── index.css
├── App.jsx            # Main App component
└── main.jsx           # React entry point
```

## Configuration

### Update Projects

Edit `public/projects.json` to add/modify your projects.

### Customize Colors

Modify CSS variables in `src/styles/index.css`:

```css
:root {
  --accent-cyan: #00f2ff;
  --accent-purple: #a855f7;
  --accent-magenta: #ff00ff;
}
```

## Technologies Used

- React 18
- Vite 5
- Framer Motion
- CSS3 (with CSS Grid & Flexbox)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this for your own portfolio!

## Author

**Ashhar Imam**
- Mobile App Expert | Full Stack Developer

