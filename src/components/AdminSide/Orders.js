import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Axios } from '../../App';
import { toast } from 'react-toastify';
import { Container, Table } from "react-bootstrap";

const Orders = () => {
const [order,setOrder] = useState([])

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/api/admin/order");
   
      if (response.status === 201) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.log("error fetching the product", error);
      toast.error("error");
    }
  };
  fetchOrders();
}, []);
console.log(order,'dsff')
  return (
    <div className="d-flex">
      <SideBar />
      <Container
        fluid
        className="mt-3"
        style={{ overflow: "scroll", height: "90vh" }}
      >
        <div style={{ flex: "1", textAlign: "center" }}>
          <h1>Order List</h1>
          <br />
          <hr />
          <Table striped hover style={{ background: "rgb(243, 243, 245" }}>
            <thead>
              <tr>
                <th>date</th>
                <th>time</th>
                <th>payment_id</th>
                <th>total</th>
              </tr>
            </thead>
            {order.map((item) => (
              <tbody>
                <tr>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.payment_id}</td>
                  <td>💲{item.total_amount}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </Container>
    
    </div>
  )
}

export default Orders