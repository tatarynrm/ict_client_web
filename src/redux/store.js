import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/users";
import { cargosReducer } from "./slices/cargos";
import { authReducer } from "./slices/auth";
const store = configureStore({
  reducer: {
    users: userReducer,
    cargos: cargosReducer,
    auth: authReducer,
  },
});

export default store;
