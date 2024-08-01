-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Agu 2024 pada 19.48
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ewarkah_databases`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kecamatan`
--

CREATE TABLE `kecamatan` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kecamatan`
--

INSERT INTO `kecamatan` (`id`, `name`) VALUES
(23, 'Bandar'),
(22, 'Bandar Huluan'),
(24, 'Bandar Masilam'),
(8, 'Bosar Maligas'),
(32, 'Dolog Masagal'),
(17, 'Dolok Batu Nanggar'),
(13, 'Dolok Panribuan'),
(20, 'Dolok Pardamean'),
(26, 'Dolok Silou (Dolok Silau)'),
(16, 'Girsang Sipangan Bolon'),
(2, 'Gunung Malela'),
(3, 'Gunung Maligas'),
(15, 'Haranggaol Horisan (Haranggaol Horison)'),
(12, 'Hatonduhan'),
(18, 'Huta Bayu Raja'),
(19, 'Jawa Maraja Bah Jambi'),
(6, 'Jorlang Hataran'),
(10, 'Pamatang Sidamanik (Pematang Sidamanik)'),
(31, 'Pamatang Silima Huta (Pematang)'),
(4, 'Panei'),
(5, 'Panombeian Panei / Pane'),
(21, 'Pematang Bandar'),
(14, 'Purba'),
(29, 'Raya'),
(7, 'Raya Kahean'),
(1, 'Siantar'),
(9, 'Sidamanik'),
(25, 'Silimakuta'),
(27, 'Silou Kahean'),
(11, 'Tanah Jawa'),
(28, 'Tapian Dolok'),
(30, 'Ujung Padang');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_nama_kecamatan` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
