import React, { useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchDevice, fetchOneDevice } from "../http/deviceAPI";
import { createRating } from "../http/ratingAPI";

export default function DevicePage() {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      setDevice(data);
    });
  }, []);
  const addRating = () => {
    const rating = prompt();
    createRating(id, rating);
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <Image
            width={300}
            height={400}
            src={import.meta.env.VITE_API_URL + device.image}
          />
        </Col>
        <Col md={4} className="d-flex flex-column">
          <Row className="d-flex flex-column align-items-center ">
            <h2 className="text-center">{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
          <Button
            className="mt-4  flex-grow-0"
            variant="outline-warning"
            onClick={() => addRating()}
          >
            Оставить отзыв:
          </Button>
        </Col>
        <Col md={4}>
          <Card
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
            className="d-flex flex-column align-items-center justify-content-around"
          >
            <h3>От: {device.price} руб.</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex f-column m-2">
        {device.info.map((info, index) => {
          <Row
            key={info.id}
            style={{ background: index % 2 == 0 && "lightgrey", padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>;
        })}
      </Row>
      <Row></Row>
    </Container>
  );
}
