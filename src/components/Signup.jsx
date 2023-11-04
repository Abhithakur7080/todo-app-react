import React, { useEffect } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import leftImg from "../images/login-signup.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../todoContext'

const Signup = () => {
    const { loggedIn, getData, handleSignup } = useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(loggedIn){
            navigate('/', { replace: true });
        }
    }, [loggedIn, navigate])
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={6} className='mt-md-5'>
                    <h3 className='text-center'>Sign Up</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control onChange={getData} name="name" type="text" placeholder="Enter Your Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control onChange={getData} name="email" type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Control onChange={getData} name="date" type="date" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control onChange={getData} name="password" type="password" placeholder="Password" />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button onClick={handleSignup} variant="outline-primary" type="submit">
                                Submit
                            </Button>
                        </div>
                        <h6 className='text-center mt-4'>Already Have an account? &nbsp;
                            <Link to={"/login"}>Log In</Link>
                            &nbsp;here.
                        </h6>
                    </Form>
                </Col>
                <Col md={6}>
                    <Image src={leftImg} style={{ width: "100%" }} />
                </Col>
            </Row>
        </Container>
    )
}

export default Signup