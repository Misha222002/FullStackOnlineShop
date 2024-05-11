import React, { useContext } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = () => {
  const { deviceStore } = useContext(Context);
  return (
    <Row className="d-flex">
      {deviceStore.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  );
};

export default observer(DeviceList);
