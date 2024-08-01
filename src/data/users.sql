-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Agu 2024 pada 19.49
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
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `refresh_token` text DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `phone_number`, `password`, `isAdmin`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'Adelia Putri', 'adelia_putri', 'adeliaputri@gmail.com', '081234567890', '$2b$10$Ctdcp/CGoKZG/FAlIpQ7f.m1tEHus9O2nQ6wvzMTdXEjzbNT2jT7G', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRlbGlhX3B1dHJpIiwibmFtZSI6IkFkZWxpYSBQdXRyaSIsImVtYWlsIjoiYWRlbGlhcHV0cmlAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwODEyMzQ1Njc4OTAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MjI1MTY4MjYsImV4cCI6MTcyMjYwMzIyNn0.EDvlRE1cWVIsTzIe0NHx0f3w8Wn7Y9-A6GicYzBjkRY', '2024-08-01', '2024-08-01'),
(2, 'Kurokawa Akane', 'akane2005', 'kurkawa@gmail.com', '081234567890', '$2b$10$DC3.s4PvoGZEYME83Ti1K.52.WuNNxJrqZ7L1bSSVKZWbNKt6pE0W', 0, NULL, '2024-08-01', '2024-08-01');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email_username` (`email`,`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
