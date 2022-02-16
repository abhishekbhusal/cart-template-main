import React, { useState,useEffect } from 'react'
import { Col, Container, Row, Table,Button ,Alert} from 'react-bootstrap'
import Base from '../Base'
import { authenticate,deleteCategory, getAllCategory } from '../CartService';

function ShowCategory() {
const isAuthenticated= authenticate();
const [categories,setCategories] = useState([]);
const [numberofCategory,setNumberofCategory]= useState(0);
const [message,setMessage]= useState("");

const handleDelete=(catId)=>{
    deleteCategory(catId,isAuthenticated.jwt).then(data=>{
        console.log(data)
        if(data.statusCode===200){
            setMessage(data.message);
            setNumberofCategory(categories.length-1)

        }
    }).catch(err=>{
        console.log(err)
    })
   
}
useEffect(() => {
    getAllCategory(isAuthenticated.jwt).then(data=>{
        if(data.statusCode===200){
            setCategories(data.data)
            setNumberofCategory(data.data.length)
            
        }
    }).catch(err=>{
        console.log(err)
    })
    
}, [numberofCategory])


    return (
        <Base>
        <Container>
            <Row>
                <Col>
                {message && <Alert variant='success'> {message}</Alert>}
                <h4> List of all Category available: {categories?categories.length +" categories are available":""}</h4>
                    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Number</th>
      <th>Category Id</th>
      <th>Category Name</th>
      <th>Created By</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {categories&&categories.map((category,index)=>{
      return(
    <tr key={category.catId}>
      <td>{index+1}</td>
      <td>{category.catId}</td>
      <td>{category.catName}</td>
      <td>{category.createdBy}</td>
      <td>

           <Button variant="info" href={`/category/all/${category.catId}`}>Update</Button>{' '}<Button variant="danger" onClick={()=>handleDelete(category.catId)}>Delete</Button>
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

export default ShowCategory