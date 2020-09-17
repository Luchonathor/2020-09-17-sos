<?php
include("../application/config.php");
include("../application/conexion.php");

/**
 * 
 */
class PruebaClass
{
	
	protected $_db;

	public function __construct() {
		$this->_db = new Actions();
	}

	public function getEstadisticas(){
		$sql = '
			SELECT pp.estado, COUNT(pp.id) cuantos
			FROM prb_productos pp
			GROUP BY pp.estado;
		';
		$return = $this->_db->select($sql);
		return $return;
	}

	public function getPrueba(){
		$sql = '
			SELECT pp.id, pp.nombre PRODUCTO, pp.codigo, pp.existencia, pp.descripcion, pp.estado,
				pb.id ID_BODEGA, pb.nombre BODEGA, pb.direccion
			FROM prb_productos pp
				INNER JOIN prb_bodegas pb ON pb.id = pp.id_bodega
			';
		$return = $this->_db->select($sql);
		return $return;
	}

	public function getBodegas(){
		$sql = 'SELECT * FROM prb_bodegas ORDER BY nombre;';
		$return = $this->_db->select($sql);
		return $return;
	}

	public function setPrueba($data){
		$array = Array();
		$array["nombre"] = $data["nombre"];
		$array["descripcion"] = $data["descripcion"];
		$array["codigo"] = $data["codigo"];
		$array["existencia"] = $data["existencia"];
		$array["id_bodega"] = $data["id_bodega"];
		$return["id_producto"] = $this->_db->insertar("prb_productos", $array);
		return $return;
	}

	public function actualizarPrueba($data){
		$array = Array();
		$array["nombre"] = $data["nombre"];
		$array["descripcion"] = $data["descripcion"];
		$array["codigo"] = $data["codigo"];
		$array["existencia"] = $data["existencia"];
		$array["id_bodega"] = $data["id_bodega"];
		$return = $this->_db->actualizar("prb_productos", $array, $data["id"]);
		return $return;
	}

	public function actualizarEstado($data){
		$array = Array();
		$array["estado"] = $data["estado"];
		$return = $this->_db->actualizar("prb_productos", $array, $data["id"]);
		return $return;
	}


	public function getEstadoProducto(){
		$sql = 'SHOW COLUMNS FROM prb_productos LIKE "estado"';
		$result = $this->_db->select($sql);

		foreach ($result["rowsData"] as $key => $value) {
			$value["Type"] = str_replace("enum(", "", $value["Type"]);
			$value["Type"] = str_replace(")", "", $value["Type"]);
			$value["Type"] = str_replace("'", "", $value["Type"]);
	
			$array = explode(",", $value["Type"]);
		}
		return $array;
	}
}


?>

