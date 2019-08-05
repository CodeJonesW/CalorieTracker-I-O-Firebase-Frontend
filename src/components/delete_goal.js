import React, { Component } from "react"
import { Form, FormGroup, FormSelect } from "shards-react"
import { Button, ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../actions/user_actions"
import SplashEditGoalDiv from "../components/splash_goal_form"

class DeleteGoalForm extends Component {
  state = {
    redirect: null
  }

  handleDeleteGoal = e => {
    e.preventDefault()

    fetch(`http://localhost:3000/goals/${e.target.goalId.value}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt_token}`
      },
      body: JSON.stringify({})
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
      <SplashEditGoalDiv>
        <Form
          onSubmit={e => this.handleDeleteGoal(e)}
          style={{
            position: "relative",
            width: 550,
            height: 550,
            margin: "20px"
          }}
        >
          {this.state.redirect}
          <FormGroup>
            <FormSelect name="goalId">
              {this.props.userInfo.goals.map(goal => (
                <option value={goal.id}>
                  Id: {goal.id}, Type: {goal.category}, Calories to Burn:{" "}
                  {goal.calories_to_burn ? goal.calories_to_burn : "Nil"}{" "}
                  Distance: {goal.distance ? goal.distance : "Nil"}{" "}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          <ButtonGroup horizontal="true">
            <Button id="myButton" className="btn btn-primary" type="submit">
              Delete
            </Button>
            <NavLink id="myButton" className="btn btn-primary" to="/goals">
              Back
            </NavLink>
          </ButtonGroup>
        </Form>
      </SplashEditGoalDiv>
    )
  }
}

let mapStateToProps = state => {
  return { userInfo: state.user.userInfo }
}

export default connect(mapStateToProps)(DeleteGoalForm)
