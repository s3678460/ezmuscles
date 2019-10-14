import {
    GET_PRODUCTS,
    GET_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT,
    GET_ERRORS,
    UPDATE_PRODUCT
} from "./../actions/types"
import axios from "axios"



export const getProducts = () => dispatch => {
    axios
        .get('/api/products/all')
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        }))
}

export const getProduct = (id) => dispatch => {
    axios
        .get(`/api/products/${id}`)
        .then(res => dispatch({
            type: GET_PRODUCT,
            payload: res.data
        }))
}

export const deleteProduct = (id) => dispatch => {
    axios
        .delete(`/api/products/${id}`)
        .then(res => dispatch({
            type: DELETE_PRODUCT,
            payload: id
        }))
        .then(res => dispatch(getProducts()))
}

export const addProduct = (newProduct) => dispatch => {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/products", newProduct)
            .then(res => {
                dispatch({
                    type: ADD_PRODUCT,
                    payload: res.data
                })
                resolve(true)
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                resolve(false)
            })
    })

}
export const updateProduct = (id, updatedProduct) => dispatch => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/products/${id}`, updatedProduct)
            .then(res => {
                dispatch({
                    type: UPDATE_PRODUCT,
                    payload: res.data
                })
                resolve(true)
            })
            .then(res => dispatch(getProducts()))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                resolve(false)
            })
    })
}