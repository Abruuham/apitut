CREATE TABLE tweets ( 
   tweet_id INT NOT NULL AUTO_INCREMENT,
   tweet VARCHAR(140) NOT NULL,
   tweet_author VARCHAR(40) NOT NULL,
   tweet_date DATE,
   PRIMARY KEY ( tweet_id )
 );