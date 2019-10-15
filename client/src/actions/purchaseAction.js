import {
    ADD_PURCHASE,
    GET_PURCHASES
} from "./../actions/types"
import axios from "axios"


export const getPurchases = () => dispatch => {
    axios
        .get('/api/purchases')
        .then(res => dispatch({
            type: GET_PURCHASES,
            payload: res.data
        }))
}


export const addPurchases = (newPurchase,history) => dispatch => {
    axios.post('/api/purchases/postPurchase',newPurchase)
    .then(res=>history.push('/product'))
    
}



