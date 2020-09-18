import { Component, DoCheck, Host } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.css']
})
export class ListaproductosComponent implements DoCheck {
  public listaProductos: any;

  constructor(
    @Host() private _app: AppComponent
  ) {}

  
  ngDoCheck(){
    this.listaProductos = this._app.listaProductos;
    console.log(this.listaProductos)
  }

}
