import { HttpClient } from '@angular/common/http';
import { Regiao } from './../interfaces/regiao';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegiaoService {
  private apiUrl = 'https://fiap-3sis-gs-20241.azurewebsites.net/OceanData';

    list(): Observable<Regiao[]> {
      return this.http.get<Regiao[]>(this.apiUrl) as Observable<Regiao[]>;
    }

  constructor(private http: HttpClient) { }
}
