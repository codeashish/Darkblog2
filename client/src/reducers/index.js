import {combineReducers} from 'redux'
import authreducer from './authreducer'
import errorReducer from './errorReducer'
import profilereducer from './profilereducer'
import blogreducer from './blogreducer'


export default combineReducers({
    auth:authreducer,
    errors:errorReducer,
    profile:profilereducer,
    blog:blogreducer
})
