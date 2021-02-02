//Register User

import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {
    SET_CURRENT_USER,
    GET_ERRORS
} from './types'
import setAuthToken from './../utils/setAuthToken'

export const registerUser = (userData, history) => async dispatch => {

    try {
        await axios.post('/users/register', userData)
        history.push('/login')


    } catch (err) {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }

}

//Logging user
export const loginUser = (userData, history) => async dispatch => {


    try {
        const res = await axios.post('/users/login', userData)
        // const img=await axios.get('/users/ashishboss99/avtaar',{responseType:'image/png'})
        //    console.log(typeof(img.data))
        // console.log(res.data)
        const {
            token
        } = res.data
        // const image=img.data
        //Set Token to local storage
        localStorage.setItem('jwtToken', token)
        // localStorage.setItem('image',image)
        //Set token to header
        setAuthToken(token)
        //Decode
        const decoded = jwtDecode(token)
        // console.log(decoded)
        //set cureent user
        dispatch(setCurrentUser(decoded))

    } catch (err) {
        // console.log(err.response.data)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }

}
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Logout user

export const logOutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    // localStorage.removeItem('image')
    setAuthToken(false)

    dispatch(setCurrentUser({}))

}