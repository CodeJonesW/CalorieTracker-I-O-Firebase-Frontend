import React, { Component } from "react"
import { Form, FormInput, FormGroup, FormSelect } from "shards-react"
import { Button, ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import SplashEditProfileDiv from "../components/splash_edit_profile"

class EditProfileForm extends Component {
  state = {
    redirect: null
  }

  handleEditProfile = e => {
    e.preventDefault()
    let height = e.target.heightfeet.value + "'" + e.target.heightinches.value
    fetch(
      `https://sleepy-beach-71455.herokuapp.com/users/${
        this.props.userInfo.id
      }`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.jwt_token}`
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
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.user) {
          this.props.dispatch({ type: "UPDATE_USER", user: res.user })
          this.setState({ redirect: <Redirect to="/profile" /> })
        }
      })

    // fetchUser().then(res => {
    //   this.props.dispatch({ type: "UPDATE_USER", user: res.user })
    // })
    // this.setState({ redirect: <Redirect to="/profile" /> })
    // }
    //   	else if(res.errors)
    //   		this.setState({ errors: res.errors })
    //   })
    // 	e.target.reset
    // }
  }

  render() {
    return (
      <SplashEditProfileDiv>
        <div id="editProfile">
          <Form
            onSubmit={e => this.handleEditProfile(e)}
            style={{
              position: "relative",
              width: 300,
              height: 550,
              margin: "20px"
            }}
          >
            {this.state.redirect}
            <h6>Edit User</h6>
            <FormGroup>
              <FormInput
                name="username"
                type="text"
                required="true"
                maxlength="16"
                id="#username"
                placeholder="Username"
                defaultValue={this.props.userInfo.username}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                required="true"
                name="password"
                id="#password"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                name="name"
                id="#name"
                placeholder="Name"
                defaultValue={this.props.userInfo.name}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="email"
                name="email"
                id="#email"
                placeholder="Email"
                defaultValue={this.props.userInfo.email}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="number"
                name="age"
                id="#age"
                placeholder="Age"
                defaultValue={this.props.userInfo.age}
              />
            </FormGroup>
            <FormGroup>
              <FormSelect
                name="gender"
                id="#gender"
                placeholder="Gender"
                defaultValue={this.props.userInfo.gender}
              >
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
                defaultValue={this.props.userInfo.height.split("'")[0]}
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
                defaultValue={this.props.userInfo.height.split("'")[1]}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="number"
                name="weight"
                id="#weight"
                placeholder="Weight"
                defaultValue={this.props.userInfo.weight}
              />
            </FormGroup>
            <ButtonGroup id="myBtnGroup" horizontal="true">
              <Button id="myButton" className="btn btn-primary" type="submit">
                Submit Edit
              </Button>
              <NavLink id="myButton" className="btn btn-primary" to="/profile">
                Back
              </NavLink>
            </ButtonGroup>
          </Form>
        </div>
      </SplashEditProfileDiv>
    )
  }
}

let mapStateToProps = state => {
  return { userInfo: state.user.userInfo }
}

export default connect(mapStateToProps)(EditProfileForm)
