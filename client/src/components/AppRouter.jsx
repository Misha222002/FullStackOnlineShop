import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publickRoutes } from "../routes";
import { DEFAULT_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Shop from "../pages/Shop";
import { Context } from "../main";

export default function AppRouter() {
  const { user } = useContext(Context);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publickRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {<Route path={DEFAULT_ROUTE} element={<Shop />} />}
    </Routes>
  );
}
