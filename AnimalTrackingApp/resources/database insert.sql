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
(1, 1, '2023-05-08 10:30:00'),
(2, 2, '2023-05-08 12:00:00'),
(3, 4, '2023-05-08 14:00:00'),
(4, 2, '2023-05-08 16:00:00'),
(5, 5, '2023-05-08 18:00:00');