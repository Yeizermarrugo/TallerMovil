import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
 
  constructor(private http: HttpClient) { }
  getPacientes(): Observable<any[]> {
    return this.http.get<any[]>('assets/server/patientsdb.json');
  }
  
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>('assets/server/categoriesdb.json');
  }
  
  getDietas(): Observable<any[]> {
    return this.http.get<any[]>('assets/server/dietadb.json');
  }
  
}
