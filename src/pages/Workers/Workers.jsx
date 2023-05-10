import "./Workers.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import {
  fetchActiveUsers,
  fetchFiredUsers,
  fetchUsers,
} from "../../redux/slices/users";
import Loader from "../../components/loader/Loader";

const Workers = () => {
  const auth = useSelector((state) => state.auth.data);
  const { users } = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const showActiveUsers = () => {
    setSearchParams({ filter: "active" });
    dispatch(fetchActiveUsers());
  };
  const showFiredUsers = () => {
    setSearchParams({ filter: "fired" });
    dispatch(fetchFiredUsers());
  };
  const resetUsersFilter = () => {
    setSearchParams({});
    dispatch(fetchUsers());
  };
  useEffect(() => {
    dispatch(fetchActiveUsers());
    setSearchParams({ filter: "active" });
  }, []);
  return (
    <div className="workers container">
      <div className="workers__list container">
        <div
          className={
            auth?.ISDIR !== 0 ? "search__input.active" : "search__input"
          }
        >
          {auth?.ISDIR !== 0 ? null : (
            <>
              <button onClick={showActiveUsers}>Діючі</button>
              <button onClick={showFiredUsers}>Звільнені</button>
              <button onClick={resetUsersFilter}>Скинути фільтр</button>
            </>
          )}
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Ім'я,Прізвище"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p>Працівників:{users.items.length}</p>
        {users.items.length > 0 ? (
          users?.items
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.PRIZV.toLowerCase().includes(search) ||
                    item.IMJA.toLowerCase().includes(search) ||
                    item.IMJA.toUpperCase().includes(search);
            })
            .sort((a, b) => {
              let fa = a.PRIZV.toLowerCase(),
                fb = b.PRIZV.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            })
            .map((item, idx) => (
              <div key={idx} className={`user user-${item.KOD}`}>
                <p>{item.PIPFULL}</p>
                <Link to={`/workers/${item.KOD}`}>
                  <button>Докладна інформація</button>
                </Link>
              </div>
            ))
        ) : (
          <p>Завантаження ...</p>
        )}
      </div>
    </div>
  );
};

export default Workers;
