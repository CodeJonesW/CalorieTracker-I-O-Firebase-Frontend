import React, { Component } from "react"
import { Doughnut } from "react-chartjs-2"
import { connect } from "react-redux"

class ActivityTypeChart extends Component {
  render() {
    let activity_amounts = this.props.activity_types && [
      this.props.activity_types.runs.length,
      this.props.activity_types.walks.length,
      this.props.activity_types.swims.length,
      this.props.activity_types.bikes.length
    ]
    return (
      <div>
        <h6>Activity Types</h6>
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
                borderColor: "rgba(228, 241, 254, 1)",
                borderWidth: "1",
                backgroundColor: [
                  "rgba(248, 148, 6, 1)",
                  "green",
                  "rgba(207, 0, 15, 1)",
                  "blue"
                ],
                data: activity_amounts,
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
  return {
    userActivities: state.user.userInfo.activities,
    user: state.user.userInfo,
    activity_types: state.user.userInfo.activity_types
  }
}

export default connect(mapStateToProps)(ActivityTypeChart)
