import React, { Component } from 'react'
import { connect } from "react-redux"
import { getProduct, updateProduct } from "../../actions/productActions"

export class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        var productID = this.props.params.match._id;
        this.props.getProduct(productID)
    }
    render() {
        console.log(this.props.products)
        return (
            <div>
                {/* update product {this.props.products.product.name} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { getProduct, updateProduct })(UpdateProduct);
