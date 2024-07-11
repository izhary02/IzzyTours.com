-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2023 at 04:38 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel`
--
CREATE DATABASE IF NOT EXISTS `travel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `travel`;

-- --------------------------------------------------------

--
-- Table structure for table `follower`
--

CREATE TABLE `follower` (
  `userId` int(11) NOT NULL,
  `locationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follower`
--

INSERT INTO `follower` (`userId`, `locationId`) VALUES
(3, 13),
(3, 8),
(3, 16),
(2, 11),
(2, 14),
(2, 15),
(6, 8),
(6, 13),
(6, 14),
(6, 16),
(4, 11),
(4, 8),
(4, 13),
(5, 8),
(5, 14),
(5, 13),
(5, 16);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `locationId` int(11) NOT NULL,
  `locationName` varchar(20) NOT NULL,
  `locationsInfo` varchar(200) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `locationsStartDate` date NOT NULL,
  `locationsEndDate` date NOT NULL,
  `imageName` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`locationId`, `locationName`, `locationsInfo`, `price`, `locationsStartDate`, `locationsEndDate`, `imageName`) VALUES
(7, 'Rome', 'Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale', 230, '2023-11-30', '2023-12-07', '431f457e-76eb-42b0-89cf-835464f969af.jpg'),
(8, 'Tokyo', 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.', 1400, '2023-12-08', '2023-12-23', '0c76b753-2fd3-4a39-8d46-462753b5d7aa.jpeg'),
(11, 'Tel Aviv', 'Tel Aviv, a city on Israel’s Mediterranean coast, is marked by stark 1930s Bauhaus buildings, thousands of which are clustered in the White City architectural area. Museums include Beit Hatfutsot,', 120, '2023-11-26', '2023-11-29', '94a712b2-1801-4b8f-acdb-40b1b47f2928.jpg'),
(13, 'Sydney', 'capital of New South Wales and one of Australia\'s largest cities, is best known for its harbourfront Sydney Opera House', 1900, '2023-11-25', '2023-11-25', 'c20dfc31-2fb3-4756-a5d4-49aa70fd9417.jpg'),
(14, 'New York', 'comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s', 1600, '2023-12-09', '2023-12-24', 'f411fe9b-7991-4011-90a2-335ce0996f8b.jpg'),
(15, 'Porto', 'is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district', 600, '2024-05-02', '2024-05-22', 'f24bed1a-45c6-4b80-abbd-ad6743564ce4.avif'),
(16, 'London', 'the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament', 400, '2023-12-14', '2023-12-14', 'd178112a-6ed2-4fb8-9d7f-bc7d619e2ada.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(20) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `role`, `email`) VALUES
(1, 'izzy', 'yefet', 'izzy-yefet', '704a94519eaee353301950494b9303b6f2c930fb7e67f54abe6c510cfc88979172fd701aa89c28a01b711404cc83039bfe5ae464a4f4a6d207032165192721d3', 'Admin', 'izzy.yefet@wala.com'),
(2, 'brorya', 'yudelblat', 'boryo', '6f7250eea4c3636212d4017431724a3427770c08c730ecbeab1b3a316e9760528f64d75f1b91a58d5757cd989bf24b06f781faaf88aace3cda25f0b9f3d14bd1', 'User', 'brorya.yudelblat@yaho.com'),
(3, 'mimi', 'nimi', 'mimim', '704a94519eaee353301950494b9303b6f2c930fb7e67f54abe6c510cfc88979172fd701aa89c28a01b711404cc83039bfe5ae464a4f4a6d207032165192721d3', 'User', 'mimim@gmail.com'),
(4, 'cedric', ' grolet', ' cedric grolet', 'c6abd9a15bf0cb3ef874290755cc1df5b854febb9295c9e9b3a7743b1ae8d7410456bfb5895b18279a2af7b6a5af8b9aee98fbd6416a3f3722935471f62639ee', 'User', 'cedric.grolet@gmail.com'),
(5, 'roi', 'bary', 'roiboy', '6f7250eea4c3636212d4017431724a3427770c08c730ecbeab1b3a316e9760528f64d75f1b91a58d5757cd989bf24b06f781faaf88aace3cda25f0b9f3d14bd1', 'User', 'roiboy@walla.co.il'),
(6, 'many', 'meriot', 'many-mamtera', 'c6abd9a15bf0cb3ef874290755cc1df5b854febb9295c9e9b3a7743b1ae8d7410456bfb5895b18279a2af7b6a5af8b9aee98fbd6416a3f3722935471f62639ee', 'User', 'many.mamtera@holo.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follower`
--
ALTER TABLE `follower`
  ADD KEY `userId` (`userId`),
  ADD KEY `locationId` (`locationId`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`locationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `locationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `follower_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `locations` (`locationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follower_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
