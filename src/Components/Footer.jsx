import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>About Us</h5>
            <p>
              We provide the best food products directly from the farm to your
              table. Fresh, healthy, and delicious food for everyone.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-envelope mr-2"></i>Email:
                info@foodstore.com
              </li>
              <li>
                <i className="fas fa-phone mr-2"></i>Phone: +123 456 7890
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i>Address: 123 Food
                St, Food City, FC 12345
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled justify-content-center">
              <li className="mr-3">
                <a href="https://www.facebook.com" className="text-white">
                  <i className="fab fa-facebook-f">Facebook</i>
                </a>
              </li>
              <li className="mr-3">
                <a href="https://www.twitter.com" className="text-white">
                  <i className="fab fa-twitter">Twitter</i>
                </a>
              </li>
              <li className="mr-3">
                <a href="https://www.instagram.com" className="text-white">
                  <i className="fab fa-instagram">Instagram</i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="">
          <Col md={12} className="text-center">
            <p>&copy; 2024 Food Store. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
