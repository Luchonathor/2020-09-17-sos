import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bodegas } from '../../interface/bodegas/bodegas';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {
  private url: string;
  constructor(
		public _http: HttpClient
  ) {
		this.url = `http://127.0.0.1:8000/api/bodegas`;
  }

  getBodegas(){ return this._http.get<Bodegas[]>(this.url); }

}
