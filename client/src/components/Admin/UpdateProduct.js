import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { getProducts, updateProduct } from "../../actions/productActions"
import axios from "axios"

export class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            selectedFile: null,
            nameProduct: "",
            price: "",
            category: "",
            descriptions: "",
            quantity: "",
            imageURL: ""
        }
    }
    componentWillMount() {
        const { products } = this.props.products;
        const productIDTarget = this.props.match.params._id
        const productTarget = products.find((product) => {
            return product._id === productIDTarget
        })
        if (productTarget) {
            this.setState({
                nameProduct: productTarget.name,
                price: productTarget.price,
                category: productTarget.category,
                descriptions: productTarget.description,
                quantity: productTarget.quantity,
                imageURL: productTarget.imageURL
            })
        }
    }
    handleFileChange = (e) => {
        var selectedFile = e.target.files[0] ? e.target.files[0] : null
        this.setState({
            selectedFile
        })
    }
    onChange = (e) => {
        var target = e.target
        var value = target.value
        var name = target.name
        this.setState({
            [name]: value
        })
    }
    updateProduct = async (e) => {
        e.preventDefault();
        var currentProductID = this.props.match.params._id
        if (this.state.selectedFile != null) {
            // //create new file
            const fd = new FormData();
            fd.append("image", this.state.selectedFile, this.state.selectedFile.name)
            const res = await axios.post("/api/products/image", fd)
            //create new update product information
            const updatedProduct = {
                name: this.state.nameProduct,
                price: this.state.price,
                category: this.state.category,
                description: this.state.descriptions,
                quantity: this.state.quantity,
                filename: res.data.filename,
                originalname: res.data.originalname
            }
            this.props.updateProduct(currentProductID, updatedProduct).
                then(result => {
                    if (result) {
                        window.alert("Add new product successfully!!!")
                        this.setState({
                            isRedirect: true
                        })
                    }
                })
        } else {
            //create new update product information
            const updatedProduct = {
                name: this.state.nameProduct,
                price: this.state.price,
                category: this.state.category,
                description: this.state.descriptions,
                quantity: this.state.quantity,
                imageURL: this.state.imageURL
            }
            this.props.updateProduct(currentProductID, updatedProduct).
                then(result => {
                    if (result) {
                        window.alert("Add new product successfully!!!")
                        this.setState({
                            isRedirect: true
                        })
                    }
                })
        }

    }
    onClose = () => {
        this.setState({
            isRedirect: true
        })
    }
    render() {
        if (this.state.isRedirect) {
            return <Redirect to="/admin" />
        } else {
            return (
                <div>
                    <div className="modal-body">
                        <form onSubmit={this.updateProduct}>
                            <div className="form-group">
                                <label >Name Product</label>
                                <input
                                    name="nameProduct"
                                    value={this.state.nameProduct}
                                    onChange={this.onChange}
                                    type="text" className="form-control" placeholder="Name Product" />
                            </div>
                            <div className="form-group">
                                <label >Price</label>
                                <input
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.onChange}
                                    type="number" className="form-control" placeholder="Price" />
                            </div>
                            <div className="form-group">
                                <div>
                                    <label >Category</label>
                                    <select
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.onChange}
                                        className="form-control">
                                        <option value="" className="text-muted">Choose your category...</option>
                                        <option value="Whey">Whey</option>
                                        <option value="Re-Workout">Re-Workout</option>
                                        <option value="In-Wokrout">In-Wokrout</option>
                                        <option value="BCAA">BCAA</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Descriptions</label>
                                <input
                                    name="descriptions"
                                    value={this.state.descriptions}
                                    onChange={this.onChange}
                                    type="text" className="form-control" placeholder="Descriptions" />
                            </div>
                            <div className="form-group">
                                <label >Quantity</label>
                                <input
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChange}
                                    type="number" className="form-control" placeholder="Quantity" />
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="exampleFormControlFile1">Upload Your Image</label>
                                    <input
                                        name="file"
                                        id="yourimage"
                                        onChange={this.handleFileChange}
                                        placeholder="Upload your image!!!"
                                        type="file"
                                        className="form-control-file"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">Update</button>
                            <button
                                onClick={this.onClose}
                                type="button"
                                className="btn btn-warning" >Close</button>
                        </form>
                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { getProducts, updateProduct })(UpdateProduct);
