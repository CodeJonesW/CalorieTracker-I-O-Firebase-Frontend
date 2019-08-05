import React, { Component } from "react"
import { Doughnut } from "react-chartjs-2"
import { connect } from "react-redux"

class GoalTypeChart extends Component {
  render() {
    let goal_amounts = this.props.userInfo.goal_types && [
      this.props.userInfo.goal_types.runs.length,
      this.props.userInfo.goal_types.walks.length,
      this.props.userInfo.goal_types.swims.length,
      this.props.userInfo.goal_types.bikes.length
    ]
    return (
      <div>
        <h6>Goal Types</h6>
        <Doughnut
          options={{
            responsive: true,
            rotation: -0.5,
            animateRotate: true
          }}
          data={{
            labels: ["run", "walk", "swim", "bike"],
            datasets: [
              {
                label: "Activity Type",
                backgroundColor: [
                  "rgba(248, 148, 6, 0.9)",
                  "green",
                  "rgba(207, 0, 15, 0.9)",
                  "blue"
                ],
                borderColor: "rgba(228, 241, 254, 0.9)",
                borderWidth: "1",
                data: goal_amounts,
                drawBorder: true
              }
            ]
          }}
        />
      </div>
    )
  }
}
let mapStateToProps = state => {
  return { userInfo: state.user.userInfo }
}

export default connect(mapStateToProps)(GoalTypeChart)
