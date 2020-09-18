import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BodegasService } from './services/bodegas/bodegas.service';
import { ProductosService } from './services/productos/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public listaBodegas: Array<any>;
  public listaProductos: Array<any>;
  public producto: any;

  constructor(
    private bodegasService: BodegasService,
    private productosService: ProductosService
  ){

  }

  ngOnInit(){
    this.getBodegas();
    this.getProductos();
    // this.getProducto(1);
  }

  getBodegas(){
    this.bodegasService.getBodegas().subscribe(
      result => { this.listaBodegas = result; }
    );
  }

  getProductos(){
    this.productosService.getProductos().subscribe(
      result => { this.listaProductos = result; }
    );
  }

  getProducto(id: number){
    this.productosService.getProducto(id).subscribe(
      result => { 
        console.log(result);
        this.producto = result;
      }
    );
  }

}
