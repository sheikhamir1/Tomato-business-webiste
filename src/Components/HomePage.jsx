import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContect";
import { Container, Row, Col } from "react-bootstrap";
import Card_Comp from "./Card_Comp"; // Import the FoodCard component
import "./Home.css"; // Import the CSS file for custom styles

const HomePage = () => {
  const { foodProducts } = useContext(ProductContext);
  return (
    <>
      {/* <Container>
        <Row>
          {foodProducts.map((product, id) => (
            <Col sm={12} md={6} lg={4} xl={3} className="mb-4 mt-5" key={id}>
              <Card_Comp
                image={product.image}
                name={product.name}
                price={product.price}
                id={id}
              />
            </Col>
          ))}
        </Row>
      </Container> */}
    </>
  );
};

export default HomePage;
