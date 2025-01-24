import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFlowers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/flowers`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  addFlower(flower: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/flowers`, flower, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteFlower(flowerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/flowers/${flowerId}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  private handleError(error: any) {
    let errorMessage = 'Произошла ошибка';

    if (error.status === 400) {
      if (error.url.includes('/flowers')) {
        if (error.url.endsWith('/flowers')) {
          errorMessage = 'Не удалось загрузить список цветов';
        } else if (error.url.includes('/flowers/') && error.url.match(/\d+$/)) {
          errorMessage = 'Не удалось удалить цветок';
        } else {
          errorMessage = 'Не удалось добавить цветок';
        }
      } else {
        errorMessage = 'Не удалось обработать запрос';
      }
    } else if (error.status === 500) {
      errorMessage = 'Серверная ошибка';
    } else if (error.status === 404) {
      errorMessage = 'Не удалось найти цветок';
    }

    return throwError(errorMessage);
  }



}
