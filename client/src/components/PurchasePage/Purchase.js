import React, { Component } from 'react'
import './Purchase.css'
import { getProducts } from "../../actions/productActions"
import {getPurchases, addPurchases} from "../../actions/purchaseAction"
import { connect } from "react-redux"


 class Purchase extends Component {
   constructor(){
     super();
     this.state={
        productName:'',
        productPrice:'',
        productImageURL:'',
        clientName:'',
        clientPhone:'',
        clientAddress:''
     }

     this.onChange=this.onChange.bind(this);
      this.onSubmit=this.onSubmit.bind(this);
   }

   componentWillMount(){
     const {products} = this.props.products
     const productIDTarget = this.props.match.params._id;
     const productTarget = products.find((product)=> {
       return product._id === productIDTarget
     })
     if(productTarget) {
       this.setState({
         productName: productTarget.name,
         productPrice: productTarget.price,
         productImageURL: productTarget.imageURL
       })
     }
   }

   onChange(e){
    this.setState({[e.target.name]: e.target.value})
}

  onSubmit(e){
    e.preventDefault();

    const newPurchase = {
        productName: this.state.productName,
        productPrice:this.state.productPrice,
        clientName:this.state.clientName,
        clientAddress:this.state.clientAddress,
        clientPhone: this.state.clientPhone
    }

    this.props.addPurchases(newPurchase,this.props.history);
  }
    render() {
        return (
            <div>
            <div className="container-fluid-order" style={{ maxHeight: "100%" }}>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="order-box1">
              <h1>Checkout</h1>
              <div className="card-body">
                <form
                  noValidate
                  className="form-checkout"
                 onSubmit={this.onSubmit}
                >
                  <h2>Billing Information</h2>
                  <div className="form-group">
                    <input
                   
                        className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      name="clientName"
                      value={this.state.clientName}
                      onChange={this.onChange}
                    />
                   
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control lg"
                      placeholder="Address"
                      name="clientAddress"
                      value={this.state.clientAddress}
                      onChange={this.onChange}
                    />
                    
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control lg"
                      placeholder="Phone Number"
                      name="clientPhone"
                      value={this.state.clientPhone}
                      onChange={this.onChange}
                    />
                    
                  </div>
                 
                  <div className="total">
                   
                    
                    <button
                      type="submit"
                      className="btn btn-info btn-block mt-5"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="order-box1" style={{ position: "absolute" }}>
              <h1>Order Summary</h1>
              <div className="checkout-box-2">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="summary-image">
                    <img
                      src={`https://ezmuscles.s3-ap-southeast-2.amazonaws.com/${this.state.productImageURL}`}
                      
                      style={{
                        height: "70%",
                        width: "70%",
                        pointerEvents: "none"
                      }}
                    />
                  </div>
                  <p style={{ fontSize: "10pt" }}>{this.state.productName}</p>

                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <b>{this.state.productPrice}</b>
                </div>
              </div>
              <span
                style={{
                  paddingRight: "50px",
                  paddingLeft: "18px",
                  fontSize: "20pt"
                }}
              >
                Total
              </span>
              <span
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "20pt"
                }}
              >
                {this.state.productPrice}
              </span>
            </div>
          </div>
        </div>
      </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      products: state.products,
      
  }
}

export default connect(mapStateToProps, { getProducts, getPurchases, addPurchases })(Purchase);