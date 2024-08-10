// import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
// import { CgProfile } from "react-icons/cg";

// import NavDropdown from "react-bootstrap/NavDropdown";
// import "./MainNavbar.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";

// function EcommerceNavbar() {
//   const { register, handleSubmit, watch } = useForm();
//   const query = watch("searchQuery", "");

//   // Filter products whenever the search query changes
//   React.useEffect(() => {
//     const filtered = filterProducts(allProducts, query);
//     setFilteredProducts(filtered);
//   }, [query, allProducts, setFilteredProducts]);

//   const onSubmit = (data) => {
//     // This will be called if you handle form submission, but here we use `watch` for real-time updates
//     console.log("Search query:", data.searchQuery);
//   };

//   const filterProducts = (products, query) => {
//     const lowercasedQuery = query.toLowerCase();
//     return products.filter((product) =>
//       product.productName.toLowerCase().includes(lowercasedQuery)
//     );
//   };

//   return (
//     <Navbar
//       collapseOnSelect
//       expand="md"
//       bg="dark"
//       variant="dark"
//       className="shadow-sm"
//     >
//       <Navbar.Brand
//         as={Link}
//         to="/"
//         style={{
//           color: "white",
//           fontWeight: "bold",
//           fontSize: "1.5rem",
//           marginLeft: "1rem",
//         }}
//       >
//         Tomato
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//       <Navbar.Collapse
//         id="responsive-navbar-nav"
//         style={{ marginRight: "18px", marginLeft: "18px" }}
//       >
//         <Nav className="me-auto">
//           {/* <Nav.Link href="#contact">Contact</Nav.Link> */}
//           <NavDropdown title="Categories" id="collapsible-nav-dropdown">
//             <NavDropdown.Item href="#electronics">Electronics</NavDropdown.Item>
//             <NavDropdown.Item href="#fashion">Fashion</NavDropdown.Item>
//             <NavDropdown.Item href="#home-garden">
//               Home & Garden
//             </NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#sale">Sale</NavDropdown.Item>
//           </NavDropdown>
//         </Nav>
//         <Form
//           className="d-flex flex-grow-1 mx-3"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <FormControl
//             type="search"
//             placeholder="Search product name"
//             className="me-2"
//             aria-label="Search"
//             style={{ flexGrow: 1 }}
//             {...register("searchQuery")}
//           />
//           <Button variant="outline-success">Search</Button>
//         </Form>
//         <Nav style={{ alignItems: "baseline" }}>
//           {localStorage.getItem("token") ? (
//             <NavDropdown
//               title={
//                 <>
//                   <CgProfile
//                     style={{
//                       fontSize: "20px",
//                       color: "white",
//                     }}
//                   />
//                 </>
//               }
//               id="collapsible-nav-dropdown"
//             >
//               <NavDropdown.Item as={Link} to="/profile">
//                 View Profile
//               </NavDropdown.Item>
//               {/* <NavDropdown.Item as={Link} to="/settings">
//                 Settings
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item as={Link} to="/logout">
//                 Logout
//               </NavDropdown.Item> */}
//             </NavDropdown>
//           ) : null}

//           {localStorage.getItem("token") ? (
//             <Nav.Link
//               as={Link}
//               to="/"
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("username");
//                 window.location.replace("/");
//               }}
//             >
//               logout
//             </Nav.Link>
//           ) : (
//             <Nav.Link as={Link} to="/login_comp">
//               Login
//             </Nav.Link>
//           )}

//           <Nav.Link as={Link} to="/cart">
//             <div className="addcss">
//               <i className="bi bi-cart"></i> <span>Cart</span>
//             </div>
//           </Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

// export default EcommerceNavbar;
import React, { useEffect, useContext } from "react";
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
  const { filterProducts } = useContext(ProductContext);
  const { register, handleSubmit, watch } = useForm();
  const query = watch("searchQuery", "");
  const navigate = useNavigate();

  useEffect(() => {
    filterProducts(query);
  }, [query, filterProducts]); // Ensure filterProducts is stable

  const onSubmit = (data) => {
    // console.log("Search query:", data.searchQuery);
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
          <NavDropdown title="Categories" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#electronics">Electronics</NavDropdown.Item>
            <NavDropdown.Item href="#fashion">Fashion</NavDropdown.Item>
            <NavDropdown.Item href="#home-garden">
              Home & Garden
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#sale">Sale</NavDropdown.Item>
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
