-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: nodeTest
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

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

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comments` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `commentBody` varchar(255) NOT NULL,
  `userId` char(36) NOT NULL,
  `postId` int(10) unsigned NOT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_UserIdComment` (`userId`),
  KEY `FK_PostIdComment` (`postId`),
  CONSTRAINT `FK_PostIdComment` FOREIGN KEY (`postId`) REFERENCES `Posts` (`Id`),
  CONSTRAINT `FK_UserIdComment` FOREIGN KEY (`userId`) REFERENCES `Users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,'Cool!','62245e2e-75b1-4c5c-a98a-580b86beb07e',69,'2019-03-13 11:38:27.000000','2019-03-13 11:38:27'),(2,'You need to spend more gold on upgrading your skills!','62245e2e-75b1-4c5c-a98a-580b86beb07e',73,'2019-03-13 11:44:57.000000','2019-03-13 11:44:57'),(3,'This is my favorite stage!','62245e2e-75b1-4c5c-a98a-580b86beb07e',71,'2019-03-13 11:48:17.000000','2019-03-13 11:48:17'),(4,'Thanks :)\r\n','7936d559-9cb2-47fe-8133-bddb74ba087c',69,'2019-03-13 11:48:39.000000','2019-03-13 11:48:39'),(5,'What would you spend your gold on first?','51757596-0d4d-4be4-8622-60ff403df863',70,'2019-03-15 00:38:48.000000','2019-03-15 00:38:48'),(6,'Great, was looking for quick access to these. Thanks','51757596-0d4d-4be4-8622-60ff403df863',69,'2019-03-15 00:39:13.000000','2019-03-15 00:39:13'),(7,'No problem!.','62245e2e-75b1-4c5c-a98a-580b86beb07e',69,'2019-03-15 01:43:39.000000','2019-03-15 01:43:39'),(8,'I\'m here Raph','7936d559-9cb2-47fe-8133-bddb74ba087c',77,'2019-03-15 12:30:23.000000','2019-03-15 12:30:23'),(9,'Finally beat him!','51757596-0d4d-4be4-8622-60ff403df863',83,'2019-03-15 12:47:50.000000','2019-03-15 12:47:50'),(10,'I like focusing on strength','62245e2e-75b1-4c5c-a98a-580b86beb07e',70,'2019-03-29 21:37:04.000000','2019-03-29 21:37:04'),(11,'What?','87f9d6ec-12f7-4d4e-ae04-dbf8106296d0',86,'2019-03-30 21:31:41.000000','2019-03-30 21:31:41'),(12,'Can\'t remember lol','62245e2e-75b1-4c5c-a98a-580b86beb07e',86,'2019-03-30 21:33:15.000000','2019-03-30 21:33:15'),(13,'Everyone* ^_^','9fb5144e-44fb-435d-a116-1104d3085951',77,'2019-03-30 21:38:19.000000','2019-03-30 21:38:19'),(14,'Congrats!','9fb5144e-44fb-435d-a116-1104d3085951',84,'2019-03-30 21:56:32.000000','2019-03-30 21:56:32');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Posts` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `textBody` varchar(255) NOT NULL,
  `userId` char(36) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_UserId` (`userId`),
  CONSTRAINT `FK_UserId` FOREIGN KEY (`userId`) REFERENCES `Users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (69,'If anyone would like the instructions for the game, I have them here!.','62245e2e-75b1-4c5c-a98a-580b86beb07e','/uploaded-images/img-1552477096563','2019-03-13 11:38:16.000000','2019-03-13 11:38:16'),(70,'If anyone would like tips for the game please comment below.','62245e2e-75b1-4c5c-a98a-580b86beb07e','null','2019-03-13 11:38:47.000000','2019-03-13 11:38:47'),(71,'I love this snow stage!','7936d559-9cb2-47fe-8133-bddb74ba087c','/uploaded-images/img-1552477237023','2019-03-13 11:40:37.000000','2019-03-13 11:40:37'),(72,'I like this grass stage.','7936d559-9cb2-47fe-8133-bddb74ba087c','/uploaded-images/img-1552477267017','2019-03-13 11:41:07.000000','2019-03-13 11:41:07'),(73,'Can anyone please give me tips on how to deal with this dragon?','51757596-0d4d-4be4-8622-60ff403df863','/uploaded-images/img-1552477458327','2019-03-13 11:44:18.000000','2019-03-13 11:44:18'),(74,'Is there a website that lets you purchase upgrades for the game??','51757596-0d4d-4be4-8622-60ff403df863','null','2019-03-15 00:39:47.000000','2019-03-15 00:39:47'),(75,'I wish they would add some new classes to the game.','62245e2e-75b1-4c5c-a98a-580b86beb07e','null','2019-03-15 12:15:20.000000','2019-03-15 12:15:20'),(76,'I\'m not sure what type of new classes I would like added....','62245e2e-75b1-4c5c-a98a-580b86beb07e','null','2019-03-15 12:23:33.000000','2019-03-15 12:23:33'),(77,'Where is everone?','62245e2e-75b1-4c5c-a98a-580b86beb07e','null','2019-03-15 12:24:13.000000','2019-03-15 12:24:13'),(78,'Trying to get a good screenshot of my character to use as my profile pic!','7936d559-9cb2-47fe-8133-bddb74ba087c','null','2019-03-15 12:30:59.000000','2019-03-15 12:30:59'),(79,'So cool when it rains!','62245e2e-75b1-4c5c-a98a-580b86beb07e','/uploaded-images/img-1552653192628','2019-03-15 12:33:12.000000','2019-03-15 12:33:12'),(82,'I think I\'ll play some chrono-spark tonight','62245e2e-75b1-4c5c-a98a-580b86beb07e','null','2019-03-15 12:43:51.000000','2019-03-15 12:43:51'),(83,'Trying to beat this dragon!','51757596-0d4d-4be4-8622-60ff403df863','/uploaded-images/img-1552654057380','2019-03-15 12:47:37.000000','2019-03-15 12:47:37'),(84,'So happy I beat the dragon! :)','51757596-0d4d-4be4-8622-60ff403df863','null','2019-03-15 12:48:01.000000','2019-03-15 12:48:01'),(85,'Let\'s all try to recruit more people to play this game!','62245e2e-75b1-4c5c-a98a-580b86beb07e','null','2019-03-15 12:53:30.000000','2019-03-15 12:53:30'),(86,'Thinking about #1','62245e2e-75b1-4c5c-a98a-580b86beb07e','null','2019-03-26 18:40:02.000000','2019-03-26 18:40:02'),(87,'Glad to be a part of the community','9fb5144e-44fb-435d-a116-1104d3085951','null','2019-03-30 21:35:06.000000','2019-03-30 21:35:06'),(89,'Got first place! :D','62245e2e-75b1-4c5c-a98a-580b86beb07e','/uploaded-images/img-1553982861559','2019-03-30 21:54:21.000000','2019-03-30 21:54:21');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `Id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `passcode` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('51757596-0d4d-4be4-8622-60ff403df863','Kelly','johnson','1994-09-12','Kellyjohnson@gmail.com','$2a$10$D0QfCwOPi.Xti.PGg..C1ejvtyar9On74PbuJl1BZqrFWNWO1fHcO','/uploaded-images/profile-images/img-51757596-0d4d-4be4-8622-60ff403df863','2019-03-13','2019-03-13'),('62245e2e-75b1-4c5c-a98a-580b86beb07e','Raphael','Ellul Falzon','1992-09-12','Raphno.1@hotmail.com','$2a$10$JQMMJV9PpPpi4zeyzTunrO1ozOBnNyRWPnp4guW88b5ZX52rQDWHG','/uploaded-images/profile-images/img-62245e2e-75b1-4c5c-a98a-580b86beb07e','2019-03-13','2019-03-13'),('7936d559-9cb2-47fe-8133-bddb74ba087c','John','Markson','1990-11-08','JohnMarkson@gmail.com','$2a$10$eXSm9mxfo6XUoinpZRpB0.jlJ7x6mL/pIZnxXajkoMR765kdsfgqS','/uploaded-images/profile-images/blank-profile.png','2019-03-13','2019-03-13'),('87f9d6ec-12f7-4d4e-ae04-dbf8106296d0','Donald','Markson','2005-12-12','pass@gmail.com','$2a$10$mqk46AtHclfFkKf/ibmrs.M/c7fo22onnKQ5wpqljYzl0GqzUPT16','/uploaded-images/profile-images/blank-profile.png','2019-03-30','2019-03-30'),('9fb5144e-44fb-435d-a116-1104d3085951','Shaun','Borg','1989-09-09','Shaun@gmail.com','$2a$10$IacgimHmUUM89hWq2zx2.eWIZG7NisVrBhm.kaRSnnPzbv0DTInDy','/uploaded-images/profile-images/img-9fb5144e-44fb-435d-a116-1104d3085951','2019-03-30','2019-03-30');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-30 22:00:01
