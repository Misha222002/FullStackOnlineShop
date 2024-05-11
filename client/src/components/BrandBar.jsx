import React, { useContext } from "react";
import { Context } from "../main";
import ListGroup from "react-bootstrap/ListGroup";
import { observer } from "mobx-react-lite";
import { Card, Row } from "react-bootstrap";

const BrandBar = () => {
  const { deviceStore } = useContext(Context);
  return (
    <Row>
      {deviceStore.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer", width: "auto" }}
          border={brand.id === deviceStore.selectedBrand.id ? "danger" : "lite"}
          onClick={() => deviceStore.setSelectedBrand(brand)}
          className="p-3"
          key={brand.id}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
};

export default observer(BrandBar);
