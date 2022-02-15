import React, { useState,useEffect } from 'react'
import { Col, Container, Row, Table,Button ,Alert} from 'react-bootstrap'
import Base from '../Base'
import { deleteUser, getAllUser } from '../CartService';

function Admin() {
const [users,setUsers] = useState([]);
const [numberofUser,setNumberofUser]= useState(0);
const [message,setMessage]= useState("");

const handleDelete=(id)=>{
    deleteUser(id).then(data=>{
        if(data.statusCode===200){
            setMessage(data.message);
            setNumberofUser(users.length-1)

        }
    }).catch(err=>{
        console.log(err)
    })
   
}
useEffect(() => {
    getAllUser().then(data=>{
        if(data.statusCode===200){
            setUsers(data.data)
            setNumberofUser(data.data.length)
            
        }
    }).catch(err=>{
        console.log(err)
    })
    
}, [numberofUser])


    return (
        <Base>
        <Container>
            <Row>
                <Col>
                {message && <Alert variant='success'> {message}</Alert>}
                <h4> List of all User available: {users?users.length +" users are available":""}</h4>
                    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Number</th>
      <th>User Id</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {users&&users.map((user,index)=>{
      return(
    <tr key={user.id}>
      <td>{index+1}</td>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>

           <Button variant="info" href={`/admin/${user.id}`}>Update</Button>{' '}<Button variant="danger" onClick={()=>handleDelete(user.id)}>Delete</Button>
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

export default Admin