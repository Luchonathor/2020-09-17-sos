<?php
include("../models/pruebaModel.php");

$prueba = new PruebaClass();

date_default_timezone_set('America/Bogota');
$return = Array();

switch ($_POST["action"]) {
	case 'cargar_estadisticas':
		$array = Array();
		$result = $prueba->getEstadisticas();
		if ($result){ $return["result"] = $result; }
		break;

	case 'cargar_datos':
		$array = Array();
		$result = $prueba->getPrueba();
		if ($result){ $return["result"] = $result; }
		break;

	case 'lista_bodegas':
		$array = Array();
		$result = $prueba->getBodegas();
		if ($result){ $return["result"] = $result; }
		break;

	case 'lista_estados':
		$array = Array();
		$result = $prueba->getEstadoProducto();
		if ($result){ $return["result"] = $result; }
		break;
	
	case'guardar_datos':
		$array = Array();
		$array["nombre"] = $_POST["nombre"];
		$array["descripcion"] = $_POST["descripcion"];
		$array["codigo"] = $_POST["codigo"];
		$array["existencia"] = $_POST["existencia"];
		$array["id_bodega"] = $_POST["id_bodega"];
		$result = $prueba->setPrueba($array);		
		$return["result"] = $result;
		break;
	
	case'actualizar_datos':
		$array = Array();
		$array["id"] = $_POST["id"];
		$array["nombre"] = $_POST["nombre"];
		$array["descripcion"] = $_POST["descripcion"];
		$array["codigo"] = $_POST["codigo"];
		$array["existencia"] = $_POST["existencia"];
		$array["id_bodega"] = $_POST["id_bodega"];
		$result = $prueba->actualizarPrueba($array);		
		$return["result"] = $result;
		break;

	case'actualizar_estado':
		$array = Array();
		$array["id"] = $_POST["id"];
		$array["estado"] = $_POST["estado"];
		$result = $prueba->actualizarEstado($array);		
		$return["result"] = $result;
		break;
}

echo json_encode($return);
?>