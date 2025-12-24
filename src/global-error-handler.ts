import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorHandlerService = inject(ErrorHandlerService);

  handleError(error: any): void {
    console.error('Global error caught:', error);

    // Extract meaningful information from the error
    const context = {
      component: 'GlobalErrorHandler',
      operation: 'handle uncaught error',
      additionalInfo: {
        stack: error?.stack,
        message: error?.message,
        name: error?.name
      }
    };

    // Check if it's a specific type of error
    if (this.isChunkLoadError(error)) {
      this.handleChunkLoadError(error);
    } else if (this.isNetworkError(error)) {
      this.errorHandlerService.handleNetworkError(error, context);
    } else if (this.isAuthError(error)) {
      this.errorHandlerService.handleAuthError(error, context);
    } else {
      this.errorHandlerService.handleGeneralError(error, context);
    }

    // Log the error
    this.errorHandlerService.logError(error, context);
  }

  private isChunkLoadError(error: any): boolean {
    return error?.message?.includes('Loading chunk') ||
           error?.message?.includes('ChunkLoadError') ||
           error?.name === 'ChunkLoadError';
  }

  private isNetworkError(error: any): boolean {
    return error?.message?.includes('fetch') ||
           error?.message?.includes('network') ||
           error?.message?.includes('ERR_NETWORK') ||
           error?.message?.includes('ERR_INTERNET_DISCONNECTED');
  }

  private isAuthError(error: any): boolean {
    return error?.code?.startsWith('auth/') ||
           error?.message?.includes('authentication') ||
           error?.message?.includes('unauthorized');
  }

  private handleChunkLoadError(error: any): void {
    console.log('Chunk load error detected, suggesting page refresh');
    
    // For chunk load errors, suggest a page refresh
    const shouldRefresh = confirm(
      'The application has been updated. Would you like to refresh the page to load the latest version?'
    );
    
    if (shouldRefresh) {
      window.location.reload();
    }
  }
}