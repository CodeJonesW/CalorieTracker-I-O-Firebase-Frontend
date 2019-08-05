export const fetchUser = () =>
  fetch("https://sleepy-beach-71455.herokuapp.com/current_user", {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` }
  }).then(res => res.json())
