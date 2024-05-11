import React, { useContext, useEffect, useState } from "react";
import shop from "../assets/shop.png";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { Button, Dropdown } from "react-bootstrap";
import { fetchManyDevices, fetchOneDevice } from "../http/deviceAPI";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const BasketPanel = () => {
  const navigate = useNavigate();
  const { basket } = useContext(Context);
  const [goods, setGoods] = useState([]);
  useEffect(() => {
    fetchManyDevices(basket.devices).then((data) => {
      data.map((i) => (i.count = basket.devices[i.id].count));
      setGoods(data);
    });
  }, [basket.devices]);

  return (
    <Dropdown className="mx-3">
      <Dropdown.Toggle
        id="dropdown"
        style={{
          cursor: "pointer",
          background: `url(${shop}) no-repeat center center`,
          width: 38,
          height: 38,
          backgroundSize: "cover",
          fontSize: 64,
          "&:after": {
            display: "none !important",
          },
        }}
      />
      {Object.keys(basket.devices).length !== 0 && (
        <>
          <Dropdown.Menu>
            {goods.map((i) => (
              <Dropdown.Item
                key={i.id}
                onClick={() => navigate(DEVICE_ROUTE + "/" + i.id)}
              >
                {i.name} - {i.count}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>

          <div
            className="text-warning"
            style={{
              position: "absolute",
              fontSize: "16px",
              left: 0,
              bottom: 0,
            }}
          >
            {Object.keys(basket.devices).length}
          </div>
        </>
      )}
    </Dropdown>
  );
};

export default observer(BasketPanel);
