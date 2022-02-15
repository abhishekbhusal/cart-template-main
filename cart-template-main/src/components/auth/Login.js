import React,{useState} from 'react'
import { Button, Col, Container, Form, Row,Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import Base from '../Base'
import { loginUser } from '../CartService';

function Login() {
  const [users, setUsers] = useState({
    "email":"",
    'password':""

  })
  const [email,setEmail]=useState("");
  const [doRidirect,setDoRedirect]=useState(false);
  const [error,setError]=useState("");
  const handlePassword=(e)=>{
    const password= e.target.value;
    setUsers({...users,'password':password})

  }
  
  const handleEmail=(e)=>{
    const email=e.target.value;
    setEmail(e.target.value);
    setUsers({...users,'email':email})

  }
  const handleClick=()=>{
    loginUser(users).then(data=>{
      if(data.statusCode === 200){
        console.log(data)
        if(typeof window != "undefined"){
          localStorage.setItem("userInfo",JSON.stringify(data.data))
          setDoRedirect(true)
        }
      
      }
      else{
setError(data.errors)
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  const performRedirect=()=>{
    return <Redirect to='/'></Redirect>
  }
  return (
    <Base>
      <div className='app-login'>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
{doRidirect&&performRedirect()}
{error && <Alert variant="danger"> {error}</Alert>}
              <Form>
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

                <Button variant="secondary" type="button"
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

  )
}

export default Login