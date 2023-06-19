import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import axios from "../../utils/axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCargos } from "../../redux/slices/cargos";
import socket from "../../utils/socket";
import moment from "moment";
import "moment/locale/uk";
import { io } from "socket.io-client";
import ReactPlayer from "react-player/youtube";
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: [
    "Міжнародні перевезення",
    "Відділ внтрішніх перевезень",
    "Ужгород",
    "Вінниця",
    "Суми",
    "Тернопіль",
    "Дніпропетровськ",
  ],
  datasets: [
    {
      label: "грн",
      data: [124000, 54000, 45000, 32321, 22333, 44555, 57000],
      backgroundColor: [
        "rgba(29, 196, 205, 0.45)",
        "rgba(8, 55, 86, 0.45)",
        "rgba(255, 206, 86, 0.45)",
        "rgba(75, 192, 192, 0.45)",
        "rgba(153, 102, 255, 0.45)",
        "rgba(255, 159, 64, 0.45)",
        "rgba(31, 203, 54, 0.45)",
      ],
      borderColor: ["rgba(0,0,0,0.1)"],
      borderWidth: 2,
    },
  ],
};

const Home = () => {
  const startOfMonth = moment().startOf("month").format("DD.MM.YYYY");
  const endOfMonth = moment().endOf("month").format("DD.MM.YYYY");
  const userData = useSelector((state) => state.auth.data);
  // const { cargos } = useSelector((state) => state.cargos);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCargos());
  // }, []);
  useEffect(() => {
    userData && socket.emit("newUser", userData.KOD);
  }, [userData]);
  const now = Date.now();
  return (
    <div className="home container">
      {/* {moment("02-06-2023").add(3, "days").calendar()} */}
      <div className="home__inner">
        <div
          style={{
            width: "40%",
            height: "80vh",
            backgroundColor: "rgba(0,0,0,0.02)",
            borderRadius: "10px",
          }}
        >
          <h1>
            Доброго дня {userData?.IMJA ? userData?.IMJA : "Користувач"}. <br />{" "}
            Перейдіть на вкладку завантаження
          </h1>
        </div>
        <div className="news">
          <code>
            Усім привіт. Запускаємо в тестовий режим сайт,для внутрішньої роботи
            менеджерів з логістики. Посилання для входу{" "}
            <a style={{ color: "blue" }} href="http://192.168.5.180/">
              http://192.168.5.180/
            </a>
            <br />
            <br />
            ::: На даний момент на сайт можна буде зайти лише у мережі VPN.
            Тобто лише з робочого ноутбука (пк). ::: На відео записана невеличка
            інструкція по користуванню. Для коректного відображення інформації
            на сайті, необхідно буде час від часу натискати клавішу F5 або ж
            перезавантажити сторінку. ::: <br />
            <br />
            <b>
              {" "}
              Усі побажання щодо покращення функціоналу або якщо замітили якісь
              недоліки,баги,помилки,-прошу писати мені в телеграм: @rtictlviv
              --- Або ж телефонуйте на мій робочий номер телефону : 050 500 11
              07 ---{" "}
            </b>{" "}
            <br />
            <br /> (Доступ до сайту буду зараз надавати кожному менеджеру
            окремо, це займе деякий час)
          </code>
          <ReactPlayer
            width="100%"
            height="100%"
            controls={true}
            url="https://youtu.be/S9VN2BenU4M"
          />
        </div>
      </div>
      {/* <Doughnut data={data} /> */}
    </div>
  );
};

export default Home;
