import React, { Component } from "react"
import { Form, FormGroup, FormSelect } from "shards-react"
import { Button, ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../actions/user_actions"
import SplashEditActivityDiv from "../components/splash_edit_activity"

class DeleteActivityForm extends Component {
  state = {
    redirect: null
  }

  handleDeleteActivity = e => {
    e.preventDefault()

    fetch(`http://localhost:3000/activities/${e.target.activityId.value}`, {
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
          this.setState({ redirect: <Redirect to="/activities" /> })
        }
      })
    // fetchUser().then(res => {
    //   this.props.dispatch({ type: "UPDATE_USER", user: res.user })
    // })
    // this.setState({ redirect: <Redirect to="/activities" /> })
    // }
    //   	else if(res.errors)
    //   		this.setState({ errors: res.errors })
    //   })
    // 	e.target.reset
    // }
  }

  render() {
    return (
      <SplashEditActivityDiv>
        <Form
          onSubmit={e => this.handleDeleteActivity(e)}
          style={{
            position: "relative",
            width: 550,
            height: 550,
            margin: "20px"
          }}
        >
          {this.state.redirect}
          <FormGroup>
            <FormSelect name="activityId">
              {this.props.userInfo.activities.map(activity => (
                <option value={activity.id}>
                  Id: {activity.id}, Type: {activity.category}, Calories Burned:{" "}
                  {activity.calories_burned ? activity.calories_burned : "Nil"}{" "}
                  Distance: {activity.distance ? activity.distance : "Nil"}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          <ButtonGroup horizontal="true">
            <Button id="myButton" className="btn btn-primary" type="submit">
              Delete
            </Button>
            <NavLink id="myButton" className="btn btn-primary" to="/activities">
              Back
            </NavLink>
          </ButtonGroup>
        </Form>
      </SplashEditActivityDiv>
    )
  }
}

let mapStateToProps = state => {
  return { userInfo: state.user.userInfo }
}

export default connect(mapStateToProps)(DeleteActivityForm)
