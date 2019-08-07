import React from "react"
import { Form, FormInput, FormGroup, FormSelect } from "shards-react"
import { connect } from "react-redux"
import { Fade, Button, ButtonGroup } from "shards-react"
import { Row, Col, Container } from "react-bootstrap"

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      visible: false
    }
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleSignIn = e => {
    e.preventDefault()
    console.log(e.target.email.value)

    if (e.target.email.value && e.target.password.value) {
      fetch("https://sleepy-beach-71455.herokuapp.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            email: e.target.email.value.toLowerCase(),
            password: e.target.password.value
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.jwt) {
            localStorage.setItem("jwt_token", res.jwt)
            this.props.dispatch({ type: "UPDATE_USER", user: res.user })
            // localStorage.setItem('healthTracker_Id', res.user.id)
            // this.setState({ redirect: <Redirect to='/' /> })
            //   this.props.logUser(true)
            //   console.log(localStorage)
          }
          //   	else if(res.errors)
          //   		this.setState({ errors: res.errors })
        })
      // 	e.target.reset
    }
  }

  handleSignUp = e => {
    e.preventDefault()
    if (e.target.email.value && e.target.password.value) {
      let height = e.target.heightfeet.value + "'" + e.target.heightinches.value
      fetch("https://sleepy-beach-71455.herokuapp.com/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            email: e.target.email.value.toLowerCase(),
            password: e.target.password.value,
            username: e.target.username.value,
            name: e.target.name.value,
            age: e.target.age.value,
            weight: e.target.weight.value,
            gender: e.target.gender.value,
            height: height.toString()
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.jwt) {
            localStorage.setItem("jwt_token", res.jwt)
            this.props.dispatch({ type: "UPDATE_USER", user: res.user })
          }
        })
      // e.target.reset
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="d-flex justify-content-left m-1">
            <Col md={3}>
              <Form
                className="m-3"
                onSubmit={e => this.handleSignIn(e)}
                style={{
                  opacity: "0.9",
                  position: "relative",
                  width: 250,
                  height: 450
                }}
              >
                <FormGroup>
                  <FormInput
                    required={true}
                    type="email"
                    name="email"
                    id="#email"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <FormInput
                    required={true}
                    name="password"
                    type="password"
                    id="#password"
                    placeholder="Password"
                  />
                </FormGroup>
                <ButtonGroup horizontal="true" className="loginButtonGroup">
                  <Button id="myButton" className="mb-2" type="submit">
                    Login
                  </Button>
                  <Button id="myButton" onClick={this.toggle} className="mb-2">
                    Sign up!
                  </Button>
                </ButtonGroup>
              </Form>
            </Col>
            <Col md={2} className="m-1" />
            <Col md={4}>
              <Fade in={this.state.visible}>
                <Form
                  onSubmit={e => this.handleSignUp(e)}
                  style={{
                    position: "relative",
                    width: 300,
                    opacity: "0.9",
                    height: 550,
                    margin: "20px"
                  }}
                >
                  <FormGroup>
                    <FormInput
                      required={true}
                      maxLength="16"
                      type="text"
                      name="username"
                      id="#signupusername"
                      placeholder="Username"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      required={true}
                      name="password"
                      id="#signuppassword"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      required={true}
                      type="text"
                      name="name"
                      maxLength="20"
                      id="#signupname"
                      placeholder="Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      required={true}
                      type="email"
                      name="email"
                      maxLength="25"
                      id="#signupemail"
                      placeholder="Email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      type="number"
                      min="1"
                      max="110"
                      name="age"
                      id="#signupage"
                      placeholder="Age"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormSelect name="gender" id="#gender" placeholder="Gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </FormSelect>
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      type="number"
                      min="0"
                      max="8"
                      name="heightfeet"
                      id="#signupheightfeet"
                      placeholder="Height in Feet"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      type="number"
                      min="0"
                      max="11"
                      name="heightinches"
                      id="#signupheightinches"
                      placeholder="Height in Inches"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      type="number"
                      min="1"
                      max="800"
                      name="weight"
                      id="#weight"
                      placeholder="Weight"
                    />
                  </FormGroup>
                  <ButtonGroup horizontal="true">
                    <Button
                      id="myButton"
                      className="btn btn-primary"
                      type="submit"
                    >
                      Create User
                    </Button>
                    <Button
                      id="myButton"
                      className="btn btn-primary"
                      onClick={this.toggle}
                    >
                      Back
                    </Button>
                  </ButtonGroup>
                </Form>
              </Fade>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default connect()(LoginForm)
