CREATE DATABASE  IF NOT EXISTS `ipisis` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ipisis`;
-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: ipisis
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ipisis` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `ipisis`;

--
-- Table structure for table `Compromiso_adj_proyecto`
--

DROP TABLE IF EXISTS `Compromiso_adj_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Compromiso_adj_proyecto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `uri` varchar(256) DEFAULT NULL,
  `proyecto_compromiso_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyecto_compromiso_id` (`proyecto_compromiso_id`),
  CONSTRAINT `Compromiso_adj_proyecto_ibfk_1` FOREIGN KEY (`proyecto_compromiso_id`) REFERENCES `proyecto_compromiso` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `anuncio`
--

DROP TABLE IF EXISTS `anuncio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anuncio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `contenido` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `anuncio_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compromiso_adj_materia`
--

DROP TABLE IF EXISTS `compromiso_adj_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compromiso_adj_materia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `uri` varchar(256) DEFAULT NULL,
  `materia_compromiso_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materia_compromiso_id` (`materia_compromiso_id`),
  CONSTRAINT `compromiso_adj_materia_ibfk_1` FOREIGN KEY (`materia_compromiso_id`) REFERENCES `materia_compromiso` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compromiso_formato`
--

DROP TABLE IF EXISTS `compromiso_formato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compromiso_formato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `completa_equipo` tinyint(1) DEFAULT NULL,
  `completa_tutor` tinyint(1) DEFAULT NULL,
  `formato_id` int(11) DEFAULT NULL,
  `materia_compromiso_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `compromiso_formato_materiaCompromisoId_formadoId_unique` (`formato_id`,`materia_compromiso_id`),
  KEY `materia_compromiso_id` (`materia_compromiso_id`),
  CONSTRAINT `compromiso_formato_ibfk_1` FOREIGN KEY (`formato_id`) REFERENCES `formato` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `compromiso_formato_ibfk_2` FOREIGN KEY (`materia_compromiso_id`) REFERENCES `materia_compromiso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipo` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipo_estudiante`
--

DROP TABLE IF EXISTS `equipo_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipo_estudiante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado_invitacion` varchar(16) DEFAULT NULL,
  `equipo_codigo` int(11) DEFAULT NULL,
  `estudiante_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `equipo_estudiante_estudianteId_equipoCodigo_unique` (`equipo_codigo`,`estudiante_id`),
  KEY `estudiante_id` (`estudiante_id`),
  CONSTRAINT `equipo_estudiante_ibfk_1` FOREIGN KEY (`equipo_codigo`) REFERENCES `equipo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `equipo_estudiante_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(16) DEFAULT NULL,
  `nombre_usuario` varchar(128) DEFAULT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `correo` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `formato`
--

DROP TABLE IF EXISTS `formato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(128) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `historial_idea`
--

DROP TABLE IF EXISTS `historial_idea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_idea` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `observacion` text,
  `estado` varchar(28) DEFAULT NULL,
  `idea_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idea_id` (`idea_id`),
  CONSTRAINT `historial_idea_ibfk_1` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `historial_inscripcion`
--

DROP TABLE IF EXISTS `historial_inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_inscripcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `observacion` text,
  `estado` varchar(28) DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL,
  `inscripcion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inscripcion_id` (`inscripcion_id`),
  CONSTRAINT `historial_inscripcion_ibfk_1` FOREIGN KEY (`inscripcion_id`) REFERENCES `inscripcion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `idea`
--

DROP TABLE IF EXISTS `idea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idea` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(256) DEFAULT NULL,
  `descripcion` text,
  `num_miembros` int(11) DEFAULT NULL,
  `num_equipos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `idea_materia`
--

DROP TABLE IF EXISTS `idea_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idea_materia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idea_id` int(11) DEFAULT NULL,
  `materia_codigo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idea_materia_materiaCodigo_ideaId_unique` (`idea_id`,`materia_codigo`),
  KEY `materia_codigo` (`materia_codigo`),
  CONSTRAINT `idea_materia_ibfk_1` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idea_materia_ibfk_2` FOREIGN KEY (`materia_codigo`) REFERENCES `materia` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inscripcion`
--

DROP TABLE IF EXISTS `inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscripcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime DEFAULT NULL,
  `equipo_codigo` int(11) DEFAULT NULL,
  `oferta_id` int(11) DEFAULT NULL,
  `materia_codigo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `equipo_codigo` (`equipo_codigo`),
  KEY `oferta_id` (`oferta_id`),
  KEY `materia_codigo` (`materia_codigo`),
  CONSTRAINT `inscripcion_ibfk_1` FOREIGN KEY (`equipo_codigo`) REFERENCES `equipo` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `inscripcion_ibfk_2` FOREIGN KEY (`oferta_id`) REFERENCES `oferta` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `inscripcion_ibfk_3` FOREIGN KEY (`materia_codigo`) REFERENCES `materia` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materia` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `electiva` tinyint(1) DEFAULT NULL,
  `admin_proyecto` tinyint(1) DEFAULT NULL,
  `area_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materia_compromiso`
--

DROP TABLE IF EXISTS `materia_compromiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materia_compromiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(64) DEFAULT NULL,
  `descripcion` text,
  `porcentaje` int(11) DEFAULT NULL,
  `completa_equipo` tinyint(1) DEFAULT NULL,
  `fecha_equipo` datetime DEFAULT NULL,
  `adjunto` tinyint(1) DEFAULT NULL,
  `completa_tutor` tinyint(1) DEFAULT NULL,
  `fecha_tutor` datetime DEFAULT NULL,
  `reporte` tinyint(1) DEFAULT NULL,
  `materia_codigo` int(11) DEFAULT NULL,
  `semestre_codigo` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materia_codigo` (`materia_codigo`),
  KEY `semestre_codigo` (`semestre_codigo`),
  CONSTRAINT `materia_compromiso_ibfk_1` FOREIGN KEY (`materia_codigo`) REFERENCES `materia` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `materia_compromiso_ibfk_2` FOREIGN KEY (`semestre_codigo`) REFERENCES `semestre` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oferta`
--

DROP TABLE IF EXISTS `oferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oferta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idea_id` int(11) DEFAULT NULL,
  `semestre_codigo` varchar(8) DEFAULT NULL,
  `profesor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idea_id` (`idea_id`),
  KEY `semestre_codigo` (`semestre_codigo`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `oferta_ibfk_2` FOREIGN KEY (`semestre_codigo`) REFERENCES `semestre` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `oferta_ibfk_3` FOREIGN KEY (`profesor_id`) REFERENCES `profesor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preinscripcion`
--

DROP TABLE IF EXISTS `preinscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preinscripcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime DEFAULT NULL,
  `equipo_codigo` int(11) DEFAULT NULL,
  `idea_id` int(11) DEFAULT NULL,
  `materia_codigo` int(11) DEFAULT NULL,
  `semestre_codigo` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `equipo_codigo` (`equipo_codigo`),
  KEY `idea_id` (`idea_id`),
  KEY `materia_codigo` (`materia_codigo`),
  KEY `semestre_codigo` (`semestre_codigo`),
  CONSTRAINT `preinscripcion_ibfk_1` FOREIGN KEY (`equipo_codigo`) REFERENCES `equipo` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preinscripcion_ibfk_2` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preinscripcion_ibfk_3` FOREIGN KEY (`materia_codigo`) REFERENCES `materia` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `preinscripcion_ibfk_4` FOREIGN KEY (`semestre_codigo`) REFERENCES `semestre` (`codigo`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `prerrequisito`
--

DROP TABLE IF EXISTS `prerrequisito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prerrequisito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idea_id` int(11) DEFAULT NULL,
  `materia_codigo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prerrequisito_materiaCodigo_ideaId_unique` (`idea_id`,`materia_codigo`),
  KEY `materia_codigo` (`materia_codigo`),
  CONSTRAINT `prerrequisito_ibfk_1` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prerrequisito_ibfk_2` FOREIGN KEY (`materia_codigo`) REFERENCES `materia` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(128) DEFAULT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `tipo` varchar(16) DEFAULT NULL,
  `correo` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proponente`
--

DROP TABLE IF EXISTS `proponente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proponente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(32) DEFAULT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `correo` varchar(128) DEFAULT NULL,
  `idea_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idea_id` (`idea_id`),
  CONSTRAINT `proponente_ibfk_1` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) DEFAULT NULL,
  `grupo_mares` varchar(16) DEFAULT NULL,
  `inscripcion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inscripcion_id` (`inscripcion_id`),
  CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`inscripcion_id`) REFERENCES `inscripcion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proyecto_compromiso`
--

DROP TABLE IF EXISTS `proyecto_compromiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyecto_compromiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `observacion` text,
  `fecha_equipo` datetime DEFAULT NULL,
  `fecha_tutor` datetime DEFAULT NULL,
  `estado` varchar(64) DEFAULT NULL,
  `materia_compromiso_id` int(11) DEFAULT NULL,
  `proyecto_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `proyecto_compromiso_proyectoId_materiaCompromisoId_unique` (`materia_compromiso_id`,`proyecto_id`),
  KEY `proyecto_id` (`proyecto_id`),
  CONSTRAINT `proyecto_compromiso_ibfk_1` FOREIGN KEY (`materia_compromiso_id`) REFERENCES `materia_compromiso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proyecto_compromiso_ibfk_2` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orden` int(11) DEFAULT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `contenido` text,
  `formato_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `formato_id` (`formato_id`),
  CONSTRAINT `seccion_ibfk_1` FOREIGN KEY (`formato_id`) REFERENCES `formato` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seguimiento_formato`
--

DROP TABLE IF EXISTS `seguimiento_formato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguimiento_formato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_equipo` datetime DEFAULT NULL,
  `fecha_tutor` datetime DEFAULT NULL,
  `estado` varchar(64) DEFAULT NULL,
  `formato_id` int(11) DEFAULT NULL,
  `proyecto_compromiso_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `seguimiento_formato_proyectoCompromisoId_formatoId_unique` (`formato_id`,`proyecto_compromiso_id`),
  KEY `proyecto_compromiso_id` (`proyecto_compromiso_id`),
  CONSTRAINT `seguimiento_formato_ibfk_1` FOREIGN KEY (`formato_id`) REFERENCES `formato` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seguimiento_formato_ibfk_2` FOREIGN KEY (`proyecto_compromiso_id`) REFERENCES `proyecto_compromiso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `semestre`
--

DROP TABLE IF EXISTS `semestre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semestre` (
  `codigo` varchar(8) NOT NULL,
  `semestre_inicio` datetime DEFAULT NULL,
  `semestre_cierre` datetime DEFAULT NULL,
  `inscripcion_inicio` datetime DEFAULT NULL,
  `inscripcion_cierre` datetime DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-18  8:52:49
