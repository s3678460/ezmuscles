import React, { Component } from 'react'
import { connect } from "react-redux"
import { getProducts } from "../../actions/productActions"
import { Link } from "react-router-dom"

export class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchByKey: ""
        }
    }
    componentDidMount() {
        this.props.getProducts()
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    closeSearch = (e) => {
        this.setState({ searchByKey: "" })
    }
    render() {
        var { products } = this.props.products
        //check search by key
        products = products.filter((product) => {
            return product.name.toLowerCase().indexOf(this.state.searchByKey.toLowerCase()) !== -1
        })
        //render list products
        var listProducts = products.map((product, index) => {
            return <div key={index} className="row pt-4">
                <div className="col-12 hoverable" style={{ backgroundColor: "white" }}>
                    <div className="row">
                        <div className="col-6">
                            <div style={{ padding: "12px 12px 12px 0px" }}>
                                <img style={{ maxHeight: "100%", maxWidth: "100%" }}
                                    src={`https://ezmuscles.s3-ap-southeast-2.amazonaws.com/${product.imageURL}`}
                                    className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div style={{ paddingTop: "12px" }}>
                                <h2 className="h2-responsive">{product.name}</h2>
                                <dl className="row">
                                    <dt className="col-sm-3">Price</dt>
                                    <dd className="col-sm-9">{product.price}$</dd>
                                    <dt className="col-sm-3">Category</dt>
                                    <dd className="col-sm-9">{product.category}</dd>
                                    <dt className="col-sm-3">Quantity</dt>
                                    <dd className="col-sm-9">{product.quantity}</dd>
                                    <dt className="col-sm-3">Description</dt>
                                    <dd className="col-sm-9">{product.description}</dd>
                                </dl>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Link
                                            className="btn btn-success"
                                        // to={`/buy/${product._id}`}
                                        >Buy</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
        return (
            <div className="pt-5">
                <div className="container">
                    <div>
                        <button
                            onClick={this.closeSearch}
                            className="btn btn-primary"
                            type="button" data-toggle="collapse"
                            data-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample">
                            Search
                    </button>
                    </div>
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body">
                            <input
                                value={this.state.searchByKey}
                                name="searchByKey"
                                onChange={this.onChange}
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search by name"
                                aria-label="Search"
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    {listProducts}
                </div>
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
export default connect(mapStateToProps, { getProducts })(ProductPage);
