import { Component, OnInit } from '@angular/core';
import { BodegasService } from './services/bodegas/bodegas.service';
import { ProductosService } from './services/productos/productos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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

  // Declaracion de los formularios
	public btn_disabled: boolean;
	public msg_error_text: Array<any>;
	public msg_success_text: Array<any>;
  public formProducto: FormGroup;
  public formEstado: FormGroup;

  constructor(
    private bodegasService: BodegasService,
    private productosService: ProductosService,
		private formBuilder: FormBuilder
  ){
		this.btn_disabled = false;
		this.buildFormProducto();
    this.buildFormEstadoProducto();
    this.msg_error_text = new Array()
  }

  ngOnInit(){
    this.getBodegas();
    this.getProductos();
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
      result => { this.producto = result; }
    );
  }

  /***** FORMULARIOS REACTIVOS *****/
  /***** FORMULARIO DE CREAR Y EDITAR *****/
	get fldId(){ return this.formProducto.get("id"); }
	get fldNombre(){ return this.formProducto.get("nombre"); }
	get fldCodigo(){ return this.formProducto.get("codigo"); }
	get fldDescripcion(){ return this.formProducto.get("descripcion"); }
	get fldExistencias(){ return this.formProducto.get("existencias"); }
	get fldBodega(){ return this.formProducto.get("id_bodega"); }

	private buildFormProducto(){
		this.formProducto = this.formBuilder.group({
			nombre: ['', Validators.required],
			codigo: ['', Validators.required],
			descripcion: ['', Validators.required],
			existencias: ['', Validators.required],
			id_bodega: ['', Validators.required]
		});
	}

  public validateProducto(){
		this.msg_success_text = null;
		this.msg_error_text = new Array();
		if (this.fldNombre.touched && this.fldNombre.hasError("required")) { this.msg_error_text.push(`El campo Producto es requerido.`); }
		if (this.fldCodigo.touched && this.fldCodigo.hasError("required")) { this.msg_error_text.push(`El campo Código es requerido.`); }
		if (this.fldDescripcion.touched && this.fldDescripcion.hasError("required")) { this.msg_error_text.push(`El campo Descripción es requerido.`); }
		if (this.fldExistencias.touched && this.fldExistencias.hasError("required")) { this.msg_error_text.push(`El campo Existencias es requerido.`); }
		if (this.fldBodega.touched && this.fldBodega.hasError("required")) { this.msg_error_text.push(`El campo Bodega es requerido.`); }
  }

  actualizar(){
    console.log(`Entro en función actualizar`);
    console.log(this.formProducto.value);
    if (this.formProducto.valid) {
      console.log(this.formProducto.value)
      this.formProducto.reset
    }
  }

  /***** FORMULARIO DE ACTUALIZACION DEL ESTADO *****/
	get fldId_producto(){ return this.formEstado.get("id_producto"); }
	get fldEstado(){ return this.formEstado.get("estado"); }

  private buildFormEstadoProducto(){
		this.formEstado = this.formBuilder.group({
			id_producto: ['', Validators.required],
			estado: ['', Validators.required],
		});
	}

	public validateEstadoProducto(){
		this.msg_success_text = null;
		this.msg_error_text = new Array();
		if (this.fldId_producto.touched && this.fldId_producto.hasError("required")) { this.msg_error_text.push(`El campo id_producto es requerido.`); }
		if (this.fldEstado.touched && this.fldEstado.hasError("required")) { this.msg_error_text.push(`El campo Estado es requerido.`); }
  }

  actualizar_estado(){
    console.log(`Entro en función actualizar_estado`);
    if (this.formEstado.valid) {
      console.log(this.formEstado.value)
      this.formEstado.reset
    }
  }

}
