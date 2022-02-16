import React,{useEffect, useState} from 'react'
import { Col, Container, Form, Row,Button } from 'react-bootstrap'
import Base from '../Base'
import {authenticate, getAllProduct, updateProduct } from '../CartService'
import { useHistory } from "react-router";

function UpdateProduct(props) {
  const isAuthenticated= authenticate();
  const history=useHistory(); 
    const [product,setProduct]= useState({
    prodName: "",
    unitPrice: "",
    prodQuantity:"",
    category:"",
    productImage:""
    });
// console.log(
  const handleClick=()=>{
    updateProduct(product,props.match.params.id,isAuthenticated.jwt).then(data=>{
      if(data.statusCode===200){
        history.push("/product/all");
        
      }
    }).catch(err=>{
      console.log(err)
    })


  }
  //destructuring 
  const {prodName,unitPrice,prodQuantity,category,productImage}= product;
    useEffect(() => {
        getAllProduct(props.match.params.id).then(data=>{
            if(data.statusCode===200){
                setProduct({...product,
                  prodName:data.data.prodName,
                  unitPrice:data.data.unitPrice,
                  prodQuantity:data.data.prodQuantity,
                  category:data.data.category,
                  productImage:data.data.productImage

                })
            }
        }).catch(err=>{
            console.log(err)
        }
            )
      
    }, [])
    return (
       <Base>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {/* {loading} */}
            {/* {message && <Alert variant='success'> {message}</Alert>}
            {error && <Alert variant="danger"> {error}</Alert>} */}
            {product&&
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  value={product.prodName}

                  onChange={(e)=>setProduct({...product,prodName:e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter unit price"
                  value={product.unitPrice}
                  onChange={(e)=>setProduct({...product,unitPrice:e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product quantity"
                  value={product.prodQuantity}
                  onChange={(e)=>setProduct({...product,prodQuantity:e.target.value})}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category Name"
                  value={product.category}

                  onChange={(e)=>setProduct({...product,category:e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert Product Image"
                  value={product.productImage}

                  onChange={(e)=>setProduct({...product,productImage:e.target.value})}
                />
              </Form.Group>

              <Button variant="primary" type="button"
                onClick={handleClick}
              >
                Submit
            </Button>
            </Form>
            }
          </Col>
        </Row>
      </Container>
    </Base >
    )
}

export default UpdateProduct