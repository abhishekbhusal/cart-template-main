import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { authenticate } from "./CartService";
import PeopleIcon from '@mui/icons-material/People';
import { useHistory } from "react-router";


function Header() {
  const history= useHistory();
  const isAuthenticated= authenticate();
  


  const handleLogOut=()=>{
    if(typeof window !=="undefined"){
      localStorage.removeItem('userInfo')
      history.push("/");
    }

  }
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Navbar.Brand href="/" className="navbar__brand">
          Tech Nova
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            

            <Nav.Link href="/about">About Us</Nav.Link>
            {isAuthenticated&&<Nav.Link href="/admin">Admin</Nav.Link>}
            {!isAuthenticated &&
             <>
                <Nav.Link href="/signup">Sign Up</Nav.Link>

                <Nav.Link href="/login">Login</Nav.Link>
              </>}
            
         
             
         {isAuthenticated&&
         <>
         
            <NavDropdown title="Product" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/product/all">Show All Product</NavDropdown.Item>
              <NavDropdown.Item href="/product/create">Create Product</NavDropdown.Item>
             
              
            </NavDropdown>

            <NavDropdown title="Category" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/category/all">Show All Category</NavDropdown.Item>
              <NavDropdown.Item href="/category/create">Create Category</NavDropdown.Item>
             
              
            </NavDropdown>

            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/cart">Go To Cart</NavDropdown.Item>
              <NavDropdown.Item href="/orders">Order History</NavDropdown.Item>
              
              <NavDropdown.Item  onClick={()=>handleLogOut()}>
              Logout</NavDropdown.Item>
              
            </NavDropdown>
            
            </>}
          </Nav>
          {/* <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
      </Nav.Link>
                        </Nav> */}
        </Navbar.Collapse>
        {isAuthenticated&&
        <div className='nav-custom-icon' style={{color:'#fff',display:"flex", justifyContent:"center",marginTop:'10px'}}>
        <PeopleIcon/>
        <p style={{marginLeft:"4px",marginRight:"10px"}}>
        {isAuthenticated.user}
        </p>
        </div> 
        }
      </Navbar>

    </div>
  );
}

export default Header;