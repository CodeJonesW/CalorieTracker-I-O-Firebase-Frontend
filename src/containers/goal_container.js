import React from "react"
import { connect } from "react-redux"
import GoalTypeChart from "../components/goal_type_chart"
import GoalsChart from "../components/goals_chart"
import { Card, Row, Col } from "react-bootstrap"
import { ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"

class GoalContainer extends React.Component {
  render() {
    return (
      <div>
        <Row className="d-flex justify-content-center m-3">
          <Col md={3}>
            <Card className="m-3">
              <Card.Body>
                <Card.Title>Goal Info</Card.Title>
                <Card.Text>
                  Creat a goal for yourself! Come back when you are ready to
                  check the goal off your list.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5} className="m-2">
            <h4>Goals</h4>
            <ButtonGroup vertical>
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/creategoal"
              >
                {" "}
                New Goal
              </NavLink>
              <NavLink id="myButton" className="btn btn-primary" to="/editgoal">
                {" "}
                Edit Goal
              </NavLink>
              <NavLink
                id="myButton"
                className="btn btn-primary"
                to="/deletegoal"
              >
                {" "}
                Delete Goal
              </NavLink>
            </ButtonGroup>
          </Col>

          <Col>
            <Card className="m-1" id="activeGoalsCard">
              <Card.Body>
                <Card.Title>Last 3 Pending Goals</Card.Title>
                {this.props.goalStats.pending_goals
                  .slice(-3)
                  .map(pendingGoal => (
                    <p>
                      Distance: {pendingGoal.distance} miles, Type:{" "}
                      {pendingGoal.category}
                    </p>
                  ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center m-3">
          <Col md={5}>
            <GoalsChart />
          </Col>
          <Col md={5}>
            <GoalTypeChart />
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    userGoals: state.user.userInfo.goals,
    user: state.user.userInfo,
    goalStats: state.user.userInfo.goal_stats
  }
}

export default connect(mapStateToProps)(GoalContainer)
