-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.11-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para prb_sos
DROP DATABASE IF EXISTS `prb_sos`;
CREATE DATABASE IF NOT EXISTS `prb_sos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `prb_sos`;

-- Volcando estructura para tabla prb_sos.prb_bodegas
DROP TABLE IF EXISTS `prb_bodegas`;
CREATE TABLE IF NOT EXISTS `prb_bodegas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `direccion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla prb_sos.prb_bodegas: ~3 rows (aproximadamente)
DELETE FROM `prb_bodegas`;
/*!40000 ALTER TABLE `prb_bodegas` DISABLE KEYS */;
INSERT INTO `prb_bodegas` (`id`, `nombre`, `direccion`) VALUES
	(1, 'Bodega 1', 'Direccion 1'),
	(2, 'Bodega 2', 'Direccion 2'),
	(3, 'Bodega 3', 'Direccion 3');
/*!40000 ALTER TABLE `prb_bodegas` ENABLE KEYS */;

-- Volcando estructura para tabla prb_sos.prb_productos
DROP TABLE IF EXISTS `prb_productos`;
CREATE TABLE IF NOT EXISTS `prb_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `codigo` text NOT NULL,
  `existencia` int(11) NOT NULL DEFAULT 0,
  `id_bodega` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` enum('activo','inactivo','pendiente') NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  KEY `producto_bodega` (`id_bodega`),
  CONSTRAINT `producto_bodega` FOREIGN KEY (`id_bodega`) REFERENCES `prb_bodegas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla prb_sos.prb_productos: ~3 rows (aproximadamente)
DELETE FROM `prb_productos`;
/*!40000 ALTER TABLE `prb_productos` DISABLE KEYS */;
INSERT INTO `prb_productos` (`id`, `nombre`, `codigo`, `existencia`, `id_bodega`, `descripcion`, `estado`) VALUES
	(1, 'Producto 1', '000001', 250, 1, 'Es un producto básico', 'inactivo'),
	(2, 'Producto 2', '000002', 0, 3, 'Es un nuevo producto', 'activo'),
	(3, 'Producto 4', '00004', 20, 2, 'Desde el formulario', 'activo');
/*!40000 ALTER TABLE `prb_productos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
