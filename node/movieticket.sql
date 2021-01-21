-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 21, 2021 at 03:01 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieticket`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `movieId` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `seat` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `name` varchar(255) NOT NULL,
  `bookedOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`movieId`, `bookingId`, `seat`, `price`, `name`, `bookedOn`) VALUES
(6, 20, '5F', 100, 'alisha', '2021-01-20 20:04:45'),
(6, 21, '23A', 423, 'taylor', '2021-01-20 22:00:50');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movieId` int(11) NOT NULL,
  `movieName` varchar(55) NOT NULL,
  `movieDesc` varchar(255) NOT NULL,
  `moviePoster` varchar(255) NOT NULL,
  `movieRating` float NOT NULL,
  `movieLength` float NOT NULL,
  `movieImg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movieId`, `movieName`, `movieDesc`, `moviePoster`, `movieRating`, `movieLength`, `movieImg`) VALUES
(4, 'Kong', 'Description Description Description Description Description DescriptionDescription Description Description', 'https:/dragon/ballz.net', 5.5, 90.6, 'Screenshot from 2020-12-24 12-48-37.png'),
(6, 'hellboy', 'paras gupta', 'https://imgc.allpostersimages.com/img/print/u-g-EZ2740.jpg', 2.1, 23, 'Screenshot from 2021-01-18 19-20-25.png'),
(7, 'hellboy 2', 'GOku, freeza , gohan', 'https:/dragon/ballz.net', 5.5, 90.6, 'Screenshot from 2020-12-08 11-58-19.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(2) NOT NULL,
  `username` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(10) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `phone`, `password`) VALUES
(1, 'paras0799', 'paras', 'sharma', 'xyz@abc.com', 822108, 'paras'),
(3, 'paras0911', 'zayn', 'malik', 'zayn@123.com', 9999999999999, 'asncaopnfv'),
(5, 'komal@12', 'komal', 'thakur', 'komal@123.com', 739845254, 'komal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`bookingId`),
  ADD KEY `movieId` (`movieId`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movieId`),
  ADD UNIQUE KEY `movieName` (`movieName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `bookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movieId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movies` (`movieId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
