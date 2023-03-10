import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setNotification } from '../reducers/notificationReducer';
import { registerUser } from '../reducers/usersReducer';

const Register = ({ setOperation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = (event) => {
        event.preventDefault()
        const user = {
            username: username,
            password: password,
            name: name
        }
        try {
            dispatch(registerUser(user))
            setUsername('')
            setPassword('')
            setName('')
            navigate('/login')
            setOperation(true)
            dispatch(setNotification(`User ${user.name} created successfully!`))
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 5000);
        } catch (exception) {
            setOperation(false)
            dispatch(setNotification(exception.response.data.error))
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 5000);
        }
    }

  return (
    <div>
        <h4 style={{marginTop: 30, marginBottom: 20}}>Register a new user with the form below: </h4>
        <Form onSubmit={handleRegister}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
    </div>
  )
}

export default Register