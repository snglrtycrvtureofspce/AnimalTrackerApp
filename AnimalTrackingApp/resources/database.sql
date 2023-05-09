CREATE DATABASE AnimalTracker;

USE AnimalTracker;

CREATE TABLE AnimalTypes (
    AnimalTypeID INT PRIMARY KEY IDENTITY(1,1),
    TypeName NVARCHAR(50) NOT NULL,
    TypeDescription NVARCHAR(255)
);

CREATE TABLE Animals (
    AnimalID INT PRIMARY KEY IDENTITY(1,1),
    AnimalTypeID INT NOT NULL,
    AnimalName NVARCHAR(50) NOT NULL,
    AnimalDescription NVARCHAR(255),
    FOREIGN KEY (AnimalTypeID) REFERENCES AnimalTypes(AnimalTypeID)
);

CREATE TABLE Locations (
    LocationID INT PRIMARY KEY IDENTITY(1,1),
    LocationName NVARCHAR(50) NOT NULL,
    LocationDescription NVARCHAR(255),
    Latitude DECIMAL(9,6),
    Longitude DECIMAL(9,6)
);

CREATE TABLE MovementPoints (
    MovementPointID INT PRIMARY KEY IDENTITY(1,1),
    AnimalID INT NOT NULL,
    LocationID INT NOT NULL,
    DateTime DATETIME NOT NULL,
    FOREIGN KEY (AnimalID) REFERENCES Animals(AnimalID),
    FOREIGN KEY (LocationID) REFERENCES Locations(LocationID)
);