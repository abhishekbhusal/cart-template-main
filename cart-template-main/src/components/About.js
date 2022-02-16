import React, { useEffect, useState } from "react"
import { Row,Col,Card,Container,Button } from "react-bootstrap";
import Base from "./Base"
import { authenticate, getAllProduct } from "./CartService";


function About()  {
	const isAuthenticated= authenticate();
const [products,setProducts] = useState([]);

const [numberofProduct,setNumberofProduct]= useState(0);

const defaultURL='http://www.freeimageslive.com/galleries/home/bathroom/preview/cleaning.jpg';
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
			<div> 
				<Container>
			<Row xs={1} md={2} className="g-4">
  {products.map((product, idx) => (
    <Col>
      <Card>
        <Card.Img variant="top" src={product.productImage?product.productImage:defaultURL} />
        <Card.Body>
          <Card.Title>{product.prodName}</Card.Title>
          <Card.Text>
          Unit Price: ${product.unitPrice}
		  <Button variant="info">Add to Cart</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</Container>
				

			</div></Base>
			
		)
	
}
export default About