import { useState } from 'react'
import HeadEl from '../components/HeadEl'
import styles from '../styles/login.module.scss'

import { auth } from '../client-utils/auth'

const { setAuthToken } = auth

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
  })

  const { email, password, error } = values

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '' })
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        {
          if (data.error) {
            console.log(data)
            setValues({ ...values, error: data.message })
          } else {
            setAuthToken(data, () => {
              setValues({
                ...values,
                error: '',
              })
            })
          }
        }
      })
  }

  const LoginForm = () => (
    <form className={styles.form}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={handleChange('email')} />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange('password')}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )

  return (
    <>
      <HeadEl
        title="Login Page"
        meta={{ description: 'Login page', content: 'Login page content' }}
      />
      <h1 className={styles.heading}>Login Page</h1>
      {LoginForm()}
    </>
  )
}
