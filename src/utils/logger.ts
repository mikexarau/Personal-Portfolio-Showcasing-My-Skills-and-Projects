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
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logs: LogEntry[] = [];

  private createLogEntry(level: LogLevel, message: string, context?: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      data
    };
  }

  private shouldLog(level: LogLevel): boolean {
    // En producción, solo logear errores
    if (!this.isDevelopment) {
      return level === 'error';
    }
    return true;
  }

  private formatMessage(entry: LogEntry): string {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
    const context = entry.context ? ` [${entry.context}]` : '';
    return `${prefix}${context} ${entry.message}`;
  }

  debug(message: string, context?: string, data?: any): void {
    if (!this.shouldLog('debug')) return;
    
    const entry = this.createLogEntry('debug', message, context, data);
    this.logs.push(entry);
    
    if (this.isDevelopment) {
      console.debug(this.formatMessage(entry), data || '');
    }
  }

  info(message: string, context?: string, data?: any): void {
    if (!this.shouldLog('info')) return;
    
    const entry = this.createLogEntry('info', message, context, data);
    this.logs.push(entry);
    
    if (this.isDevelopment) {
      console.info(this.formatMessage(entry), data || '');
    }
  }

  warn(message: string, context?: string, data?: any): void {
    if (!this.shouldLog('warn')) return;
    
    const entry = this.createLogEntry('warn', message, context, data);
    this.logs.push(entry);
    
    if (this.isDevelopment) {
      console.warn(this.formatMessage(entry), data || '');
    }
  }

  error(message: string, context?: string, data?: any): void {
    const entry = this.createLogEntry('error', message, context, data);
    this.logs.push(entry);
    
    // Los errores siempre se muestran
    console.error(this.formatMessage(entry), data || '');
    
    // En producción, podrías enviar a un servicio de monitoreo
    if (!this.isDevelopment) {
      this.reportError(entry);
    }
  }

  private reportError(entry: LogEntry): void {
    // Aquí podrías integrar con servicios como Sentry, LogRocket, etc.
    // Por ahora, solo almacenamos localmente
    try {
      const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
      errors.push(entry);
      localStorage.setItem('portfolio_errors', JSON.stringify(errors.slice(-50))); // Mantener últimos 50 errores
    } catch (e) {
      // Silenciar errores de localStorage
    }
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

  // Obtener logs para debugging
  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  // Limpiar logs
  clearLogs(): void {
    this.logs = [];
  }
}

// Instancia singleton
export const logger = new Logger();

// Exports para compatibilidad
export default logger; 