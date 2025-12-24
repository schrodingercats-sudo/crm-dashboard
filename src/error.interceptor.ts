import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, retryWhen, delayWhen, take } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private errorHandlerService = inject(ErrorHandlerService);
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // Retry logic for recoverable errors
      retryWhen(errors => 
        errors.pipe(
          delayWhen((error: HttpErrorResponse) => {
            // Only retry for specific error codes
            if (this.shouldRetry(error)) {
              console.log(`Retrying request to ${request.url} after error:`, error.status);
              return timer(this.getRetryDelay(error));
            }
            // Don't retry, let the error through
            return throwError(error);
          }),
          take(3) // Maximum 3 retry attempts
        )
      ),
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error, request);
        return throwError(error);
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse, request: HttpRequest<any>): void {
    const context = {
      component: 'HttpInterceptor',
      operation: `${request.method} ${request.url}`,
      additionalInfo: {
        status: error.status,
        statusText: error.statusText,
        url: request.url
      }
    };

    switch (error.status) {
      case 0:
        // Network error or CORS issue
        this.errorHandlerService.handleNetworkError(error, context);
        break;
      
      case 401:
        // Unauthorized - redirect to login
        console.log('Unauthorized request, redirecting to login');
        this.router.navigate(['/login']);
        this.errorHandlerService.handleAuthError(error, context);
        break;
      
      case 403:
        // Forbidden - permission error
        this.errorHandlerService.handlePermissionError(context);
        break;
      
      case 404:
        // Not found
        this.errorHandlerService.handleDataError(error, context);
        break;
      
      case 408:
        // Request timeout
        this.errorHandlerService.handleNetworkError(error, context);
        break;
      
      case 429:
        // Too many requests
        this.errorHandlerService.handleNetworkError(error, context);
        break;
      
      case 500:
      case 502:
      case 503:
      case 504:
        // Server errors
        this.errorHandlerService.handleNetworkError(error, context);
        break;
      
      default:
        // Other errors
        this.errorHandlerService.handleGeneralError(error, context);
    }

    // Log the error for debugging
    this.errorHandlerService.logError(error, context);
  }

  private shouldRetry(error: HttpErrorResponse): boolean {
    // Retry for network errors and server errors, but not for client errors
    return error.status === 0 || // Network error
           error.status === 408 || // Request timeout
           error.status === 429 || // Too many requests (with delay)
           error.status >= 500; // Server errors
  }

  private getRetryDelay(error: HttpErrorResponse): number {
    switch (error.status) {
      case 429:
        // Too many requests - longer delay
        return 5000;
      case 0:
        // Network error - medium delay
        return 2000;
      default:
        // Server errors - short delay
        return 1000;
    }
  }
}