import React, { Component } from "react"
import { Bar } from "react-chartjs-2"
import { connect } from "react-redux"

class ConsumptionsChart extends Component {
  render() {
    let barDataSets = this.props.userConsumptions && [
      {
        label: "Calories Consumed",
        borderColor: "rgba(0,128,0, 1)",
        borderWidth: "1",
        backgroundColor: "rgba(44, 130, 201, 0.9)",
        data: this.props.userInfo.special.calories_consumed.map(
          consumption => consumption
        )
      },
      {
        label: "Number of Consumptions per Day",
        borderColor: "rgba(44, 130, 201, 1)",
        borderWidth: "1",
        backgroundColor: "rgba(0,128,0, 0.8)",
        data: this.props.userInfo.special.consumptions_within_last_week.map(
          day => day.length
        )
      }
    ]

    return (
      <div>
        {/* <h6>Weekly Calorie Consumption by Day</h6> */}
        {this.props.userInfo && (
          <Bar
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
    userConsumptions: state.user.userInfo.consumptions,
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(ConsumptionsChart)
