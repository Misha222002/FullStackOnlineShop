import React, { useContext, useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../main";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
const CreateDevice = ({ show, onHide }) => {
  const { deviceStore } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => deviceStore.setTypes(data));
    fetchBrands().then((data) => deviceStore.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number != number));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("image", file);
    formData.append("brandId", deviceStore.selectedBrand.id);
    formData.append("typeId", deviceStore.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить устройство
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Dropdown className="my-2">
              <Dropdown.Toggle>
                {deviceStore.selectedType.name || "Выберите тип"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {deviceStore.types.map((type) => (
                  <Dropdown.Item
                    onClick={() => deviceStore.setSelectedType(type)}
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="my-2">
              <Dropdown.Toggle>
                {deviceStore.selectedBrand.name || "Выберите бранд"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {deviceStore.brands.map((brand) => (
                  <Dropdown.Item
                    onClick={() => deviceStore.setSelectedBrand(brand)}
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-3"
              placeholder="Введите название устройста"
            />
            <Form.Control
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-3"
              placeholder="Введите стоимость устройста"
              type="number"
            />
            <Form.Control className="mt-3" type="file" onChange={selectFile} />
            <hr />
            <Button onClick={addInfo} variant="outline-dark">
              Добавить новой свойство
            </Button>
            {info.map((i) => (
              <Row className="my-2" key={i.number}>
                <Col md={4}>
                  <Form.Control
                    value={i.title}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, i.number)
                    }
                    placeholder="Введите название свойства"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    onChange={(e) =>
                      changeInfo("description", e.target.value, i.number)
                    }
                    placeholder="Введите описание свойства"
                  />
                </Col>
                <Col md={4}>
                  <Button
                    value={i.description}
                    onClick={() => removeInfo(i.number)}
                    variant="outline-danger"
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button onClick={addDevice} variant="outline-success">
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default observer(CreateDevice);
