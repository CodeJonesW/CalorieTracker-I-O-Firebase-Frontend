import React, { Component } from "react"
import { Line } from "react-chartjs-2"
import { connect } from "react-redux"

class ActivitiesChart extends Component {
  render() {
    let barDataSets = this.props.userActivities && [
      {
        label: "Calories Burned",
        backgroundColor: "rgba(207, 0, 15, 0.75)",
        borderColor: "rgba(232, 126, 4, 0.4)",
        data: this.props.userInfo.special.calories_burned.map(burned => burned)
      },
      {
        label: "Activity Distance in Miles",
        backgroundColor: "rgba(232, 126, 4, 0.75)",
        borderColor: "rgba(207, 0, 15, 0.4)",
        data: this.props.userInfo.special.activity_miles_per_day_this_week.map(
          distance => distance
        )
      }
    ]

    return (
      <div>
        <h6>Weekly Burned Calories by Day</h6>
        {this.props.userActivities && (
          <Line
            options={{
              responsive: true
            }}
            data={{
              labels: this.props.userInfo.special.last_weeks_days.map(day =>
                day.slice(6)
              ),
              datasets: barDataSets
            }}
          />
        )}
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    userActivities: state.user.userInfo.activities,
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(ActivitiesChart)
