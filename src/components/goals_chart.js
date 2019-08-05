import React, { Component } from "react"
import { Bar } from "react-chartjs-2"
import { connect } from "react-redux"

class GoalsChart extends Component {
  render() {
    let barDataSets = this.props.userGoals && [
      {
        label: "Calories To Burn",
        borderColor: "rgba(1, 50, 67, 0.5)",
        borderWidth: "1",
        backgroundColor: "rgba(102, 51, 153, 0.9)",
        data: this.props.user.goal_stats.successful_goals.map(
          goal => goal.calories_to_burn
        )
      },
      {
        label: "Goal Distance",
        borderColor: "rgba(102, 51, 153, 1)",
        borderWidth: "1",
        backgroundColor: "rgba(1, 50, 67, 0.9)",
        data: this.props.user.goal_stats.successful_goals.map(goal =>
          parseFloat(goal.distance.split(" ")[0])
        )
      }
    ]

    return (
      <div>
        <h4>Completed Goals</h4>
        <Bar
          options={{
            responsive: true
          }}
          data={{
            labels: this.props.user.goal_stats.successful_goals.map(goal =>
              goal.created_at.slice(3, 10)
            ),
            datasets: barDataSets
          }}
        />
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    userGoals: state.user.userInfo.goals,
    user: state.user.userInfo,
    completed_goals: state.user.userInfo.goal_stats
  }
}

export default connect(mapStateToProps)(GoalsChart)
