import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

export interface DataFilter {
  ownerEmail?: string;
  assignee?: string;
  email?: string;
  createdBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  /**
   * Filters data based on user role and permissions with error handling
   * Admin users get all data, regular users get only their own data
   */
  filterDataForUser<T extends DataFilter>(data: T[], userEmail: string | null): T[] {
    try {
      if (!Array.isArray(data)) {
        console.error('Invalid data provided to filterDataForUser:', data);
        this.toastService.show('Data loading error. Please refresh the page.', 'error');
        return [];
      }

      if (this.authService.isAdmin(userEmail)) {
        // Admin gets all data without filtering
        return data;
      } else {
        // Regular users get only their own data
        return data.filter(item => {
          try {
            return item.ownerEmail === userEmail || 
                   item.assignee === userEmail ||
                   item.email === userEmail ||
                   item.createdBy === userEmail;
          } catch (filterError) {
            console.error('Error filtering individual item:', filterError, item);
            return false;
          }
        });
      }
    } catch (error) {
      console.error('Error in filterDataForUser:', error);
      this.toastService.show('Data filtering error. Some data may not be displayed correctly.', 'error');
      return [];
    }
  }

  /**
   * Checks if a user has access to a specific feature with error handling
   */
  hasFeatureAccess(feature: string, userEmail: string | null): boolean {
    try {
      if (!feature || typeof feature !== 'string') {
        console.error('Invalid feature provided to hasFeatureAccess:', feature);
        return false;
      }

      if (this.authService.isAdmin(userEmail)) {
        // Admin has access to all features
        return true;
      } else {
        // Regular users have limited access
        const userFeatures = ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
        return userFeatures.includes(feature.toLowerCase());
      }
    } catch (error) {
      console.error('Error checking feature access:', error);
      this.toastService.show('Permission check failed. Access denied for safety.', 'error');
      return false;
    }
  }

  /**
   * Gets list of available features for a user based on their role with error handling
   */
  getAvailableFeatures(userEmail: string | null): string[] {
    try {
      if (this.authService.isAdmin(userEmail)) {
        // Admin gets all features including admin-only ones
        return [
          'overview', 'contacts', 'deals', 'tasks', 'settings', 'help',
          'integration', 'referral-partners', 'user-management', 'system-settings'
        ];
      } else {
        // Regular users get limited features
        return ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
      }
    } catch (error) {
      console.error('Error getting available features:', error);
      this.toastService.show('Feature list loading error. Some features may not be available.', 'error');
      // Return minimal safe features
      return ['overview'];
    }
  }

  /**
   * Checks if user can manage all system data with error handling
   */
  canManageAllData(userEmail: string | null): boolean {
    try {
      return this.authService.isAdmin(userEmail);
    } catch (error) {
      console.error('Error checking data management permissions:', error);
      // Default to false for safety
      return false;
    }
  }

  /**
   * Checks if user can access admin routes with error handling
   */
  canAccessAdminRoutes(userEmail: string | null): boolean {
    try {
      return this.authService.isAdmin(userEmail);
    } catch (error) {
      console.error('Error checking admin route access:', error);
      // Default to false for safety
      return false;
    }
  }

  /**
   * Gets the current user's email from auth service with error handling
   */
  getCurrentUserEmail(): string | null {
    try {
      const currentUser = this.authService.currentUser();
      return currentUser?.email || null;
    } catch (error) {
      console.error('Error getting current user email:', error);
      return null;
    }
  }

  /**
   * Filters navigation items based on user role with error handling
   */
  filterNavigationItems(navItems: any[], userEmail: string | null): any[] {
    try {
      if (!Array.isArray(navItems)) {
        console.error('Invalid navigation items provided:', navItems);
        return [];
      }

      return navItems.filter(item => {
        try {
          if (!item.roles || item.roles.length === 0) {
            // If no roles specified, show to all users
            return true;
          }
          
          if (this.authService.isAdmin(userEmail)) {
            // Admin can see all items
            return true;
          } else {
            // Regular users can only see items marked for 'user' role
            return item.roles.includes('user');
          }
        } catch (itemError) {
          console.error('Error filtering navigation item:', itemError, item);
          return false;
        }
      });
    } catch (error) {
      console.error('Error filtering navigation items:', error);
      this.toastService.show('Navigation loading error. Some menu items may not be displayed.', 'error');
      return [];
    }
  }

  /**
   * Handles data loading with retry mechanism and error handling
   */
  async loadDataWithRetry<T>(
    loadFunction: () => Promise<T>, 
    maxRetries: number = 3,
    errorMessage: string = 'Failed to load data'
  ): Promise<T | null> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await loadFunction();
      } catch (error: any) {
        lastError = error;
        console.error(`Data loading attempt ${attempt} failed:`, error);
        
        // Don't retry for certain error types
        if (error?.status === 401 || error?.status === 403) {
          this.toastService.show('Access denied. Please check your permissions.', 'error');
          throw error;
        }
        
        if (attempt < maxRetries) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    console.error('All data loading attempts failed:', lastError);
    this.toastService.show(`${errorMessage}. Please try again later.`, 'error');
    return null;
  }

  /**
   * Validates data integrity before processing
   */
  validateDataIntegrity<T>(data: T[], requiredFields: string[] = []): boolean {
    try {
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return false;
      }

      if (requiredFields.length > 0) {
        const invalidItems = data.filter(item => {
          return requiredFields.some(field => 
            !item || typeof item !== 'object' || !(field in item)
          );
        });

        if (invalidItems.length > 0) {
          console.error('Data integrity check failed. Invalid items found:', invalidItems);
          this.toastService.show('Data integrity issue detected. Some data may be incomplete.', 'error');
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error validating data integrity:', error);
      return false;
    }
  }

  /**
   * Handles network errors with appropriate user feedback
   */
  handleNetworkError(error: any, context: string = 'operation'): void {
    console.error(`Network error in ${context}:`, error);
    
    let userMessage = `Network error during ${context}. `;
    
    if (!navigator.onLine) {
      userMessage += 'Please check your internet connection.';
    } else if (error?.status === 0) {
      userMessage += 'Server is unreachable. Please try again later.';
    } else if (error?.status >= 500) {
      userMessage += 'Server error. Please try again later.';
    } else if (error?.status === 404) {
      userMessage += 'Requested resource not found.';
    } else {
      userMessage += 'Please try again.';
    }
    
    this.toastService.show(userMessage, 'error');
  }
}