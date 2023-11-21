import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import { userContext } from "../../App";

const Editlist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, setProduct } = useContext(userContext);

  const editProduct = product.find((item) => item.Id === parseInt(id));

  const [productName, setProductName] = useState(editProduct.ProductName);
  const [price, setPrice] = useState(editProduct.Price);
  const [oldPrice, setOldPrice] = useState(editProduct.OldPrice);
  const [Type, setType] = useState(editProduct.type);
  const [image, setImage] = useState(editProduct.Image);
  const [stock, setStock] = useState(editProduct.Stock);

  const submit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...editProduct,
      Image: image,
      ProductName: productName,
      OldPrice: oldPrice,
      Price: price,
      type: Type,
      Stock: stock,
    };

    const updatedProducts = product.map((item) =>
      item.Id === parseInt(id) ? updatedProduct : item
    );
    
    setProduct(updatedProducts);
    toast.success("successfully edited");
    navigate("/productlist");
  };

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
                  type="text"
                  name="Image"
                  defaultValue={editProduct.Image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit product name:</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  defaultValue={editProduct.ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit price:</Form.Label>
                <Form.Control
                  type="text"
                  name="OldPrice"
                  defaultValue={editProduct.OldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Actual price:</Form.Label>
                <Form.Control
                  type="text"
                  name="Price"
                  defaultValue={editProduct.Price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit type:</Form.Label> <br />
                <select
                  style={{ width: "200px" }}
                  name="type"
                  defaultValue={editProduct.type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="bedroom">bedroom</option>
                  <option value="kitchen">kitchen</option>
                  <option value="office">office</option>
                  <option value="children room">children room</option>
                  <option value="DINING HALL">DINING HALL</option>
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Stock:</Form.Label>
                <Form.Control
                  type="text"
                  name="Stock"
                  defaultValue={editProduct.Stock}
                  onChange={(e) => setStock(e.target.value)}
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
