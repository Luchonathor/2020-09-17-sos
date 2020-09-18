import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Productos } from '../../interface/productos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: string;
  constructor(
		public _http: HttpClient
  ) {
		this.url = `http://127.0.0.1:8000/api/productos/`;
  }

  getProductos(){ return this._http.get<Productos[]>(this.url); }

  getProducto(id: number){ return this._http.get<Productos>(this.url+id); }

}
