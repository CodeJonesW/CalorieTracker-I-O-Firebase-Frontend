// export const CreateConsumption = (e) => {
//     e.preventDefault()

//         fetch('https://sleepy-beach-71455.herokuapp.com/consumptions',{
//         method: 'POST',
//         headers: { Accept: 'application/json', 'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.jwt_token}` },
//         body: JSON.stringify({
//             consumption: {
//                 user_id: this.props.user.userInfo.id,
//                 category: e.target.category.value,
//                 calories_intaken: e.target.calories_intaken.value,
//             }
//         })
//     })
// }
