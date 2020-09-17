<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Prueba Luis Miguel</title>
	<link rel="stylesheet" type="text/css" href="libs/bootstrap/css/bootstrap.min.css">
</head>
<body>
	<div class="container-fluid">
		<div class="card bg-light mb-3">
			<div class="card-header">
				<h4>Prueba Luis Miguel Mora</h4>
				<div class="text-right">
				<button type="button" class="btn btn-primary btn-sm crear" data-toggle="modal" data-target="#form">Crear</button>
				</div>
			</div>
			<div class="card-body">
				<div id="msg_error"></div>
				<h5 class="card-title">Productos</h5>
				<p class="card-text">Lista de productos.</p>

				<table class="table table-sm table-striped table-dark col-3" id="table_estadisticas">
					<thead>
						<tr>
							<th scope="col" colspan="2">Estadísticas generales</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>

				<table class="table table-sm table-striped" id="table_productos">
					<thead class="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nombre Producto</th>
							<th scope="col">Código</th>
							<th scope="col">Existencias</th>
							<th scope="col">Bodega</th>
							<th scope="col">Editar</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>

			</div>
		</div>
	</div>

	<!-- modal para los formularios -->
	<div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="form" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="viewPorductoLabel">Administrar Producto</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="msg_error"></div>
					<form id="form_data">
						<input type="hidden" id="id">
						<div class="row justify-content-center">
						<div class="col-12 form-group">
								<label for="producto">(*)Producto:</label>
								<input type="text" id="producto" class="form-control" placeholder="Producto">
							</div>
							<div class="col-12 form-group">
								<label for="descripcion">(*)Descripción:</label>
								<input type="text" id="descripcion" class="form-control" placeholder="Descripción">
							</div>
							<div class="col-12 form-group">
								<label for="codigo">(*)Código:</label>
								<input type="text" id="codigo" class="form-control" placeholder="Código">
							</div>
							<div class="col-12 form-group">
								<label for="existencias">(*)Existencias:</label>
								<input type="number" id="existencias" class="form-control" placeholder="Existencias" min="0">
							</div>
							<div class="col-12 form-group">
								<label for="bodega">(*)Bodega:</label>
								<select id="bodega" class="form-control" placeholder="Bodega">
									<option value="" selected="selected" disabled="disabled">Seleccione</option>
								</select>
							</div>
							<div class="col-12 form-group text-center">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary text-right" id="actualizar" data-toggle="modal" data-target="#exampleModal">Guardar</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="estado" tabindex="-1" role="dialog" aria-labelledby="estado" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="viewPorductoLabel">Cambiar estado</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="msg_error"></div>
					<form id="form_estado">
						<input type="hidden" id="id_estado">
						<div class="row justify-content-center">
							<div class="col-12 form-group">
								<label for="estado_producto">(*)Estado:</label>
								<select id="estado_producto" class="form-control" placeholder="Estado">
									<option value="" selected="selected" disabled="disabled">Seleccione</option>
								</select>
							</div>
							<div class="col-12 form-group text-center">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary text-right" id="actualizar_estado">Guardar</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="libs/jquery.js"></script>
	<script type="text/javascript" src="libs/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="libs/bootstrap/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="libs/bootstrap/js/dataTables.bootstrap4.min.js"></script>
	<script type="text/javascript" src="libs/script.js"></script>
</body>
</html>