import axios from 'axios'
const setAuthToken = (token) => {
    if (token) {
        // console.log(token)
        const tokenbearer = 'Bearer ' + token
        axios.defaults.headers.common['Authorization'] = tokenbearer


    } else {
        //Delete auth header
        delete axios.defaults.headers.common['Authorization']
    }
}
export default setAuthToken