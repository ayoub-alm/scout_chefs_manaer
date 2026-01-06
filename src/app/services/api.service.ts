import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chef {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  yearsOfExperience: number;
  primaryCuisine: string;
  secondaryCuisines: string;
  currentPosition: string;
  currentRestaurant: string;
  availabilityStatus: string;
  expectedSalaryRange: string;
  rating: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChefPage {
  content: Chef[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  user?: {
    id: number;
    email: string;
    full_name: string;
    role: string;
    city?: string;
    region?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8002/api/v1';
  private readonly authUrl = 'http://localhost:8002/api/v1/auth';

  /**
   * Get all chefs with pagination and filtering
   */
  getChefs(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    sortDirection: string = 'DESC',
    search?: string,
    cuisine?: string,
    country?: string,
    availability?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    if (search) params = params.set('search', search);
    if (cuisine) params = params.set('cuisine', cuisine);
    if (country) params = params.set('country', country);
    if (availability) params = params.set('availability', availability);

    return this.http.get<any>(`${this.apiUrl}/chefs`, { params });
  }

  /**
   * Get a single chef by ID
   */
  getChefById(id: number): Observable<Chef> {
    return this.http.get<Chef>(`${this.apiUrl}/chefs/${id}`);
  }

  /**
   * Create a new chef
   */
  createChef(chef: Partial<Chef>): Observable<Chef> {
    return this.http.post<Chef>(`${this.apiUrl}/chefs`, chef);
  }

  /**
   * Update an existing chef
   */
  updateChef(id: number, chef: Partial<Chef>): Observable<Chef> {
    return this.http.put<Chef>(`${this.apiUrl}/chefs/${id}`, chef);
  }

  /**
   * Delete a chef
   */
  deleteChef(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/chefs/${id}`);
  }

  /**
   * Search chefs by name or email
   */
  searchChefs(query: string): Observable<Chef[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Chef[]>(`${this.apiUrl}/chefs/search`, { params });
  }

  /**
   * User login
   */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, { email, password });
  }

  /**
   * User registration
   */
  register(email: string, password: string, fullName: string, city?: string, region?: string, role: string = 'MEMBER'): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, { email, password, full_name: fullName, city, region, role });
  }

  /**
   * Get JWT token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  /**
   * Set JWT token in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  extractToken(resp: AuthResponse): string | undefined {
    return resp.token || resp.access_token;
  }

  /**
   * Clear JWT token
   */
  clearToken(): void {
    localStorage.removeItem('jwtToken');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
