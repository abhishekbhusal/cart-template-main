
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert,Spinner} from "react-bootstrap";
import Base from "../Base";
import { authenticate, saveCategory,getAllCategory } from "../CartService";


function AddCategory() {
  const isAuthenticated= authenticate();
  const [categories, setCategories]= useState({
    "catName": "",
    "createdBy":""
  })
 // const [loading,setLoading]=useState(true);
  const [message, setMessage] = useState('');
  const [cate,setCate]=useState([]);
  const handleCatName = (e) => {
    const catName = e.target.value;
    setCategories({ ...categories, "catName": catName })
    
  }
  const handleCreatedBy = (e) => {
  
    const createdBy = e.target.value;
    setCategories({ ...categories, "createdBy": createdBy })
    
  }
  
  const handleClick=()=>{
    setMessage("")
   //setLoading(true) 
   saveCategory(categories,isAuthenticated.jwt).then(data=>{
    if(data.statusCode===200){
       setMessage(data.message)
      }
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
     // {loading&& <Spinner animation="border" variant="info" />}
    })
  },[])
  return (
      <Base>
      <div>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
          
           {message &&   <Alert  variant={"success"}> {message}</Alert>}
            <h4>  <Alert  variant={"primary"}> Add a new Category: 
            
            </Alert></h4>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Category"
                      onChange={handleCatName}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label>Created By</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="createdBy"
                      onChange={handleCreatedBy}
                  />
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

export default AddCategory;
