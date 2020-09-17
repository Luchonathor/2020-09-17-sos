'use strict'
const url = `controllers/pruebaController.php`;
cargarSlctBodegas();
cargarSlctEstados();
cargarDatos();
resumenDatos();

$("#actualizar").click(function(){
	$(".msg_error").empty();
	$("#confirma-datos").empty();
	var msg_error = ``;


	// Se validan los datos del formulario
	const form = $(this).parents(".modal-content").find(".modal-body #form_data .form-control");
	form.each(function(){
		if (!$(this).val()) { msg_error+= `<small>Debe diligenciar el campo <strong>${$(this).attr("placeholder")}</strong> para continuar.</small><br>`; }
	});

	if (!msg_error) {
		const id = $("#id").val();
		const nombre = $("#producto").val();
		const descripcion = $("#descripcion").val();
		const codigo = $("#codigo").val();
		const existencia = $("#existencias").val();
		const id_bodega = $("#bodega").val();
		let action = "guardar_datos";
		if(id) { action = "actualizar_datos"; }
		const params = {action, id, nombre, descripcion, codigo, existencia, id_bodega}
		ajax(params)
	}
	if (msg_error) { 
		$(".msg_error").html(`
			<div class="alert alert-danger" role="alert">
				<h5>Error:</h5> ${msg_error}
			</div>
		`); 
	}
	$.ajaxSetup({async: true});
});

$("#actualizar_estado").click(function(){
	$(".msg_error").empty();
	var msg_error = ``;

	// Se validan los datos del formulario
	const form = $(this).parents(".modal-content").find(".modal-body #form_estado .form-control");
	form.each(function(){
		if (!$(this).val()) { msg_error+= `<small>Debe diligenciar el campo <strong>${$(this).attr("placeholder")}</strong> para continuar.</small><br>`; }
	});

	if (!msg_error) {
		let action = "actualizar_estado";
		const id = $("#id_estado").val();
		const estado = $("#estado_producto").val();
		const params = {action, id, estado}
		ajax(params)
	}
	if (msg_error) { 
		$(".msg_error").html(`
			<div class="alert alert-danger" role="alert">
				<h5>Error:</h5> ${msg_error}
			</div>
		`); 
	}
	$.ajaxSetup({async: true});
});


function cargarSlctBodegas(){
	let params = { action: "lista_bodegas" }
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		cache: false,
		dataType: "json",
		error: function(jqXHR, textSatatus, errorThorwn){
			msg_error+= `<p>${jqXHR.responseText}</p>`;
		},
		success: function(data){
			data.result.rowsData.forEach(element => {
				$("#bodega").append(`<option value="${element.id}">${element.nombre}</option>`);
			});
		}
	});
}

function cargarSlctEstados(){
	$.ajaxSetup({async: false});
	let params = { action: "lista_estados" }
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		cache: false,
		dataType: "json",
		error: function(jqXHR){
			msg_error+= `<p>${jqXHR.responseText}</p>`;
		},
		success: function(data){
			data.result.forEach(element => {
				$("#estado_producto").append(`<option value="${element}">${element}</option>`);
			});
		}
	});
	$.ajaxSetup({async: true});
}

function resumenDatos(){
	$("#msg_error").empty();
	$("#table_estadisticas tbody").empty();
	var msg_error = ``;
	let params = { action: "cargar_estadisticas" }

	$.ajaxSetup({async: false});
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		cache: false,
		dataType: "json",
		error: function(jqXHR, textSatatus, errorThorwn){
			msg_error+= `<p>${jqXHR.responseText}</p>`;
		},
		success: function(data){
			if (data.result) {
				var datos = data.result;
				for(let elem in datos.rowsData){
					let element = datos.rowsData[elem];
					$("#table_estadisticas tbody").append(`
						<tr>
							<td>${element.estado}</td>
							<td class="text-center">${element.cuantos}</td>
						</tr>
					`);
				};
			}
		}
	});
	if (msg_error) { 
		$("#msg_error").html(`
			<div class="alert alert-danger" role="alert">
				<h4>Error:</h4>
				${msg_error}
			</div>
		`); 
	}
	$.ajaxSetup({async: true});
}

function cargarDatos(){
	$("#msg_error").empty();
	$("#table_productos tbody").empty();
	var msg_error = ``;
	let params = { action: "cargar_datos" }

	$.ajaxSetup({async: false});
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		cache: false,
		dataType: "json",
		error: function(jqXHR, textSatatus, errorThorwn){
			msg_error+= `<p>${jqXHR.responseText}</p>`;
		},
		success: function(data){
			if (data.result) {
				var datos = data.result;
				for(let elem in datos.rowsData){
					let item = datos.rowsData[elem];
					let text_color = "";
					switch (item.estado) {
						case 'pendiente':
							text_color = "warning";
							break;

					case 'activo':
						text_color = "success";
						break;

					case 'inactivo':
						text_color = "danger";
						break;
					}

					$("#table_productos tbody").append(`
						<tr>
							<th scope="row">${(Number(elem)+1)}</th>
							<td>
								<div>${item.PRODUCTO}</div>
								<div><small>${item.descripcion}</small></div>
							</td>
							<td>${item.codigo}</td>
							<td>${item.existencia}</td>
							<td>
								<div>${item.BODEGA}</div>
								<div><small>${item.direccion}</small></div>
							</td>
							<td class="text-right">
								<button 
									type="button" 
									class="btn btn-primary btn-sm form editar" 
									data-toggle="modal" 
									data-target="#form"
									data-id="${item.id}"
									data-producto="${item.PRODUCTO}"
									data-descripcion="${item.descripcion}"
									data-codigo="${item.codigo}"
									data-existencia="${item.existencia}"
									data-id_bodega="${item.ID_BODEGA}"
								>Editar</button>
								<button 
								type="button" 
								class="btn btn-${text_color} btn-sm col-3 estado" 
								data-toggle="modal" 
								data-target="#estado"
								data-id="${item.id}"
								data-estado="${item.estado}"
							>${item.estado}</button>
					</td>
						</tr>
					`);
				};

				$(".editar").click(function(){
					$(".msg_error").empty();
					$("#id").val("");
					$("#id").val( $(this).data("id") );
					$("#producto").val( $(this).data("producto") );
					$("#descripcion").val( $(this).data("descripcion") );
					$("#codigo").val( $(this).data("codigo") );
					$("#existencias").val( $(this).data("existencia") );
					$("#bodega").val( $(this).data("id_bodega") );
				});

				$(".estado").click(function(){
					$(".msg_error").empty();
					$("#id_estado").val("");
					$("#id_estado").val( $(this).data("id") );
					$("#estado_producto").val( $(this).data("estado") );
				});

				$("#form_data")[0].reset();
				$('#table_productos').DataTable();
				resumenDatos();
			}
		}
	});
	if (msg_error) { 
		$("#msg_error").html(`
			<div class="alert alert-danger" role="alert">
				<h4>Error:</h4>
				${msg_error}
			</div>
		`); 
	}
	$.ajaxSetup({async: true});
}

// Función para guardar los datos
function ajax(params){
	$(".msg_error").empty();
	var msg_error = ``;
	$.ajaxSetup({async: false});
	$.ajax({
		url: url,
		type: "POST",
		data: params,
		cache: false,
		dataType: "json",
		error: function(jqXHR){
			msg_error+= `<p>${jqXHR.responseText}</p>`;
		},
		success: function(data){
			$(".msg_error").empty();
			$("#estado").modal("hide");
			$("#form").modal("hide");
			cargarDatos();
		}
	});
	$.ajaxSetup({async: true});
	if (msg_error) { 
		$(".msg_error").html(`
			<div class="alert alert-danger" role="alert">
				<h5>Error:</h5> ${msg_error}
			</div>
		`); 
	}
}
