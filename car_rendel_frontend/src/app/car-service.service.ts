import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
    private carUrl = 'https://your-api-endpoint/cars';
  
    constructor(private http: HttpClient) { }

  // Get all cars
  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.carUrl);
  }

  // Add a new car
  addCar(car: any): Observable<any> {
    return this.http.post<any>(this.carUrl, car);
  }

  // Update an existing car
  updateCar(id: number, car: any): Observable<any> {
    return this.http.put<any>(`${this.carUrl}/${id}`, car);
  }

  // Delete a car
  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.carUrl}/${id}`);
  }
}