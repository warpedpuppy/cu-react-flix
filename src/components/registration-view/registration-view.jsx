import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://cbu-pix-flix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(function () {
        axios.post('https://cbu-pix-flix.herokuapp.com/login', {
          Username: username,
          Password: password
        })
          .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
            window.open('/', '_self');
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (

    <Form className="login-form">

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="joe@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" placeholder="01/01/2000" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant="secondary" onClick={handleRegister}>Register</Button>

    </Form>

  );

}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
