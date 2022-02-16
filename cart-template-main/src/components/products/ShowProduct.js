import React, { useState,useEffect } from 'react'
import { Col, Container, Row, Table,Button ,Alert,Image} from 'react-bootstrap'
import Base from '../Base'
import { authenticate, deleteProduct, getAllProduct } from '../CartService';

function ShowProduct() {
const isAuthenticated= authenticate();
const [products,setProducts] = useState([]);
const [numberofProduct,setNumberofProduct]= useState(0);
const [message,setMessage]= useState("");

const handleDelete=(id)=>{
    deleteProduct(isAuthenticated.jwt,id).then(data=>{
        if(data.statusCode===200){
            setMessage(data.message);
            setNumberofProduct(products.length-1)

        }
    }).catch(err=>{
        console.log(err)
    })
   
}
useEffect(() => {
    getAllProduct(isAuthenticated.jwt).then(data=>{
        if(data.statusCode===200){
            setProducts(data.data)
            setNumberofProduct(data.data.length)
            
        }
    }).catch(err=>{
        console.log(err)
    })
    
}, [numberofProduct])


    return (
        <Base>
        <Container>
            <Row>
                <Col>
                {message && <Alert variant='success'> {message}</Alert>}
                <h4> List of all Product available: {products?products.length +" products are available":""}</h4>
                    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Number</th>
      <th>Product Id</th>
      <th>Product Name</th>
      <th>Unit Price</th>
      <th>Product Quantity</th>
      <th>Category</th>
      <th>Product Image</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {products&&products.map((product,index)=>{
      return(
    <tr key={product.id}>
      <td>{index+1}</td>
      <td>{product.id}</td>
      <td>{product.prodName}</td>
      <td>{product.unitPrice}</td>
      <td>{product.prodQuantity}</td>
      <td>{product.category}</td>
      <td><Image src={product.productImage} fluid/></td>
      <td>

           <Button variant="info" href={`/product/all/${product.id}`}>Update</Button>{' '}<Button variant="danger" onClick={()=>handleDelete(product.id)}>Delete</Button>
      </td>
    </tr>
      )

  })

  }
    
   
  </tbody>
</Table>
                </Col>
            </Row>
        </Container>
        </Base>
        
    )
}

export default ShowProduct