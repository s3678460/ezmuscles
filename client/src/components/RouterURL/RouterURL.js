import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import ReactApp from '../ReactApp';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Verification from '../Verification/Verification';
import Chatbot from '../Chatbot/Chatbot';
import SendDiscountCode from '../SendDiscountCode/SendDiscountCode';
import Cart from '../Cart/Cart';
import AdminPage from '../Admin/AdminPage';
import UpdateProduct from '../Admin/UpdateProduct';
import ProductPage from '../Product/ProductPage';
import Purchase from '../PurchasePage/Purchase'

export class RouterURL extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={ReactApp} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/verify" component={Verification} />
                    <Route path="/support" component={Chatbot} />
                    <Route path="/senddiscount" component={SendDiscountCode} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/product/:_id" component={UpdateProduct} />
                    <Route path="/product" component={ProductPage} />
                    <Route path="/purchase/:_id" component={Purchase} />

                    <Route component={ReactApp} />
                </Switch>
            </div>
        )
    }
}

export default RouterURL
