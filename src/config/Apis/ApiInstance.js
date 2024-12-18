import axios from "axios";

const ApiInstance =  axios.create({
    baseURL: 'http://localhost:4000'
})

export default ApiInstance;