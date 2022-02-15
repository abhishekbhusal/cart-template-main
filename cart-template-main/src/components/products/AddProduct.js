
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert,Spinner} from "react-bootstrap";
import Base from "../Base";
import { authenticate, saveProduct,getAllCategory } from "../CartService";


function AddProduct() {
  const isAuthenticated= authenticate();
  const [products, setProducts]= useState({
    "prodName": "",
    "unitPrice": "",
    "prodQuantity":"",
    "category":""
  })
  const [loading,setLoading]=useState(false);
  const [cate,setCate]=useState([]);
  const handleProdName = (e) => {
    const prodName = e.target.value;
    setProducts({ ...products, "prodName": prodName })
    
  }
  const handleUnitPrice = (e) => {
  
    const unitPrice = e.target.value;
    setProducts({ ...products, "unitPrice": unitPrice })
    
  }
  const handleProdQuantity = (e) => {
    const prodQuantity = e.target.value;
    setProducts({ ...products, "prodQuantity": prodQuantity })
    
  }
  const handleClick=()=>{
   setLoading(true) 
   saveProduct(products,isAuthenticated.jwt).then(data=>{
    //  if(data.statusCode===200){
       console.log(data)
    //  }
   }).catch(err=>{
     console.log(err)
   })


  }

  useEffect(()=>{
    getAllCategory(isAuthenticated.jwt).then(data=>{
      if(data.statusCode===200){
        setCate(data.data)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])
  return (
      <Base>
      <div>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
           {loading&& <Spinner animation="border" variant="info" />}
            <h4>  <Alert  variant={"primary"}> Add a new product: 
            
            </Alert></h4>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product"
                      onChange={handleProdName}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Unit Price"
                      onChange={handleUnitPrice}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuantity">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Product Quantity"
                      onChange={handleProdQuantity}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  
    <Form.Label>Select Category</Form.Label>
    <Form.Select onChange={(e)=>setProducts({ ...products, "category":e.target.value})} >
    <option>Please Select any Category</option>
      {cate && cate.map((cat,id)=>{
        return  <option key={id}>{cat.catName}</option>}
      )}
     
    </Form.Select>
    </Form.Group>

                <Button
                  variant="primary"
                  type="button"
                    onClick={handleClick}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      </Base>
  );
}

export default AddProduct;
