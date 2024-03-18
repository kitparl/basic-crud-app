import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person'; // Assuming you have a Person model

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private baseUrl = 'http://localhost:3000'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}/person`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.baseUrl}/person`, person);
  }

  updatePerson(id: Number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseUrl}/person/${id}`, person);
  }

  deletePerson(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/person/${id}`);
  }
}
