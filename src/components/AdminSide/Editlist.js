import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import { Axios} from "../../App";


const Editlist = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product,setProduct] = useState({
    title: "",
    description: "",
    oldprice:"",
    price: "",
    image: "",
    category: "",
  })
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/api/admin//products/${id}`);

        const { _id, title, image, oldprice, price, description, category } =
          response.data.data;
        setProduct({
          id: _id,
          title,
          image,
          oldprice,
          price,
          category,
          description,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to fetch products");
      }
    };
    fetchProduct();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put("http://localhost:3000/api/admin/products", product);
      console.log(response,"kkkk");
      if (response.status === 201) {
        toast.success("Product Edited Successfully");
        navigate("/productlist");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChange = (a) => {
    const { name, value } = a.target;
    setProduct((PrevData) => ({
      ...PrevData,
      [name]: value,
    }));
  };

console.log(product,"gffgfgfgf")


  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "block", width: 700 }}>
            <h4>Edit product</h4> <hr />
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Label>Edit Img src:</Form.Label>
                <Form.Control
                  type="file"
                  name="Image"
                  defaultValue={product.image}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit product name:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={product.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Oldprice:</Form.Label>
                <Form.Control
                  type="text"
                  name="OldPrice"
                  id="OldPrice"
                  defaultValue={product.oldprice}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Actual Price:</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  id="price"
                  defaultValue={product.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Category:</Form.Label> <br />
                <select
                  style={{ width: "200px" }}
                  name="category"
                  id="category"
                  defaultValue={product.category}
                  onChange={handleChange}
                >
                  <option value="bedroom">BEDROOM</option>
                  <option value="kitchen">KITCHEN</option>
                  <option value="office">OFFICE</option>
                  <option value="children room">CHILRED ROOM</option>
                  <option value="DINING HALL">DINING HALL</option>
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Discription:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  id="description"
                  defaultValue={product.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="m-3" type="submit" variant="primary">
                Save
              </Button>
              <Button className="m-3" onClick={() => navigate("/productlist")}>
                Cancel
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editlist;
