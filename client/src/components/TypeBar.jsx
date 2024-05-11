import React, { useContext } from "react";
import { Context } from "../main";
import ListGroup from "react-bootstrap/ListGroup";
import { observer } from "mobx-react-lite";

const TypeBar = () => {
  const { deviceStore } = useContext(Context);
  return (
    <ListGroup>
      {deviceStore.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === deviceStore.selectedType.id}
          onClick={() => deviceStore.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default observer(TypeBar);
