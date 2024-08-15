import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./MainNavbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ProductContext } from "./ProductContect";

function EcommerceNavbar() {
  const { filterProducts } = useContext(ProductContext); // Context for filtering
  const { register, handleSubmit, watch } = useForm();
  const query = watch("searchQuery", "");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch product categories
  useEffect(() => {
    fetch("http://localhost:8080/api/productCategory/getAllProductCategory")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data); // Set fetched categories in state
        }
        // console.log("categories", categories);
      })

      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`); // Navigate to a products page with the category as a query param
  };

  useEffect(() => {
    filterProducts(query);
  }, [query, filterProducts]);

  const onSubmit = (data) => {
    navigate("/productlist");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      className="shadow-sm"
    >
      <Navbar.Brand
        as={Link}
        to="/"
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginLeft: "1rem",
        }}
      >
        Tomato
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        style={{ marginRight: "18px", marginLeft: "18px" }}
      >
        <Nav className="me-auto">
          {/* Dropdown for categories */}
          <NavDropdown title="Categories" id="collapsible-nav-dropdown">
            {categories.length > 0 ? (
              categories.map((category) => (
                <NavDropdown.Item
                  key={category.id}
                  onClick={() => handleCategoryClick(category.productCategory)}
                >
                  {category.productCategory}
                </NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item>No Categories Found</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
        <Form
          className="d-flex flex-grow-1 mx-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            type="search"
            placeholder="Search product name"
            className="me-2"
            aria-label="Search"
            style={{ flexGrow: 1 }}
            {...register("searchQuery")}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
        <Nav style={{ alignItems: "baseline" }}>
          {localStorage.getItem("token") ? (
            <NavDropdown
              title={<CgProfile style={{ fontSize: "20px", color: "white" }} />}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/myorder">
                My Orders
              </NavDropdown.Item>
            </NavDropdown>
          ) : null}
          {localStorage.getItem("token") ? (
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                window.location.replace("/");
              }}
            >
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login_comp">
              Login
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/cart">
            <div className="addcss">
              <i className="bi bi-cart"></i> <span>Cart</span>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default EcommerceNavbar;
