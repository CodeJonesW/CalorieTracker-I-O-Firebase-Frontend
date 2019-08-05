import React, { Component } from "react"
import { Form, FormInput, FormGroup, FormSelect } from "shards-react"
import { Button, ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../actions/user_actions"
import SplashGoalDiv from "./splash_goal_form"

class GoalForm extends Component {
  state = {
    redirect: null
  }

  handleCreateGoal = e => {
    e.preventDefault()

    fetch("https://sleepy-beach-71455.herokuapp.com/goals", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt_token}`
      },
      body: JSON.stringify({
        goal: {
          category: e.target.category.value.toLowerCase(),
          calories_to_burn: e.target.calories_to_burn.value,
          distance: e.target.distance.value,
          completed: e.target.completed.value,
          user_id: this.props.user.userInfo.id
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.user) {
          this.props.dispatch({ type: "UPDATE_USER", user: res.user })
          this.setState({ redirect: <Redirect to="/goals" /> })
        }
      })

    // fetchUser().then(res => {
    //   this.props.dispatch({ type: "UPDATE_USER", user: res.user })
    // })
    // this.setState({ redirect: <Redirect to="/goals" /> })
    // }
    //   	else if(res.errors)
    //   		this.setState({ errors: res.errors })
    //   })
    // 	e.target.reset
    // }
  }

  render() {
    return (
      <SplashGoalDiv>
        <Form
          onSubmit={e => this.handleCreateGoal(e)}
          style={{
            position: "relative",
            width: 300,
            height: 550,
            margin: "20px"
          }}
        >
          {this.state.redirect}

          {/* <h3>New Goal</h3> */}
          <FormGroup>
            <FormSelect required="true" name="category">
              <option value="run">Run</option>
              <option value="walk">Walk</option>
              <option value="bike">Bike</option>
              <option value="swim">Swim</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormInput
              required="true"
              type="number"
              min="0"
              max="5000"
              step="10"
              name="calories_to_burn"
              id="#calories_to_burn"
              placeholder="# Calories to Burn"
            />
          </FormGroup>

          <FormGroup>
            <FormInput
              required="true"
              type="number"
              step="0.1"
              min="0"
              max="200"
              name="distance"
              id="#distance"
              placeholder="# of Miles"
            />
          </FormGroup>

          <FormGroup>
            <FormSelect name="completed">
              <option value="false">Pending</option>
              <option value="true">Complete</option>
            </FormSelect>
          </FormGroup>
          <ButtonGroup horizontal="true">
            <Button id="myButton" className="btn btn-primary" type="submit">
              Submit
            </Button>
            <NavLink id="myButton" className="btn btn-primary" to="/goals">
              Back
            </NavLink>
          </ButtonGroup>
        </Form>
      </SplashGoalDiv>
    )
  }
}

let mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(GoalForm)
