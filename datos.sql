-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2024 a las 00:20:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `datos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas`
--

CREATE TABLE `cajas` (
  `id` bigint(20) NOT NULL,
  `estado` enum('ABIERTO','CERRADO','PROCESO') NOT NULL,
  `fecha_apertura` datetime(6) NOT NULL,
  `fecha_cierre` datetime(6) DEFAULT NULL,
  `monto_final` decimal(38,2) DEFAULT NULL,
  `monto_inicial` decimal(38,2) NOT NULL,
  `id_empleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `documento` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `ruc` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `numberphone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `address`, `email`, `estado`, `firstname`, `lastname`, `numberphone`, `password`, `username`) VALUES
(1, ' Jirón José Carlos Mariategui n° 123', 'eduysting@gmail.com ', 1, 'Eduardo Abel', 'Padilla Coral', '965825089', '$2a$10$h8EfMW9IG3A8.m5u8UHlTuUbYpHQhwKwqzIE9zXXjGKtlzTU2h5HG', '79545202');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_perfil`
--

CREATE TABLE `empleado_perfil` (
  `id_username` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado_perfil`
--

INSERT INTO `empleado_perfil` (`id_username`, `id_perfil`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`id`, `nombre`) VALUES
(1, 'ADMINISTRADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `precio` decimal(38,2) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_vendidos`
--

CREATE TABLE `productos_vendidos` (
  `id` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descuento` decimal(38,2) DEFAULT NULL,
  `impuesto` decimal(38,2) DEFAULT NULL,
  `precio_venta` decimal(38,2) NOT NULL,
  `sub_total` decimal(38,2) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_venta` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` bigint(20) NOT NULL,
  `fecha_venta` datetime(6) DEFAULT NULL,
  `metodo_pago` enum('EFECTIVO','TARJETA','TRANSFERENCIA') NOT NULL,
  `monto_pagado` decimal(38,2) NOT NULL,
  `tipo_comprobante` enum('BOLETA','FACTURA') NOT NULL,
  `id_caja` bigint(20) DEFAULT NULL,
  `id_cliente` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cajas`
--
ALTER TABLE `cajas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3hrwbf7nup1p85slf2olo03rq` (`id_empleado`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKqcog8b7hps1hioi9onqwjdt6y` (`nombre`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK47fj0e5fbq2l3b80ij3rn1qss` (`documento`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK4b7xjcf8ndjcf7e9yp7u1qgvp` (`username`);

--
-- Indices de la tabla `empleado_perfil`
--
ALTER TABLE `empleado_perfil`
  ADD PRIMARY KEY (`id_username`,`id_perfil`),
  ADD KEY `FK8nsgjjw213xfkm8bly8fc4f45` (`id_perfil`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2fwq10nwymfv7fumctxt9vpgb` (`categoria_id`);

--
-- Indices de la tabla `productos_vendidos`
--
ALTER TABLE `productos_vendidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnb22b7krhcc5rrxunyh402icu` (`id_producto`),
  ADD KEY `FKi0ibbh5c4xq5fql96123yktii` (`id_venta`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqeef0dbixo6w3p404q7n0f1gu` (`id_caja`),
  ADD KEY `FKleerof1mym3gc1ah8hsarel3f` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cajas`
--
ALTER TABLE `cajas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_vendidos`
--
ALTER TABLE `productos_vendidos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cajas`
--
ALTER TABLE `cajas`
  ADD CONSTRAINT `FK3hrwbf7nup1p85slf2olo03rq` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`);

--
-- Filtros para la tabla `empleado_perfil`
--
ALTER TABLE `empleado_perfil`
  ADD CONSTRAINT `FK8nsgjjw213xfkm8bly8fc4f45` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`),
  ADD CONSTRAINT `FKbnoksiwuhb09hbc7ri7qeq3ho` FOREIGN KEY (`id_username`) REFERENCES `empleados` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `FK2fwq10nwymfv7fumctxt9vpgb` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `productos_vendidos`
--
ALTER TABLE `productos_vendidos`
  ADD CONSTRAINT `FKi0ibbh5c4xq5fql96123yktii` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`),
  ADD CONSTRAINT `FKnb22b7krhcc5rrxunyh402icu` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `FKleerof1mym3gc1ah8hsarel3f` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `FKqeef0dbixo6w3p404q7n0f1gu` FOREIGN KEY (`id_caja`) REFERENCES `cajas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
