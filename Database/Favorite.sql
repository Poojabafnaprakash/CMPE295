CREATE TABLE `Favorite` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  PRIMARY KEY (`fid`),
  KEY `tid_idx` (`tid`),
  CONSTRAINT `tableID` FOREIGN KEY (`tid`) REFERENCES `Travel` (`tid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
