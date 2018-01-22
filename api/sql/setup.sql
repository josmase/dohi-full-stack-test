CREATE TABLE IF NOT EXISTS bundle (
  id    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name  CHAR(255),
  image CHAR(255),
  info  CHAR(255)
);
CREATE TABLE IF NOT EXISTS path (
  id       INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name     CHAR(255),
  info     CHAR(255),
  length   CHAR(255),
  duration CHAR(255),
  image    CHAR(255),
  bundleID INT,
  FOREIGN KEY (bundleID) REFERENCES bundle (id)
    ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS place (
  id     INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name   CHAR(255),
  info   CHAR(255),
  image  CHAR(255),
  radius INT,
  pathID INT,
  FOREIGN KEY (pathID) REFERENCES path (id)
    ON DELETE CASCADE
);
