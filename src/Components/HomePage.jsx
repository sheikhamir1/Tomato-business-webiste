import React, { useContext } from "react";
import { ProductContext } from "./ProductContect";
import { Container, Row, Col } from "react-bootstrap";
import Card_Comp from "./Card_Comp"; // Import the FoodCard component
import "./Home.css"; // Import the CSS file for custom styles

const HomePage = () => {
  const { getAllProducts } = useContext(ProductContext);

  return (
    <Container>
      <Row>
        {getAllProducts.map((product) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="mb-4 mt-5"
            key={product.id}
          >
            <Card_Comp
              image={product.imageUrl}
              name={product.productName}
              price={product.productPrice}
              stock={product.productStock}
              id={product.id} // Use product.id here
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
