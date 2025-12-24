import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

export interface ErrorContext {
  component?: string;
  operation?: string;
  userEmail?: string;
  additionalInfo?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private router = inject(Router);
  private toastService = inject(ToastService);

  /**
   * Handles authentication-related errors
   */
  handleAuthError(error: any, context: ErrorContext = {}): void {
    console.error('Authentication error:', error, context);
    
    let userMessage = 'Authentication error occurred.';
    let shouldRedirect = false;
    
    if (error?.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          userMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          userMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/email-already-in-use':
          userMessage = 'An account with this email already exists.';
          break;
        case 'auth/weak-password':
          userMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/invalid-email':
          userMessage = 'Please enter a valid email address.';
          break;
        case 'auth/network-request-failed':
          userMessage = 'Network error. Please check your connection and try again.';
          break;
        case 'auth/too-many-requests':
          userMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/user-disabled':
          userMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/invalid-credential':
          userMessage = 'Invalid login credentials. Please check your email and password.';
          break;
        case 'auth/popup-closed-by-user':
          userMessage = 'Login was cancelled.';
          break;
        case 'auth/popup-blocked':
          userMessage = 'Popup was blocked. Please allow popups and try again.';
          break;
        case 'auth/unauthorized-domain':
          userMessage = 'This domain is not authorized for authentication.';
          break;
        case 'auth/operation-not-allowed':
          userMessage = 'This sign-in method is not enabled. Please contact support.';
          break;
        case 'auth/requires-recent-login':
          userMessage = 'Please log in again to perform this action.';
          shouldRedirect = true;
          break;
        default:
          userMessage = `Authentication error: ${error.message || 'Unknown error'}`;
      }
    } else if (error?.message) {
      userMessage = error.message;
    }
    
    this.toastService.show(userMessage, 'error');
    
    if (shouldRedirect) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Handles permission-related errors
   */
  handlePermissionError(context: ErrorContext = {}): void {
    console.error('Permission error:', context);
    
    const userMessage = context.userEmail 
      ? `Access denied for ${context.userEmail}. Insufficient permissions.`
      : 'Access denied. You do not have permission to perform this action.';
    
    this.toastService.show(userMessage, 'error');
    
    // Redirect based on context
    if (context.userEmail) {
      // Try to redirect to appropriate dashboard
      this.router.navigate(['/user/dashboard/overview']).catch(navError => {
        console.error('Failed to redirect after permission error:', navError);
        this.router.navigate(['/']);
      });
    }
  }

  /**
   * Handles network-related errors
   */
  handleNetworkError(error: any, context: ErrorContext = {}): void {
    console.error('Network error:', error, context);
    
    let userMessage = 'Network error occurred.';
    
    if (!navigator.onLine) {
      userMessage = 'No internet connection. Please check your network and try again.';
    } else if (error?.status === 0) {
      userMessage = 'Cannot reach the server. Please try again later.';
    } else if (error?.status >= 500) {
      userMessage = 'Server error. Please try again later.';
    } else if (error?.status === 404) {
      userMessage = 'The requested resource was not found.';
    } else if (error?.status === 401) {
      userMessage = 'Authentication required. Please log in again.';
      this.router.navigate(['/login']);
    } else if (error?.status === 403) {
      userMessage = 'Access forbidden. You do not have permission to access this resource.';
    } else if (error?.status === 408) {
      userMessage = 'Request timeout. Please try again.';
    } else if (error?.status === 429) {
      userMessage = 'Too many requests. Please wait a moment and try again.';
    } else if (error?.message) {
      userMessage = `Network error: ${error.message}`;
    }
    
    this.toastService.show(userMessage, 'error');
  }

  /**
   * Handles data loading errors
   */
  handleDataError(error: any, context: ErrorContext = {}): void {
    console.error('Data error:', error, context);
    
    let userMessage = 'Failed to load data.';
    
    if (error?.status === 401) {
      userMessage = 'Authentication expired. Please log in again.';
      this.router.navigate(['/login']);
    } else if (error?.status === 403) {
      userMessage = 'Access denied. You do not have permission to view this data.';
    } else if (error?.status === 404) {
      userMessage = 'The requested data was not found.';
    } else if (error?.status >= 500) {
      userMessage = 'Server error while loading data. Please try again later.';
    } else if (!navigator.onLine) {
      userMessage = 'Cannot load data while offline. Please check your connection.';
    } else if (context.operation) {
      userMessage = `Failed to ${context.operation}. Please try again.`;
    }
    
    this.toastService.show(userMessage, 'error');
  }

  /**
   * Handles navigation errors
   */
  handleNavigationError(error: any, context: ErrorContext = {}): void {
    console.error('Navigation error:', error, context);
    
    const userMessage = 'Navigation error occurred. Redirecting to safe location.';
    this.toastService.show(userMessage, 'error');
    
    // Attempt fallback navigation
    this.performFallbackNavigation();
  }

  /**
   * Handles general application errors
   */
  handleGeneralError(error: any, context: ErrorContext = {}): void {
    console.error('General application error:', error, context);
    
    let userMessage = 'An unexpected error occurred.';
    
    if (error?.message) {
      // Don't expose technical error messages to users
      if (error.message.includes('network') || error.message.includes('fetch')) {
        userMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('permission') || error.message.includes('unauthorized')) {
        userMessage = 'Permission error. You may not have access to this feature.';
      } else {
        userMessage = 'An error occurred. Please try again or contact support if the problem persists.';
      }
    }
    
    this.toastService.show(userMessage, 'error');
  }

  /**
   * Performs fallback navigation when primary navigation fails
   */
  private performFallbackNavigation(): void {
    // Try user dashboard first
    this.router.navigate(['/user/dashboard/overview']).catch(() => {
      // If that fails, try basic dashboard
      this.router.navigate(['/dashboard']).catch(() => {
        // Ultimate fallback to home page
        this.router.navigate(['/']).catch(() => {
          // If even home page fails, show critical error
          this.toastService.show(
            'Critical navigation error. Please refresh the page or contact support.', 
            'error'
          );
        });
      });
    });
  }

  /**
   * Logs errors for debugging and monitoring
   */
  logError(error: any, context: ErrorContext = {}): void {
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: {
        message: error?.message,
        stack: error?.stack,
        code: error?.code,
        status: error?.status
      },
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.error('Error logged:', errorLog);
    
    // In a production environment, you might want to send this to a logging service
    // this.sendToLoggingService(errorLog);
  }

  /**
   * Checks if an error is recoverable
   */
  isRecoverableError(error: any): boolean {
    if (error?.status) {
      // Network errors that might be temporary
      return [408, 429, 500, 502, 503, 504].includes(error.status);
    }
    
    if (error?.code) {
      // Auth errors that might be recoverable
      return ['auth/network-request-failed', 'auth/too-many-requests'].includes(error.code);
    }
    
    return false;
  }

  /**
   * Provides retry suggestions for recoverable errors
   */
  getRetryMessage(error: any): string {
    if (error?.status === 429) {
      return 'Too many requests. Please wait a moment before trying again.';
    }
    
    if (error?.status >= 500) {
      return 'Server error. Please try again in a few moments.';
    }
    
    if (error?.code === 'auth/network-request-failed') {
      return 'Network error. Please check your connection and try again.';
    }
    
    return 'Please try again.';
  }
}