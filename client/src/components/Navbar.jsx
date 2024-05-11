import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import BasketPanel from "./BasketPanel";
import { fetchGoods } from "../http/basketAPI";

const NavBar = observer(() => {
  const { user, basket } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    basket.setIsLoading(true);
    fetchGoods()
      .then((data) => {
        const dict = {};
        for (let i of data.rows) {
          dict[i.deviceId] = i;
        }
        basket.setDevices(dict);
      })
      .finally(() => basket.setIsLoading(false));
  }, []);

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.clear();
  };
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
            Купить девайс
          </NavLink>
          <Nav className="ml-auto" style={{ color: "white" }}>
            {user.isAuth ? (
              <>
                <BasketPanel />
                <Button
                  variant="outline-light"
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  Админ панель
                </Button>
                <Button
                  className="ms-2"
                  variant="outline-light"
                  onClick={() => logout()}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Авторизация
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
});

export default NavBar;
