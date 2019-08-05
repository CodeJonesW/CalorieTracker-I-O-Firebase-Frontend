import React, { Component, Fragment } from "react"
import { Form, FormInput, FormGroup } from "shards-react"
import { Button, Fade } from "shards-react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../actions/user_actions"
import { Card } from "react-bootstrap"

class NutritionixForm extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      visible: false,
      redirect: null
    }
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleSearchNutrionixFoods = e => {
    e.preventDefault()

    fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-app-id": "acc5e7a4",
        "x-app-key": "730daa51ab247ff687c34d9055c5e595",
        "x-remote-user-id": "0"
      },
      body: JSON.stringify({
        query: e.target.nutritionixSearch.value
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.foods) {
          this.props.dispatch({
            type: "UPDATE_CONSUMPTION",
            foodArr: res.foods
          })
          this.setState({ redirect: <Redirect to="/consumptions" /> })
          this.toggle()
        } else {
          alert(
            "Invalid Search. Enter a type of food. For example - 3 veggie tacos"
          )
        }

        //   	else if(res.errors)
        //   		this.setState({ errors: res.errors })
      })
    e.target.reset()
  }

  handleCreateConsumption = e => {
    e.preventDefault()

    fetch("http://localhost:3000/consumptions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt_token}`
      },
      body: JSON.stringify({
        consumption: {
          user_id: this.props.userInfo.id,
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
      <div>
        <Form onSubmit={e => this.handleSearchNutrionixFoods(e)}>
          {this.state.redirect}
          {this.state.visible ? null : (
            <Fragment>
              <FormGroup>
                <FormInput
                  name="nutritionixSearch"
                  placeholder="Search Nutrionix Foods and Create a Consumption!"
                />
              </FormGroup>
              <Button id="myButton" className="mb-2" type="submit">
                Search
              </Button>
            </Fragment>
          )}
        </Form>

        <Fade in={this.state.visible}>
          <Card className="m-3" id="nutritionixSearchInfoCard">
            <Card.Body>
              <Card.Title>Consumption Search Results</Card.Title>

              <Form onSubmit={e => this.handleCreateConsumption(e)}>
                {this.state.redirect}
                Serving Size:{" "}
                {this.props.consumptions[0]
                  ? this.props.consumptions[0]["serving_qty"]
                  : ""}
                <FormGroup>
                  <label htmlFor="#category">Type</label>
                  <FormInput
                    readOnly
                    name="category"
                    id="#category"
                    value={
                      this.props.consumptions[0]
                        ? this.props.consumptions[0]["food_name"]
                        : ""
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#calories_intaken">Calories</label>
                  <FormInput
                    readOnly
                    name="calories_intaken"
                    id="#calories_intaken"
                    value={
                      this.props.consumptions[0]
                        ? this.props.consumptions[0]["nf_calories"]
                        : ""
                    }
                  />
                </FormGroup>
                <Button
                  id="myButton"
                  className="mb-2"
                  onClick={this.toggle}
                  type="submit"
                >
                  Add to your Consumptions
                </Button>{" "}
                <br />
                <Button id="myButton" onClick={this.toggle} className="mb-2">
                  Close
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Fade>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    consumptions: state.consumption.consumptions
  }
}

export default connect(mapStateToProps)(NutritionixForm)
