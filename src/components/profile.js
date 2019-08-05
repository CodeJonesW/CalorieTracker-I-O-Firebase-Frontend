import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Fade, ButtonGroup } from "shards-react"
import { Card, Row, Col } from "react-bootstrap"
import NetCaloriesChart from "./net_calories_chart"
import ActivityTypeChart from "./activities_type_chart"

class Profile extends React.Component {
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

  render() {
    let dailyNetCalories = this.props.userInfo.net_calories
      ? this.props.userInfo.net_calories.daily
      : null
    let weeklyNetCalories = this.props.userInfo.net_calories
      ? this.props.userInfo.net_calories.weekly
      : null
    let monthlyNetCalories = this.props.userInfo.net_calories
      ? this.props.userInfo.net_calories.monthly
      : null
    let yearlyNetCalories = this.props.userInfo.net_calories
      ? this.props.userInfo.net_calories.yearly
      : null

    return (
      <div id="profilePage">
        <Row className="d-flex justify-content-left m-1">
          <Col md={4}>
            <Card className="m-3">
              <Card.Body>
                <Card.Title>{this.props.userInfo.name}'s Profile</Card.Title>
                <Card.Text>
                  Username: {this.props.userInfo.username}
                  <br />
                  Email: {this.props.userInfo.email}
                  <br />
                  Age: {this.props.userInfo.age}, Gender:{" "}
                  {this.props.userInfo.gender}
                  <br />
                  Height: {this.props.userInfo.height}, Weight:{" "}
                  {this.props.userInfo.weight}
                  <br />
                </Card.Text>
                <ButtonGroup horizontal="true">
                  {/* stretch goal to implement friends feature */}
                  {/* <Button onClick={this.toggle}>
                                            Show Friends
                                        </Button> */}
                  <NavLink
                    id="myButton"
                    className="btn btn-primary"
                    to="/editprofile"
                  >
                    {" "}
                    Edit Profile
                  </NavLink>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <NetCaloriesChart />
          </Col>

          <Col md={2}>
            <Card className="m-2" id="userCalorieInfo">
              <Card.Body>
                <Card.Title>
                  {" "}
                  {
                    this.props.userInfo.special
                      .find_number_of_days_left_in_current_month
                  }{" "}
                  {this.props.userInfo.special
                    .find_number_of_days_left_in_current_month === 1
                    ? "Day"
                    : "Days"}{" "}
                  left to do better this month!
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="d-flex justify-content-left m-1">
          <Col md={4}>
            <Card className="m-3" id="userCalorieInfo">
              <Card.Body>
                <Card.Title>Net Calories</Card.Title>
                <Card.Text>
                  Daily Net Calories: {dailyNetCalories}
                  <br />
                  Weekly Net Calories: {weeklyNetCalories}
                  <br />
                  Monthly Net Calories: {monthlyNetCalories}
                  <br />
                  Yearly Net Calories: {yearlyNetCalories}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="m-3" id="userCalorieInfo">
              <Card.Body>
                <Card.Title>
                  Your BMR:{" "}
                  {this.props.userInfo.special.basal_metabolic_rate
                    ? this.props.userInfo.special.basal_metabolic_rate
                    : "Enter your age, weight, and height to calculate your BMR!"}
                </Card.Title>
                <Card.Text>
                  Suggested Calorie Intake by Activity Level:
                  <br />
                  Sedentary:
                  {this.props.userInfo.special.bmr_at_sedentary_activity_lvl.toFixed(
                    0
                  )}
                  <br />
                  Light:{" "}
                  {this.props.userInfo.special.bmr_at_light_activity_lvl.toFixed(
                    0
                  )}
                  <br />
                  Moderate:
                  {this.props.userInfo.special.bmr_at_moderate_activity_lvl.toFixed(
                    0
                  )}
                  <br />
                  High:{" "}
                  {this.props.userInfo.special.bmr_at_high_activity_lvl.toFixed(
                    0
                  )}
                  <br />
                  Very High:{" "}
                  {this.props.userInfo.special.bmr_at_very_high_activity_lvl.toFixed(
                    0
                  )}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
            <Fade in={this.state.visible}>
              <Card className="m-2" id="userFollowing">
                <Card.Body>
                  <Card.Title>Friends You Follow</Card.Title>
                  <Card.Text>
                    {/* {this.props.userInfo.follows.map(follow =><p> follow.id </p>)} */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>

          <Col md={4}>
            <ActivityTypeChart />
          </Col>
          <Col md={4}>
            <Card className="m-3" id="userCalorieInfo">
              <Card.Body>
                <Card.Title>Calculator Information</Card.Title>
                <Card.Text>
                  Basal metabolic rate (BMR) is a minimum number of calories
                  required for basic resting functions.
                  <br />
                  Net Calories = Calories Consumed - Calories Burned
                  <br />
                  Sedentary: BMR x 1.2 <br />
                  Light: BMR x 1.375 <br />
                  Moderate: BMR x 1.55 <br />
                  High: BMR x 1.725 <br />
                  Very High: BMR x 1.9
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return { userInfo: state.user.userInfo }
}

export default connect(mapStateToProps)(Profile)
