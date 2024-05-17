import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { Axios } from "../../App";
import axios from "axios";


const Addproduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oldprice,setOldprice] = useState("")
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");


  const handleImageChange = (img) => {
    const selectedImage = img.target.files[0];
    setImage(selectedImage);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handileAdd = async (e) => {
    e.preventDefault();

    if (!title || !description || !oldprice || !price || !image || !category) {
      toast.error("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
  
    try {
      const response = await axios.post("http://localhost:3000/api/admin/products", formData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Product added successfully!");
        navigate("/productlist");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error.message);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Add products</h1>
          <br />
          <Form style={{ width: "500px" }}>
            <Form.Group>
              <Form.Label>Add Img src:</Form.Label>
              <Form.Control
                type="file"
                name="Image"
                placeholder="eg:https://a45fd48de1256.jpg"

                onChange={handleImageChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add product name:</Form.Label>
              <Form.Control
                type="text"
                name="ProductName"
                placeholder="ProductName"

                onChange={(e)=>setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add price:</Form.Label>
              <Form.Control
                type="text"
                name="OldPrice"
                placeholder="Price"
    
                onChange={(e)=>setOldprice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add Actual price:</Form.Label>
              <Form.Control
                type="text"
                name="Price"
                placeholder="Actual Price"
           
                onChange={(e)=>setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add Discription</Form.Label>
              <Form.Control
                type="text"
                name="Stock"
                placeholder="Discrption"
            
                onChange={(e)=>setDescription(e.target.value)}
                required
              />
            </Form.Group>{" "}
            <br />
            <Form.Group>
              <Form.Label>Select type:</Form.Label> <br />
              <select
                style={{ width: "200px" }}
              
                name="type"
      
                onChange={(e)=>setCategory(e.target.value)}
                required
              >
            <option value="bedroom">BEDROOM</option>
                  <option value="kitchen">KITCHEN</option>
                  <option value="office">OFFICE</option>
                  <option value="children room">CHILDER ROOM</option>
                  <option value="DINING HALL">DINING HALL</option>
              </select>
            </Form.Group>
            <Button
              className="mt-3"
              type="submit"
              variant="primary"
              onClick={handileAdd}
            >
              Save
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;