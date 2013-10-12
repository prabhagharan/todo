-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 12, 2013 at 12:44 PM
-- Server version: 5.5.32
-- PHP Version: 5.3.10-1ubuntu3.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `noding`
--

-- --------------------------------------------------------

--
-- Table structure for table `todo_login_users_password`
--

CREATE TABLE IF NOT EXISTS `todo_login_users_password` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `todo_login_users_password`
--

INSERT INTO `todo_login_users_password` (`userid`, `password`, `username`) VALUES
(1, 'ubuntu', 'deek'),
(2, 'ubuntu', 'dk');

-- --------------------------------------------------------

--
-- Table structure for table `todo_projects`
--

CREATE TABLE IF NOT EXISTS `todo_projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) DEFAULT NULL,
  `project_description` varchar(1000) NOT NULL,
  `finished_percent` int(2) NOT NULL DEFAULT '0',
  `inprogress_percent` int(2) NOT NULL DEFAULT '0',
  `notstarted_percent` int(2) NOT NULL DEFAULT '100',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `todo_projects`
--

INSERT INTO `todo_projects` (`project_id`, `project_name`, `project_description`, `finished_percent`, `inprogress_percent`, `notstarted_percent`) VALUES
(1, 'Create to using node.js and backbone.js !!!', 'Create to using node.js and backbone.js !!!\nCreate to using node.js and backbone.js !!!\nCreate to using node.js and backbone.js !!!!!', 25, 25, 50),
(2, 'Startup engineering course !!', 'Startup engineering course !!', 35, 25, 40),
(8, 'Theme with bootstarp !!', 'Theme with bootstarp !!!', 0, 0, 100),
(9, 'Helloooo', '', 0, 0, 100),
(10, 'hiiii', '', 0, 0, 100),
(11, 'hiii', '', 0, 0, 100),
(12, 'cool', '', 0, 0, 100),
(13, 'cccc', '', 0, 0, 100),
(14, 'cccc', '', 0, 0, 100),
(15, 'cc', '', 0, 0, 100),
(16, 'sss', '', 0, 0, 100),
(17, 'coooo', '', 0, 0, 100),
(18, 'ddd', '', 0, 0, 100),
(19, 'qqq', '', 0, 0, 100),
(20, '111', '', 0, 0, 100),
(21, 'aa', '', 0, 0, 100),
(22, 'qq', '', 0, 0, 100),
(23, 'qqq', '', 0, 0, 100),
(24, 'qq', '', 0, 0, 100),
(25, 'aaa', '', 0, 0, 100),
(26, 'aaaaa', '', 0, 0, 100),
(27, 'aaaqqq', '', 0, 0, 100),
(29, 'qqqqwe', '', 0, 0, 100);

-- --------------------------------------------------------

--
-- Table structure for table `todo_project_user_mapping`
--

CREATE TABLE IF NOT EXISTS `todo_project_user_mapping` (
  `mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`mapping_id`),
  KEY `user_id` (`user_id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `todo_project_user_mapping`
--

INSERT INTO `todo_project_user_mapping` (`mapping_id`, `user_id`, `project_id`) VALUES
(1, 1, 1),
(2, 4, 2),
(3, 1, 8),
(4, 4, 9),
(8, 1, 29);

-- --------------------------------------------------------

--
-- Table structure for table `todo_tasks`
--

CREATE TABLE IF NOT EXISTS `todo_tasks` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `task_title` varchar(100) NOT NULL,
  `task_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `todo_tasks`
--

INSERT INTO `todo_tasks` (`task_id`, `project_id`, `task_title`, `task_description`) VALUES
(1, 2, 'Coool', 'Coooollllll'),
(2, 1, 'Complete with backbone.js', 'Tutorials, videos etc.,'),
(3, 1, 'Do authe !!!!', 'Do authentication'),
(4, 1, 'Socket I/O', 'Explore socket I/O and Socket.js'),
(17, 1, 'QQQQ', 'WWwwwEEE'),
(19, 2, 'JUST DO It', 'DOneeeeeeee coool babe'),
(20, 8, 'WoWWWWW', 'sdsf dgdfgd'),
(21, 27, 'aaa', 'aaa'),
(23, 1, 'Bingo', 'Zooty');

-- --------------------------------------------------------

--
-- Table structure for table `todo_users`
--

CREATE TABLE IF NOT EXISTS `todo_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `todo_users`
--

INSERT INTO `todo_users` (`user_id`, `user_email`, `user_name`, `user_password`) VALUES
(1, 'dk@dk.com', 'DK', 'cool'),
(4, 'dk1@dk.com', 'cooldk', 'cool');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `todo_project_user_mapping`
--
ALTER TABLE `todo_project_user_mapping`
  ADD CONSTRAINT `todo_project_user_mapping_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `todo_users` (`user_id`),
  ADD CONSTRAINT `todo_project_user_mapping_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `todo_projects` (`project_id`);

--
-- Constraints for table `todo_tasks`
--
ALTER TABLE `todo_tasks`
  ADD CONSTRAINT `todo_tasks_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `todo_projects` (`project_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
