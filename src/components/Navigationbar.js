import React, { useContext } from 'react'
import {Navbar,NavDropdown,Container,Nav} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {RiLuggageCartFill,RiHeart2Line} from 'react-icons/ri'
import {GrUserAdmin} from 'react-icons/gr'
import { userContext } from '../App'
import { toast } from 'react-toastify'

const Navigationbar = () => {
  const navi=useNavigate()
  const {login,setLogin}=useContext(userContext)
  const logout=()=>{
    setLogin(false)
    toast.success('logout success')
  }

  return (
    <div>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand  onClick={()=>navi("/")} style={{color:"red" ,cursor:'pointer'}}>Wooden House</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            
            <Nav.Link onClick={()=>navi("/all")} >All Items</Nav.Link>
            <NavDropdown title="Department" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>navi("/bedroom")}>Bedroom</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navi("/kitchen")}>
                Kitchen
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navi("/office")}>office</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navi("/childrenroom")}>
                Children room
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navi("/dininghall")}>
                Dining hall
              </NavDropdown.Item> 
            </NavDropdown>
            </Nav>
            <Navbar.Collapse style={{justifyContent:"end"}} >
              <Nav style={{gap:"0.6rem", alignItems:"center"}} >
              <Nav.Link >
              <RiHeart2Line onClick={()=>navi("/wishlist")}/>
                </Nav.Link>
                <Nav.Link >
                  <RiLuggageCartFill onClick={()=>navi("/cart")} />
                </Nav.Link>
                {
                  login?<Nav.Link onClick={logout}>Logout</Nav.Link>:<Nav.Link onClick={()=>navi('/login')}>login</Nav.Link>
                }
                <Nav.Link >
                <GrUserAdmin onClick={()=>navi('/adminlogin')} />
                </Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navigationbar