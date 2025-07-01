import { useCallback, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

// Throttle function for optimized mouse tracking
export const useThrottledMousePosition = (delay: number = 16) => {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback((callback: (position: CursorPosition) => void) => {
    return (e: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback({ x: e.clientX, y: e.clientY });
      } else {
        // Schedule the next call
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          callback({ x: e.clientX, y: e.clientY });
          lastCall.current = Date.now();
        }, delay - (now - lastCall.current));
      }
    };
  }, [delay]);

  return throttledCallback;
};

// Smooth cursor position interpolation
export const useSmoothCursorPosition = () => {
  const targetPosition = useRef<CursorPosition>({ x: 0, y: 0 });
  const currentPosition = useRef<CursorPosition>({ x: 0, y: 0 });
  const animationId = useRef<number>();

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  const updatePosition = useCallback((newPosition: CursorPosition) => {
    targetPosition.current = newPosition;
    
    const animate = () => {
      const lerpFactor = 0.15; // Adjust for smoother/snappier movement
      
      currentPosition.current.x = lerp(
        currentPosition.current.x,
        targetPosition.current.x,
        lerpFactor
      );
      currentPosition.current.y = lerp(
        currentPosition.current.y,
        targetPosition.current.y,
        lerpFactor
      );

      // Continue animation if position difference is significant
      const dx = Math.abs(targetPosition.current.x - currentPosition.current.x);
      const dy = Math.abs(targetPosition.current.y - currentPosition.current.y);
      
      if (dx > 0.5 || dy > 0.5) {
        animationId.current = requestAnimationFrame(animate);
      }
    };

    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
    }
    animationId.current = requestAnimationFrame(animate);
  }, []);

  const getCurrentPosition = useCallback((): CursorPosition => {
    return { ...currentPosition.current };
  }, []);

  const cleanup = useCallback(() => {
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
    }
  }, []);

  return {
    updatePosition,
    getCurrentPosition,
    cleanup
  };
};

// Device detection for cursor behavior
export const useDeviceDetection = () => {
  const isTouchDevice = useCallback((): boolean => {
    // 🔒 SSR Protection
    if (typeof window === 'undefined') return false;
    
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  const isMobile = useCallback((): boolean => {
    // 🔒 SSR Protection
    if (typeof window === 'undefined') return false;
    
    return window.innerWidth <= 768;
  }, []);

  const supportsHover = useCallback((): boolean => {
    // 🔒 SSR Protection - Default to true for SSR
    if (typeof window === 'undefined') return true;
    
    return window.matchMedia('(hover: hover)').matches;
  }, []);

  const prefersReducedMotion = useCallback((): boolean => {
    // 🔒 SSR Protection - Default to false for SSR
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return {
    isTouchDevice,
    isMobile,
    supportsHover,
    prefersReducedMotion
  };
};

// Cursor state management
export const useCursorStateDetection = () => {
  const getElementCursorState = useCallback((element: HTMLElement): string => {
    // Check for explicit data-cursor attribute
    const explicitCursor = element.getAttribute('data-cursor');
    if (explicitCursor) return explicitCursor;

    // Check parent elements for data-cursor
    let parent = element.parentElement;
    while (parent) {
      const parentCursor = parent.getAttribute('data-cursor');
      if (parentCursor) return parentCursor;
      parent = parent.parentElement;
    }

    // Navigation menu detection - use hover for better UX
    if (
      (element.closest('nav') && element.tagName === 'A') ||
      (element.closest('header') && element.tagName === 'A') ||
      element.classList.contains('nav-link')
    ) {
      return 'hover';
    }

    // Work/project cards
    if (element.closest('.work-card') || element.closest('.card-visual')) {
      return 'view';
    }

    // External links
    if (element.tagName === 'A') {
      const href = element.getAttribute('href');
      const target = element.getAttribute('target');
      
      if (href?.startsWith('http') || target === '_blank') {
        return 'external';
      }
    }

    // Regular clickable elements
    if (
      element.tagName === 'BUTTON' ||
      element.tagName === 'A' ||
      element.getAttribute('role') === 'button' ||
      element.closest('button') ||
      element.closest('a')
    ) {
      return 'hover';
    }

    // Disabled elements
    if (element.hasAttribute('disabled') || element.closest('[disabled]')) {
      return 'disabled';
    }

    return 'default';
  }, []);

  return { getElementCursorState };
};

export default {
  useThrottledMousePosition,
  useSmoothCursorPosition,
  useDeviceDetection,
  useCursorStateDetection
}; 