import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../todoContext';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { RiTodoFill } from "react-icons/ri";
import { BsPlusCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const Home = () => {
  const { loggedIn, todos, addTodo, toggleTodo, deleteTodo } = useUserContext();
  const [todoText, setTodoText] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login', { replace: true });
    }
  }, [loggedIn, navigate]);
  return (
    <Container className='mt-5 rounded overflow-hidden bg-body-secondary'>
      <Row className='bg-dark py-2'>
        <Col sm={12} className='d-flex justify-content-center align-items-center'>
          <RiTodoFill className='text-light fs-2' />
          <h2 className='d-inline text-center text-light fw-bold ms-2'>Todo</h2>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col sm={11}>
          <Form.Control
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTodo(todoText);
                setTodoText('');
              }
            }
          }
            className='border-3 border-dark'
            placeholder="Add a Todo..."
          />
        </Col>
        <Col sm={1}>
          <BsPlusCircleFill onClick={() => {addTodo(todoText); setTodoText("")}} className="fs-2 mx-auto" />
        </Col>
      </Row>
      <Row className='p-2'>
        {todos.map((todo, id) => (
          <Row key={id}>
          <Col sm={1}>
            <Form.Check
              onChange={() => toggleTodo(id)}
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Col>
          <Col sm={8}>
            <p>{todo.text}</p>
          </Col>
          <Col sm={2}>
            <p className={`${todo.completed?"bg-success": "bg-danger"} p-1 text-center text-light fw-bold rounded-pill`}>{todo.completed? "Completed":"Pending"}</p>
          </Col>
          <Col sm={1} onClick={() => deleteTodo(id)}>
            <TiDelete className="fs-2 text-danger text-center"/>
          </Col>
        </Row>
        ))}
      </Row>
    </Container>
  )
}

export default Home