import React from "react"
import { connect } from "react-redux"
import ConsumptionsChart from "../components/consumptions_chart"
import { ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { Card, Row, Col } from "react-bootstrap"
import NutritionixForm from "../components/nutritionix_foods_form"

class ConsumptionsContainer extends React.Component {
  render() {
    return (
      <div className="consumptionContainer">
        <Row className="d-flex justify-content-center m-3">
          <Col md={3}>
            <Card className="m-1" id="recentConsumptionsCard">
              <Card.Body>
                <Card.Title>Consumption Info</Card.Title>
                <Card.Text>
                  Here you can log all the food and drink you consume and keep
                  track of them over time! Use the search bar below to search
                  for food and beverage types and find their calorie count!{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <h4>Consumptions</h4>
            <ButtonGroup vertical className="m-1">
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/createconsumption"
              >
                {" "}
                New Consumption
              </NavLink>
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/editconsumption"
              >
                {" "}
                Edit Consumption
              </NavLink>
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/deleteconsumption"
              >
                Delete Consumption
              </NavLink>
            </ButtonGroup>
          </Col>

          <Col md={3}>
            <Card className="m-1" id="recentConsumptionsCard">
              <Card.Body>
                <Card.Title>Recent Consumptions</Card.Title>
                <Card.Text>
                  {" "}
                  {this.props.userInfo.consumptions
                    .slice(-4)
                    .map(consumption => consumption.category + ", ")}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="m-1" id="consumptionsCard">
              <Card.Body>
                <Card.Title>Calories Consumed</Card.Title>
                <Card.Text>
                  Today: {this.props.userInfo.calories_consumed.daily}
                  <br />
                  This Week: {this.props.userInfo.calories_consumed.weekly}
                  <br />
                  This Month: {this.props.userInfo.calories_consumed.monthly}
                  <br />
                  This Year: {this.props.userInfo.calories_consumed.yearly}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center m-3">
          <Col md={6}>
            <ConsumptionsChart className="m-3" />
          </Col>

          <Col md={6}>
            <NutritionixForm className="m-2" />
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    userConsumptions: state.user.userInfo.consumptions,
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(ConsumptionsContainer)
