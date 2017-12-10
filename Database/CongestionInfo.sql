CREATE TABLE `CongestionInfo` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `streetName` varchar(200) DEFAULT NULL,
  `congestionRate` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `tid_idx` (`tid`),
  CONSTRAINT `tid` FOREIGN KEY (`tid`) REFERENCES `Travel` (`tid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
