import React, { useState } from 'react'
import { Button, Col, Container, Form, Row,Alert } from 'react-bootstrap'
import Base from '../Base'
import { saveUsers } from '../CartService'


function SignUp() {
 // const [firstName, setFirstName] = useState('')
  const [users, setUsers]= useState({
    "firstName": "",
    "lastName":"",
    "email": "",
    "password": ""
  
  })
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleFirstName = (e) => {
    const firstName = e.target.value;
    setUsers({ ...users, "firstName": firstName })
    
  }
  const handleLastName = (e) => {
    const lastName = e.target.value;
    setUsers({ ...users, "lastName": lastName })
    
  }
  const handleEmail = (e) => {
    const email = e.target.value;
    setUsers({ ...users, "email": email })
    
  }
  const handlePassword = (e) => {
    const password = e.target.value;
    setUsers({ ...users, "password": password })
    
  }
  const handleClick = () => {
    setMessage("")
    setError("")
    saveUsers(users).then(data => {
      if (data.statusCode === 200) {
        setMessage(data.message)
        
      } else {
        setError(data.errors)
      }
    }).catch(err => {
      console.log(err)
    })

  }
    return (
        <Base>
         <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
      
          {/* {loading} */}
          {message &&   <Alert  variant={"success"}> {message}</Alert>}
          {error &&  <Alert  variant={"danger"}> {error}
   
   </Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"

                onChange={handleFirstName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lastname"
                 onChange={handleLastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                 onChange={handlePassword}
              />
            </Form.Group>

            <Button variant="primary" type="button"
            onClick={handleClick}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
        </Base>
    )
}

export default SignUp
