-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2024 at 02:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_kelurahan` int(10) UNSIGNED NOT NULL,
  `id_rights_type` int(10) UNSIGNED NOT NULL,
  `id_service` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `file_number` varchar(50) NOT NULL,
  `right_number` varchar(50) NOT NULL,
  `file` varchar(30) NOT NULL,
  `information` varchar(200) DEFAULT NULL,
  `history` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`history`)),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HISTORY` (`history`) USING HASH,
  ADD KEY `fk_id_username` (`id_user`),
  ADD KEY `fk_id_service` (`id_service`),
  ADD KEY `fk_id_rights_type` (`id_rights_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `fk_id_rights_type` FOREIGN KEY (`id_rights_type`) REFERENCES `rights_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_service` FOREIGN KEY (`id_service`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_username` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Buatkan query untuk menyetel untuk colum `file` hanya bisa berisi string "Buku Tanah", "Surat Tanah", dan "Warkah".
ALTER TABLE loans
ADD CONSTRAINT check_file CHECK (file IN ('Buku Tanah', 'Surat Tanah', 'Warkah'));

-- Buatkan query untuk menyetel untuk column `status` hanya bisa berisi string "Pengajuan", "Diterima", "Ditolak", "Peminjaman", "Pengembalian", "Selesai", "Rusak", dan "Hilang".
ALTER TABLE loans
ADD CONSTRAINT check_status CHECK (status IN ('Pengajuan', 'Diterima', 'Ditolak', 'Peminjaman', 'Pengembalian', 'Selesai', 'Rusak', 'Hilang'));

