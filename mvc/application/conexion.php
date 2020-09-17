<?php
	class Conectar{
		public static function Conexion(){
			$DB_HOST = DB_HOST;
			$DB_NAME = DB_NAME;
			$DB_USER = DB_USER;
			$DB_PASS = DB_PASS;

			$conex = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
			if(mysqli_connect_errno()):
				return "Error de conexion";
				exit();
			else:
				$conex->query("SET NAMES utf8");
				return $conex;
			endif;

			$conex->free();
			$conex->close();
		}
	}

	class Actions{
		public function select($sql){
			$conex = Conectar::Conexion();
			$result = $conex->query($sql) or die($conex->error.__LINE__);
			$arrayrows = array();

			if($result->num_rows > 0){
				while( $rows = $result->fetch_array() ){
					array_push($arrayrows, $rows);
				}
				return $arrayData = array("rowsData"=> $arrayrows, "rowsNum"=>$result->num_rows);
			} else { return false; }
		}

		public function insertar($table, $array){
			$conex = Conectar::Conexion();		
			$campos = '';
			$valor = '';
			
			foreach ($array as $key => $value) {
			  $campos .= "`{$key}`,";	  
			  $valor  .= "'{$value}',"; 
			}		
			
			$sql = 'INSERT INTO `'.$table.'` ('.substr($campos, 0, -1).') VALUES ('.substr($valor, 0, -1).')';
			$result = $conex->query($sql) or die($conex->error.__LINE__);
		
			return $conex->insert_id;
			$conex->free();
			$conex->close();
		}
		
		public function actualizar($table, $array, $id){
			$conex = Conectar::Conexion();	
			$campos = "";		
			
			foreach ($array as $key => $value) {
				 $campos .= "`{$key}` = '{$value}',";
			}
			
			$sql = 'UPDATE `'.$table.'` SET '.substr($campos, 0, -1).' WHERE id = '.$id;
			if($conex->query($sql)):
				return 1;
			else:
				return 0;
			endif;
			
			return $conex->query($sql) or die(0);	
			$conex->free();
		}

		public function query($sql){
			$conex = Conectar::Conexion();	
			
			if($conex->query($sql)): return 1;
			else: return 0;
			endif;

			return $conex->query($sql) or die(0);	
			$conex->free();
		}
	

	}
?>
