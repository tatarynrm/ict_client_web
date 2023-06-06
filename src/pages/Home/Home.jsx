import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCargos } from "../../redux/slices/cargos";
import socket from "../../utils/socket";
import moment from "moment";
import "moment/locale/uk";
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
  const { cargos } = useSelector((state) => state.cargos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCargos());
  }, []);
  useEffect(() => {
    userData && socket.emit("newUser", userData.KOD);
  }, [userData]);
  const now = Date.now();
  return (
    <div className="home container">
      {/* {moment("02-06-2023").add(3, "days").calendar()} */}
      <div style={{ marginTop: "20px" }} className="home__inner">
        <div
          style={{
            width: "40%",
            height: "80vh",
            backgroundColor: "rgba(0,0,0,0.02)",
            borderRadius: "10px",
          }}
          className="chart__marzh"
        >
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;
