import React, { Component } from "react"
import { Form, FormGroup, FormSelect } from "shards-react"
import { Button, ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../actions/user_actions"
import SplashEditConsumptionDiv from "../components/splash_consumption_form"

class DeleteConsumptionForm extends Component {
  state = {
    redirect: null
  }

  handleDeleteConsumption = e => {
    e.preventDefault()

    fetch(
      `http://localhost:3000/consumptions/${e.target.consumptionId.value}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.jwt_token}`
        },
        body: JSON.stringify({})
      }
    )
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
      <SplashEditConsumptionDiv>
        <Form
          onSubmit={e => this.handleDeleteConsumption(e)}
          style={{
            position: "relative",
            width: 550,
            height: 550,
            margin: "20px"
          }}
        >
          {this.state.redirect}
          <FormGroup>
            <FormSelect name="consumptionId">
              {this.props.userInfo.consumptions.map(consumption => (
                <option value={consumption.id}>
                  Id: {consumption.id}, Type: {consumption.category}, Calories
                  Intaken:{" "}
                  {consumption.calories_intaken
                    ? consumption.calories_intaken
                    : "Nil"}{" "}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          <ButtonGroup horizontal="true">
            <Button id="myButton" className="btn btn-primary" type="submit">
              Delete
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
      </SplashEditConsumptionDiv>
    )
  }
}

let mapStateToProps = state => {
  return { userInfo: state.user.userInfo }
}

export default connect(mapStateToProps)(DeleteConsumptionForm)
