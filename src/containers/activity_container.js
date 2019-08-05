import React from "react"
import { connect } from "react-redux"
import ActivitiesChart from "../components/activities_chart"
import ActivityTypeChart from "../components/activities_type_chart"
import { ButtonGroup } from "shards-react"
import { Card, Row, Col, Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

class ActivityContainer extends React.Component {
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
    let dailyNetCaloriesBurned = this.props.calories_burned
      ? this.props.calories_burned.daily
      : null
    let weeklyNetCaloriesBurned = this.props.calories_burned
      ? this.props.calories_burned.weekly
      : null
    let monthlyNetCaloriesBurned = this.props.calories_burned
      ? this.props.calories_burned.monthly
      : null
    let yearlyNetCaloriesBurned = this.props.calories_burned
      ? this.props.calories_burned.yearly
      : null

    return (
      <div>
        <Row className="d-flex justify-content-center m-3">
          <Col md={3}>
            <Card className="m-3" id="activityMilesCard">
              <Card.Body>
                <Card.Title>Activity Info</Card.Title>
                <Card.Text>
                  Here you can log all your excersizes and track the activity
                  type, calories burned, and distance traveled over time! Input
                  the distance, calories burned, and activity type upon creation
                  to recieve the best results!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <h4 className="m-3">Activities</h4>
            <ButtonGroup vertical>
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/createactivity"
              >
                {" "}
                New Activity
              </NavLink>
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/editactivity"
              >
                {" "}
                Edit Activity
              </NavLink>
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/deleteactivity"
              >
                Delete Activity
              </NavLink>
            </ButtonGroup>
          </Col>

          <Col md={3}>
            <Card className="m-3">
              <Card.Body>
                <Card.Title>Calories Burned</Card.Title>
                <Card.Text>
                  Today: {dailyNetCaloriesBurned}
                  <br />
                  This Week: {weeklyNetCaloriesBurned}
                  <br />
                  This Month: {monthlyNetCaloriesBurned}
                  <br />
                  This Year: {yearlyNetCaloriesBurned}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="m-3" id="activityMilesCard">
              <Card.Body>
                <Card.Title>Total Activity Miles</Card.Title>
                <Card.Text>
                  This week:{" "}
                  {this.props.userInfo.special.activity_miles_this_week.toFixed(
                    1
                  )}
                  <br />
                  This month:{" "}
                  {this.props.userInfo.special.activity_miles_this_month.toFixed(
                    1
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Container>
          <Row>
            <Col md={6}>
              <ActivitiesChart />
            </Col>
            <Col md={6}>
              <ActivityTypeChart />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    userActivities: state.user.userInfo.activities,
    userInfo: state.user.userInfo,
    calories_burned: state.user.userInfo.calories_burned
  }
}

export default connect(mapStateToProps)(ActivityContainer)
