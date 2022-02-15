import React,{useEffect, useState} from 'react'
import { Col, Container, Form, Row,Button } from 'react-bootstrap'
import Base from '../Base'
import { getUser, updateUser } from '../CartService'
import { useHistory } from "react-router";

function EditUser(props) {
  const history=useHistory(); 
    const [user,setUser]= useState({
      firstName:"",
      lastName:"",
      email:""
    });
// console.log(
  const handleClick=()=>{
    updateUser(user,props.match.params.id).then(data=>{
      if(data.statusCode===200){
        history.push("/admin");
        
      }
    }).catch(err=>{
      console.log(err)
    })


  }
  //destructuring 
  const {firstName,lastName,email}= user;
    useEffect(() => {
        getUser(props.match.params.id).then(data=>{
            if(data.statusCode===200){
                setUser({...user,
                  firstName:data.data.firstName,
                  lastName:data.data.lastName,
                  email:data.data.email

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
            {user&&
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={user.firstName}

                  onChange={(e)=>setUser({...user,firstName:e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lastname"
                  value={user.lastName}
                  onChange={(e)=>setUser({...user,lastName:e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                  onChange={(e)=>setUser({...user,email:e.target.value})}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                //   onChange={handlePassword}
                />
              </Form.Group> */}

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

export default EditUser