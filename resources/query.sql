// MS SQL SERVER
CREATE DATABASE AnimalTracker;
GO

USE AnimalTracker;
GO

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
GO

CREATE TABLE Locations (
    LocationID INT PRIMARY KEY IDENTITY(1,1),
    LocationName NVARCHAR(50) NOT NULL,
    LocationDescription NVARCHAR(255),
    Latitude DECIMAL(9,6),
    Longitude DECIMAL(9,6)
);
GO

CREATE TABLE MovementPoints (
    MovementPointID INT PRIMARY KEY IDENTITY(1,1),
    AnimalID INT NOT NULL,
    LocationID INT NOT NULL,
    DateTime NVARCHAR(50) NOT NULL,
    FOREIGN KEY (AnimalID) REFERENCES Animals(AnimalID),
    FOREIGN KEY (LocationID) REFERENCES Locations(LocationID)
);
GO

INSERT INTO AnimalTypes (TypeName, TypeDescription)
VALUES
('Млекопитающие', 'Животные, которые кормятся молоком'),
('Птицы', 'Животные, которые имеют перья'),
('Рыбы', 'Животные, которые живут в воде'),
('Пресмыкающиеся', 'Холоднокровные животные, которые имеют чешуйчатую кожу'),
('Насекомые', 'Животные, которые имеют шесть ног и два крыла');
GO

INSERT INTO Animals (AnimalTypeID, AnimalName, AnimalDescription)
VALUES
(1, 'Собака', 'Домашнее животное, наиболее верный друг человека'),
(2, 'Воробей', 'Мелкий певчий птичка'),
(3, 'Карп', 'Пресноводная рыба'),
(4, 'Черепаха', 'Пресмыкающееся, имеющее череп на спине'),
(5, 'Пчела', 'Насекомое, производящее мед и опыляющее цветы');
GO

INSERT INTO Locations (LocationName, LocationDescription, Latitude, Longitude)
VALUES
('Центральный парк', 'Парк в центре города', 40.7829, -73.9654),
('Зоопарк', 'Место, где содержатся животные', 40.7685, -73.9714),
('Океанариум', 'Место, где показывают морских животных', 40.5749, -73.9743),
('Озеро', 'Небольшое пресноводное озеро', 40.7745, -73.9637),
('Сад', 'Ухоженное место с растениями', 40.7729, -73.9694);
GO

INSERT INTO MovementPoints (AnimalID, LocationID, DateTime)
VALUES
(1, 1, '2023-05-08'),
(1, 2, '2023-05-09'),
(1, 3, '2023-05-10'),
(2, 2, '2023-05-08'),
(3, 4, '2023-05-08'),
(3, 5, '2023-05-09');
GO

// PostgreSQL
CREATE DATABASE AnimalTracker;

\c AnimalTracker;

CREATE TABLE AnimalTypes (
    AnimalTypeID SERIAL PRIMARY KEY,
    TypeName VARCHAR(50) NOT NULL,
    TypeDescription VARCHAR(255)
);

CREATE TABLE Animals (
    AnimalID SERIAL PRIMARY KEY,
    AnimalTypeID INT NOT NULL,
    AnimalName VARCHAR(50) NOT NULL,
    AnimalDescription VARCHAR(255),
    FOREIGN KEY (AnimalTypeID) REFERENCES AnimalTypes(AnimalTypeID)
);

CREATE TABLE Locations (
    LocationID SERIAL PRIMARY KEY,
    LocationName VARCHAR(50) NOT NULL,
    LocationDescription VARCHAR(255),
    Latitude DECIMAL(9,6),
    Longitude DECIMAL(9,6)
);

CREATE TABLE MovementPoints (
    MovementPointID SERIAL PRIMARY KEY,
    AnimalID INT NOT NULL,
    LocationID INT NOT NULL,
    DateTime VARCHAR(50) NOT NULL,
    FOREIGN KEY (AnimalID) REFERENCES Animals(AnimalID),
    FOREIGN KEY (LocationID) REFERENCES Locations(LocationID)
);

INSERT INTO AnimalTypes (TypeName, TypeDescription)
VALUES
('Млекопитающие', 'Животные, которые кормятся молоком'),
('Птицы', 'Животные, которые имеют перья'),
('Рыбы', 'Животные, которые живут в воде'),
('Пресмыкающиеся', 'Холоднокровные животные, которые имеют чешуйчатую кожу'),
('Насекомые', 'Животные, которые имеют шесть ног и два крыла');

INSERT INTO Animals (AnimalTypeID, AnimalName, AnimalDescription)
VALUES
(1, 'Собака', 'Домашнее животное, наиболее верный друг человека'),
(2, 'Воробей', 'Мелкий певчий птичка'),
(3, 'Карп', 'Пресноводная рыба'),
(4, 'Черепаха', 'Пресмыкающееся, имеющее череп на спине'),
(5, 'Пчела', 'Насекомое, производящее мед и опыляющее цветы');

INSERT INTO Locations (LocationName, LocationDescription, Latitude, Longitude)
VALUES
('Центральный парк', 'Парк в центре города', 40.7829, -73.9654),
('Зоопарк', 'Место, где содержатся животные', 40.7685, -73.9714),
('Океанариум', 'Место, где показывают морских животных', 40.5749, -73.9743),
('Озеро', 'Небольшое пресноводное озеро', 40.7745, -73.9637),
('Сад', 'Ухоженное место с растениями', 40.7729, -73.9694);

INSERT INTO MovementPoints (AnimalID, LocationID, DateTime)
VALUES
(1, 1, '2023-05-08'),
(1, 2, '2023-05-09'),
(1, 3, '2023-05-10'),
(2, 2, '2023-05-08'),
(3, 4, '2023-05-08'),
(3, 5, '2023-05-09');