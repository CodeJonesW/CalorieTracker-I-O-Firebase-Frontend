
import goalReducer from './goal'
import consumptionReducer from './consumption'
import activityReducer from './activity'
import activityCommentReducer from './activity_comment'
import consumptionCommentReducer from './consumption_comment'
import followReducer from './follow'
import UserReducer from './user'
import { combineReducers } from 'redux';

export default combineReducers({
    goal: goalReducer,
    activity: activityReducer,
    consumption: consumptionReducer,
    activity_comment: activityCommentReducer,
    consumption_comment: consumptionCommentReducer,
    follow: followReducer,
    user: UserReducer

})