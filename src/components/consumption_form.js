import React, { Component } from "react"
import { Form, FormInput, FormGroup } from "shards-react"
import { Button, ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../actions/user_actions"
import SplashConsumptionDiv from "./splash_consumption_form"

class ConsumptionForm extends Component {
  state = {
    redirect: null
  }

  handleCreateConsumption = e => {
    e.preventDefault()

    fetch("https://sleepy-beach-71455.herokuapp.com/consumptions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt_token}`
      },
      body: JSON.stringify({
        consumption: {
          user_id: this.props.user.userInfo.id,
          category: e.target.category.value,
          calories_intaken: e.target.calories_intaken.value
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.user) {
          this.props.dispatch({ type: "UPDATE_USER", user: res.user })
          this.setState({ redirect: <Redirect to="/consumptions" /> })
        }
      })

    // fetchUser().then(res => {
    //   this.props.dispatch({ type: "UPDATE_USER", user: res.user })
    // })

    // this.setState({ redirect: <Redirect to="/consumptions" /> })
    // }
    //   	else if(res.errors)
    //   		this.setState({ errors: res.errors })
    //   })
    // 	e.target.reset
    // }
  }

  render() {
    return (
      <SplashConsumptionDiv>
        <Form
          onSubmit={e => this.handleCreateConsumption(e)}
          style={{
            position: "relative",
            width: 300,
            height: 550,
            margin: "20px"
          }}
        >
          {this.state.redirect}
          <FormGroup>
            <FormInput
              required="true"
              type="text"
              name="category"
              id="#category"
              placeholder="Food/Beverage"
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              required="true"
              type="number"
              min="0"
              max="4000"
              name="calories_intaken"
              id="#calories_intaken"
              placeholder="Calories Consumed"
            />
          </FormGroup>
          <ButtonGroup horizontal="true">
            <Button id="myButton" className="btn btn-primary" type="submit">
              Submit
            </Button>
            <NavLink
              id="myButton"
              className="btn btn-primary"
              to="/consumptions"
            >
              Back
            </NavLink>
          </ButtonGroup>
        </Form>
      </SplashConsumptionDiv>
    )
  }
}

let mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(ConsumptionForm)
