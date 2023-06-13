import React from "react";
import classes from "./contactForm.module.css";

const HelpPage = () => {
  return (
    <div className={classes.contactFormCard}>
      <div>
        <h1>Справка</h1>
        <p>Добро пожаловать!</p>
        <h3>Раздел 1: Введение</h3>
        <p>
          Добро пожаловать на страницу справки! Это веб-приложение разработано
          для отслеживания перемещения животных. Здесь вы можете добавлять типы животных,
          животных, локации и их точки перемещения, а также редактировать и удалять их.
        </p>
        <img
          src={require("../assets/logo.png")}
          alt="Изображение 1"
          width="400"
        />

        <h3>Раздел 2: Навигация</h3>
        <p>
          В этом разделе вы найдете информацию о навигации нашего
          веб-приложения.
        </p>
        <img src={require("./image2.png")} alt="Изображение 2" width="1000" />
        <p>Рисунок 2 - Навигация веб-приложения AnimalTracker</p>
        <p>1 - Домашняя страница</p>
        <p>2 - Типы животных</p>
        <p>3 - Животные</p>
        <p>4 - Локации</p>
        <p>5 - Точки перемещения</p>
        <p>6 - Отчёт</p>
        <p>7 - Справка</p>
        <p>8 - Обратная связь</p>
        <p>9 - Изменение темы белый/чёрный</p>
        <p>10 - Изменить цвет веб-приложения</p>
      </div>
    </div>
  );
};

export default HelpPage;