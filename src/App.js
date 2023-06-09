import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workers from "./pages/Workers/Workers";
import Worker from "./pages/Worker/Worker";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import DoesntExist from "./pages/DoesntExist/DoesntExist";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { fetchActiveUsers, fetchUsers } from "./redux/slices/users";
import CurrentTransportation from "./pages/CurrentTransportation/CurrentTransportation";
import Chat from "./pages/Chat/Chat";
import CurrentTransportationItem from "./pages/CurrentTransportation/CurrentTransportationItem";
import Transportation from "./pages/Transportation/Transportation";
import Carriers from "./pages/Carriers/Carriers";
import axios from "./utils/axios";
import LogisticWork from "./pages/LogisticWork/LogisticWork";
import { fetchGroups, fetchZap } from "./redux/slices/zap";
import { editZap } from "./redux/slices/edit";
import ZapEditForm from "./components/zap/ZapEditForm";
import { io } from "socket.io-client";
import socket from "./utils/socket";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const userData = useSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/workers" element={<Workers />} /> */}
          {/* <Route path={`/workers/:id`} element={<Worker />} /> */}
          {/* <Route path={`/chat`} element={<Chat />} /> */}
          {/* <Route path={`/transportation`} element={<Transportation />} /> */}
          <Route path={`/carriers`} element={<Carriers />} />
          <Route path={`/logistic-work`} element={<LogisticWork />} />
          {/* <Route
            path={`/current-transportation`}
            element={<CurrentTransportation />}
          /> */}
          {/* <Route
            path={`/current-transportation/:id`}
            element={<CurrentTransportationItem />}
          /> */}
        </Route>
        <Route path="*" exact={true} element={<DoesntExist />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
