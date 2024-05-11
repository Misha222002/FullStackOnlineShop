import React, { useContext } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "../main";
import addShop from "../assets/addShop.png";
import { observer } from "mobx-react-lite";
import { createGood, fetchGoods, updateOne } from "../http/basketAPI";

const DeviceItem = ({ device }) => {
  const navigate = new useNavigate();
  const { basket } = useContext(Context);
  const addBusket = async (e) => {
    e.stopPropagation();
    await createGood(device);
    await fetchGoods().then((data) => {
      const dict = {};
      for (let i of data.rows) {
        dict[i.deviceId] = i;
      }
      basket.setDevices(dict);
    });
  };
  const descrimentBasket = (e) => {
    e.stopPropagation();
    const buscetDevice = basket.devices[device.id];
    updateOne({
      ...buscetDevice,
      count: buscetDevice.count - 1,
    }).then((data) => {
      if (data.count == 0) {
        delete basket.devices[device.id];
        basket.setDevices(basket.devices);
      } else {
        basket.setDevices({ ...basket.devices, [`${device.id}`]: data });
      }
    });
  };
  const incrementBasket = (e) => {
    e.stopPropagation();
    const buscetDevice = basket.devices[device.id];
    updateOne({
      ...buscetDevice,
      count: buscetDevice.count + 1,
    }).then((data) => {
      basket.setDevices({ ...basket.devices, [`${device.id}`]: data });
    });
  };

  if (basket.isLoading) {
    return <div>Закгрузка</div>;
  }
  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={import.meta.env.VITE_API_URL + device.image}
        />
        <div className="mt-1 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image src={star} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>{device.name}</div>
          {basket.devices[device.id]?.count ? (
            <div>
              {basket.devices[device.id]?.count}
              <button onClick={descrimentBasket}>-</button>
              <button onClick={incrementBasket}>+</button>
            </div>
          ) : (
            <div
              onClick={addBusket}
              className="mx-3"
              style={{
                zIndex: 10,
                cursor: "pointer",
                background: `url(${addShop}) no-repeat center center`,
                width: 30,
                height: 30,
                backgroundSize: "cover",
              }}
            ></div>
          )}
        </div>
      </Card>
    </Col>
  );
};

export default observer(DeviceItem);
