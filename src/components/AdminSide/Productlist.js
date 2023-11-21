import React, { useContext } from 'react'
import SideBar from './SideBar'
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../App';

const Productlist = () => {
    const {product,setProduct}=useContext(userContext)

    const navi=useNavigate()
    const Remove = (id) => {
        const newUpdate = product.filter((item) => item.Id !== id);
        setProduct(newUpdate);
      };
   return (
    <div style={{ display: "flex" }}>
    <SideBar />

    <Container
      fluid
      className="mt-3"
      style={{ overflow: "scroll", height: "90vh" }}
    >
      <h1 className="mb-4" style={{ textAlign: "center" }}>
        All products
      </h1>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>

            <th>Price</th>
            <th>Actual Price</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
          {product.map((item) => (
            <tr>
              <td>{item.Id}</td>
              <td style={{ textAlign: "center" }}>
                <img
                  style={{ height: "2rem" }}
                  src={item.Image}
                  alt={item.ProductName}
                />
              </td>
              <td>{item.ProductName}</td>
              <td>{item.OldPrice}</td>
              <td>{item.Price}</td>
              <td>{item.type}</td>
              <td>{item.Stock}</td>
              <td style={{ textAlign: "center" }}>
                <Button
                  style={{ marginRight: "30px" }}
                  onClick={() => navi(`/editlist/${item.Id}`)}
                >
                  Edit
                </Button>
                <Button className="bg-danger" onClick={() => Remove(item.Id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </thead>
      </Table>
    </Container>
  </div>
      


  )
}

export default Productlist