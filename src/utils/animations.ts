import { Variants } from 'framer-motion';

// Animaciones de entrada
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

// Animaciones de escala
export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Animaciones de hover
export const hoverScale: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const hoverScaleLarge: Variants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 }
};

// Animaciones de rotación
export const rotateAnimation: Variants = {
  animate: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

export const rotateOnHover: Variants = {
  hover: { rotate: 360 },
  tap: { rotate: 180 }
};

// Transiciones comunes
export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

export const smoothTransition = {
  duration: 0.3
};

export const longTransition = {
  duration: 0.5
};

// Delays comunes
export const delays = {
  short: 0.2,
  medium: 0.3,
  long: 0.4
};

// Configuraciones de AnimatePresence
export const animatePresenceConfig = {
  mode: "wait" as const
}; 