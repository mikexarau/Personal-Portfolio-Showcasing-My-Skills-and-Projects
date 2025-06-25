// Configuración de seguridad
export const SECURITY_CONFIG = {
  // CSP (Content Security Policy)
  CSP_DIRECTIVES: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://api.github.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  },
  
  // Configuración de HTTPS
  HTTPS_ONLY: true,
  HSTS_MAX_AGE: 31536000, // 1 año
  
  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutos
    MAX_REQUESTS: 100
  }
}

// Sanitización de strings para prevenir XSS
export const sanitizeHtml = (input: string): string => {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

// Validación de URLs seguras
export const isSecureUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url)
    
    // Solo permitir https, mailto, tel y rutas relativas
    const allowedProtocols = ['https:', 'mailto:', 'tel:']
    const isRelative = url.startsWith('/') || url.startsWith('#')
    
    return isRelative || allowedProtocols.includes(parsedUrl.protocol)
  } catch {
    // Si no es una URL válida, verificar si es una ruta relativa segura
    return /^[\/\#][\w\-\/\#\?\&=%.]*$/.test(url)
  }
}

// Validación de email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

// Escape de caracteres especiales para RegExp
export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Validación de input de formularios
export const validateFormInput = (value: string, type: 'text' | 'email' | 'url' = 'text'): boolean => {
  if (!value || value.trim().length === 0) return false
  
  // Límites básicos de longitud
  if (value.length > 1000) return false
  
  // Verificar caracteres maliciosos básicos
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i
  ]
  
  if (maliciousPatterns.some(pattern => pattern.test(value))) {
    return false
  }
  
  switch (type) {
    case 'email':
      return isValidEmail(value)
    case 'url':
      return isSecureUrl(value)
    default:
      return true
  }
}

// Headers de seguridad para Gatsby
export const getSecurityHeaders = () => ({
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': `max-age=${SECURITY_CONFIG.HSTS_MAX_AGE}; includeSubDomains; preload`,
  'Content-Security-Policy': Object.entries(SECURITY_CONFIG.CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ')
})

// Throttling para prevenir spam
export const createThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return ((...args: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      lastExecTime = currentTime
      return func(...args)
    }
    
    if (timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      lastExecTime = Date.now()
      func(...args)
    }, delay - (currentTime - lastExecTime))
  }) as T
}

// Rate limiting client-side
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = []
  
  return () => {
    const now = Date.now()
    const windowStart = now - windowMs
    
    // Limpiar requests antiguos
    while (requests.length > 0 && requests[0] < windowStart) {
      requests.shift()
    }
    
    if (requests.length >= maxRequests) {
      return false // Rate limit exceeded
    }
    
    requests.push(now)
    return true // Request allowed
  }
}

// Validador de archivos subidos (si aplicable)
export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Tipo de archivo no permitido' }
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Archivo demasiado grande (máx. 5MB)' }
  }
  
  return { isValid: true }
}

// Logging seguro (sin información sensible)
export const secureLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SECURE LOG] ${message}`, data)
  }
}

export default {
  SECURITY_CONFIG,
  sanitizeHtml,
  isSecureUrl,
  isValidEmail,
  escapeRegExp,
  validateFormInput,
  getSecurityHeaders,
  createThrottle,
  createRateLimiter,
  validateFileUpload,
  secureLog
} 