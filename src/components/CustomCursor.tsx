import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useCursorStateDetection } from '../utils/useCursorOptimization';

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState {
  type: 'default' | 'menu' | 'hover' | 'view' | 'external' | 'disabled';
  visible: boolean;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>({ 
    type: 'default', 
    visible: false 
  });

  const { getElementCursorState } = useCursorStateDetection();

  // Detect touch devices
  const isTouchDevice = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // Ultra-smooth cursor movement - direct position updates
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice()) {
      setCursorState(prev => ({ ...prev, visible: true }));
    }
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    setCursorState(prev => ({ ...prev, visible: false }));
  }, []);

  // Handle cursor state changes based on element hover
  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (isTouchDevice()) return;
    
    const target = e.target as HTMLElement;
    const cursorType = getElementCursorState(target);
    
    setCursorState({ 
      type: cursorType as CursorState['type'], 
      visible: true 
    });
  }, [getElementCursorState, isTouchDevice]);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    if (isTouchDevice()) return;
    
    const target = e.target as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    
    // Only reset if we're not moving to a child element
    if (!target?.contains(relatedTarget)) {
      setCursorState({ type: 'default', visible: true });
    }
  }, [isTouchDevice]);

  // Click feedback
  const handleClick = useCallback(() => {
    if (cursorRef.current && !isTouchDevice()) {
      cursorRef.current.classList.add('cursor-click');
      setTimeout(() => {
        if (cursorRef.current) {
          cursorRef.current.classList.remove('cursor-click');
        }
      }, 100);
    }
  }, [isTouchDevice]);

  // Setup all event listeners
  useEffect(() => {
    if (isTouchDevice()) {
      setCursorState({ type: 'default', visible: false });
      return;
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseOver, handleMouseOut, handleClick, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice()) {
    return null;
  }

  // Build cursor classes
  const cursorClasses = [
    'custom-cursor',
    `cursor-${cursorState.type}`,
    !cursorState.visible && 'cursor-hidden'
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={cursorRef}
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      aria-hidden="true"
    />
  );
};

export default CustomCursor; 