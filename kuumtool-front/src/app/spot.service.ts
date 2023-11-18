import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spot } from './models/Spot';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Example method to fetch data using GET
  getSpots(): Observable<Spot[]> {
    return this.http.get<Spot[]>(this.apiUrl+'/spots');
  }
}
