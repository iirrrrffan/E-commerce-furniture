import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { Axios } from '../../App';
import { toast } from 'react-toastify';


const Productlist = () => {
  

    const navi=useNavigate()
    const [product,setProduct] = useState([])



    async function allProducts (){
      try{
        const response = await Axios.get("http://localhost:3000/api/admin/products");
      
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to fetch products");
      }
    }
    useEffect(() => {
      allProducts();
    }, []);
console.log(product,"irfaanm");

    const Remove = async  (id) => {
      try{
          const productId = id;
          console.log(productId);
          const response = await Axios.delete("http://localhost:3000/api/admin/products", {
            data: { id: productId },
          });
          allProducts();
          console.log(response);
        } catch (error) {
          console.log(error);
          toast.error(error.message || "Failed to fetch products");
        
      }
     
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

            <th>Old Price</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          
          </tr>
          {product.map((item) => (
            <tr>
              <td>{item._id}</td>
              <td style={{ textAlign: "center" }}>
                <img
                  style={{ height: "2rem" }}
                  src={item.image}
                  alt={item.title}
                />
              </td>
              <td>{item.title}</td>
              <td>{item.oldprice}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
       
              <td style={{ textAlign: "center" }}>
                <Button
                  style={{ marginRight: "30px" }}
                  onClick={() => navi(`/editlist/${item._id}`)}
                >
                  Edit
                </Button>
                <Button className="bg-danger" onClick={() => Remove(item._id)}>
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