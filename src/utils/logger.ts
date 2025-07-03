/**
 * Sistema de logging profesional para el portfolio
 * Reemplaza console.log con logging estructurado
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private isClient: boolean = false;

  constructor() {
    // 🔒 SSR Protection: Only initialize browser features after hydration
    if (typeof window !== 'undefined') {
      this.isClient = true;
      // Inicializar características del navegador solo en el cliente
      this.initializeBrowserFeatures();
    }
  }

  private initializeBrowserFeatures() {
    if (!this.isClient) return;

    // Cargar logs guardados del localStorage solo en el cliente
    try {
      const savedLogs = localStorage.getItem('portfolio-logs');
      if (savedLogs) {
        this.logs = JSON.parse(savedLogs);
      }
    } catch (error) {
      console.warn('Error loading saved logs:', error);
    }
  }

  private saveToStorage() {
    if (!this.isClient) return;

    try {
      const recentLogs = this.logs.slice(-100); // Mantener solo los últimos 100 logs
      localStorage.setItem('portfolio-logs', JSON.stringify(recentLogs));
    } catch (error) {
      console.warn('Error saving logs to localStorage:', error);
    }
  }

  private log(level: LogLevel, message: string, context?: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      data
    };

    this.logs.push(entry);
    
    // 🔒 Solo guardar en localStorage si estamos en el cliente
    if (this.isClient) {
      this.saveToStorage();
    }

    // Output to console in development
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
      const prefix = context ? `[${context}]` : '';
      console[consoleMethod](`${prefix} ${message}`, data || '');
    }
  }

  info(message: string, context?: string, data?: any) {
    this.log('info', message, context, data);
  }

  warn(message: string, context?: string, data?: any) {
    this.log('warn', message, context, data);
  }

  error(message: string, context?: string, data?: any) {
    this.log('error', message, context, data);
  }

  debug(message: string, context?: string, data?: any) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      this.log('debug', message, context, data);
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
    if (this.isClient) {
      localStorage.removeItem('portfolio-logs');
    }
  }

  // 🎯 Method to export logs for debugging
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Métodos específicos para casos comunes
  apiError(message: string, endpoint: string, error: any): void {
    this.error(`API Error: ${message}`, 'API', { endpoint, error: error.message || error });
  }

  componentError(message: string, component: string, error: any): void {
    this.error(`Component Error: ${message}`, component, { error: error.message || error });
  }

  performanceLog(metric: string, value: number, unit: string = 'ms'): void {
    this.info(`Performance: ${metric} = ${value}${unit}`, 'PERFORMANCE');
  }
}

// 🎯 Singleton instance with SSR protection
const logger = new Logger();

export default logger; 