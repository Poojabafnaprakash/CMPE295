CREATE TABLE `Travel` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `src` varchar(500) DEFAULT NULL,
  `dst` varchar(500) DEFAULT NULL,
  `timeOfDay` varchar(40) DEFAULT NULL,
  `dayOfWeek` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
