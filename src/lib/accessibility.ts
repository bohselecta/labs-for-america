// Accessibility utilities and helpers
export interface AccessibilityOptions {
  announceChanges?: boolean;
  skipLinks?: boolean;
  focusManagement?: boolean;
  keyboardNavigation?: boolean;
  screenReaderSupport?: boolean;
}

// Focus management utilities
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

// Screen reader announcements
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Skip links functionality
export function createSkipLink(targetId: string, label: string = 'Skip to main content'): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = label;
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  return skipLink;
}

// Keyboard navigation helpers
export function handleKeyboardNavigation(
  element: HTMLElement,
  onEnter?: () => void,
  onSpace?: () => void,
  onEscape?: () => void,
  onArrowKeys?: (direction: 'up' | 'down' | 'left' | 'right') => void
) {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        onEnter?.();
        break;
      case ' ':
        e.preventDefault();
        onSpace?.();
        break;
      case 'Escape':
        onEscape?.();
        break;
      case 'ArrowUp':
        e.preventDefault();
        onArrowKeys?.('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        onArrowKeys?.('down');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onArrowKeys?.('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        onArrowKeys?.('right');
        break;
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Motion respect utilities
export function respectsMotionPreference(): boolean {
  if (typeof window === 'undefined') return true;
  
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getMotionSafeTransition(duration: number = 300): string {
  return respectsMotionPreference() 
    ? `transition: all ${duration}ms ease-in-out`
    : 'transition: none';
}

// ARIA helpers
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createAriaDescribedBy(...ids: string[]): string {
  return ids.filter(Boolean).join(' ');
}

// Form accessibility helpers
export function createFormFieldError(id: string, message: string): HTMLElement {
  const errorElement = document.createElement('div');
  errorElement.id = `${id}-error`;
  errorElement.className = 'error-message text-red-600 text-sm mt-1';
  errorElement.setAttribute('role', 'alert');
  errorElement.setAttribute('aria-live', 'polite');
  errorElement.textContent = message;
  
  return errorElement;
}

export function associateFieldWithError(field: HTMLElement, errorId: string) {
  field.setAttribute('aria-describedby', errorId);
  field.setAttribute('aria-invalid', 'true');
}

export function clearFieldError(field: HTMLElement) {
  field.removeAttribute('aria-describedby');
  field.removeAttribute('aria-invalid');
}

// Loading state accessibility
export function createLoadingState(element: HTMLElement, message: string = 'Loading...') {
  const originalContent = element.innerHTML;
  const loadingMessage = document.createElement('div');
  loadingMessage.setAttribute('aria-live', 'polite');
  loadingMessage.setAttribute('aria-label', message);
  loadingMessage.className = 'loading-state';
  loadingMessage.innerHTML = `
    <div class="flex items-center gap-2">
      <div class="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      <span class="sr-only">${message}</span>
    </div>
  `;
  
  element.innerHTML = '';
  element.appendChild(loadingMessage);
  
  return () => {
    element.innerHTML = originalContent;
  };
}

// High contrast mode detection
export function isHighContrastMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-contrast: high)').matches ||
         window.matchMedia('(prefers-contrast: more)').matches;
}

// Focus visible polyfill for older browsers
export function initFocusVisible() {
  if (typeof window === 'undefined') return;
  
  const style = document.createElement('style');
  style.textContent = `
    .focus-visible:focus {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
    
    .focus-visible:focus:not(:focus-visible) {
      outline: none;
    }
  `;
  
  document.head.appendChild(style);
  
  // Add focus-visible class to focused elements
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
  
  document.addEventListener('focusin', (e) => {
    if (document.body.classList.contains('keyboard-navigation')) {
      (e.target as HTMLElement)?.classList.add('focus-visible');
    }
  });
  
  document.addEventListener('focusout', (e) => {
    (e.target as HTMLElement)?.classList.remove('focus-visible');
  });
}
