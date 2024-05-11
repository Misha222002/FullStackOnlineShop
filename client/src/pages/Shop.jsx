import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { fetchBrands, fetchDevice, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = () => {
  const { deviceStore } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => deviceStore.setTypes(data));
    fetchBrands().then((data) => deviceStore.setBrands(data));
    fetchDevice(null, null, deviceStore.page, deviceStore.limit).then(
      (data) => {
        deviceStore.setDevices(data.rows);
        deviceStore.setTotalCount(data.count);
      }
    );
  }, []);

  useEffect(() => {
    fetchDevice(
      deviceStore.selectedType.id,
      deviceStore.selectedBrand.id,
      deviceStore.page,
      deviceStore.limit
    ).then((data) => {
      deviceStore.setDevices(data.rows);
      deviceStore.setTotalCount(data.count);
    });
  }, [
    deviceStore.page,
    deviceStore.selectedType.id,
    deviceStore.selectedBrand.id,
  ]);
  return (
    <Container className="mt-3">
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};

export default observer(Shop);
