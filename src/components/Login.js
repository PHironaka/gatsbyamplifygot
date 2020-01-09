import React from "react"
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { setUser, isLoggedIn } from '../utils/auth'
import Error from './Error'
import { Auth } from 'aws-amplify'

class Login extends React.Component {
  state = {
    email: ``,
    password: ``,
    error: ``
  }

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  login = async() => {
    const { email, password } = this.state
    try {
      await Auth.signIn(email, password)
      const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        email: user.email
      }
      setUser(userInfo)
      navigate("/app/home")
    } catch (err) {
      this.setState({ error: err })
      console.log('error...: ', err)
    }
  }

  render() {
    if (isLoggedIn()) navigate('/app/profile')
    return (
      <div>
        <h1>Sign In</h1>
        {this.state.error && <Error errorMessage={this.state.error}/>}
        <div style={styles.formContainer}>
         <input
            onChange={this.handleUpdate}
            placeholder='email'
            name='email'
            value={this.state.email}
            style={styles.input}
          />
          <input
            onChange={this.handleUpdate}
            placeholder='Password'
            name='password'
            value={this.state.password}
            type='password'
            style={styles.input}
          />
          <div style={styles.button} onClick={this.login}>
            <span style={styles.buttonText}>Sign In</span>
          </div>
        </div>
        <Link to="/app/signup">Sign Up</Link><br />
      </div>
    )
  }
}

const styles = {
  input: {
    height: 40, margin: '10px 0px', padding: 7
  },
  formContainer: {
    display: 'flex', flexDirection: 'column'
  },
  button: {
    backgroundColor: 'rebeccapurple', padding: '15px 7px', cursor: 'pointer', textAlign: 'center', marginBottom: 10
  },
  buttonText: {
    color: 'white'
  }
}

export default Login