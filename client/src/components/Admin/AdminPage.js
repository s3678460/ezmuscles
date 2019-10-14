import React, { Component } from 'react'
import { connect } from "react-redux"
import { addProduct, deleteProduct, getProducts } from "../../actions/productActions"
import axios from "axios"
import { Link } from "react-router-dom"
export class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            nameProduct: "",
            price: "",
            category: "",
            descriptions: "",
            quantity: "",
            imageURL: ""
        }
        this.refUpdateProduct = React.createRef();
    }
    componentDidMount() {
        this.props.getProducts()
    }
    onDelete = (id) => {
        console.log(id)
        if (window.confirm('Do you want to delete this selling ?')) {
            this.props.deleteProduct(id)
        }
    }
    addNewProduct = async (e) => {
        e.preventDefault();
        //create new file
        const fd = new FormData();
        fd.append("image", this.state.selectedFile, this.state.selectedFile.name)
        const res = await axios.post("/api/products/image", fd)

        //create new product information
        const newProduct = {
            name: this.state.nameProduct,
            price: this.state.price,
            category: this.state.category,
            description: this.state.descriptions,
            quantity: this.state.quantity,
            filename: res.data.filename,
            originalname: res.data.originalname
        }
        this.props.addProduct(newProduct).
            then(result => {
                if (result) {
                    window.alert("Add new product successfully!!!")
                    //clear State
                    this.clearState()
                }
            })

    }
    clearState = () => {
        this.setState({
            selectedFile: null,
            nameProduct: "",
            price: "",
            category: "",
            descriptions: "",
            quantity: "",
            imageURL: ""
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
    handleFileChange = (e) => {
        var selectedFile = e.target.files[0] ? e.target.files[0] : null
        this.setState({
            selectedFile
        })
    }
    updateProduct = (id) => {
        this.props.getProducts(id)
        var { product } = this.props.products;
        this.refUpdateProduct.current.click()
        this.setState({
            nameProduct: product.name,
            price: product.price,
            category: product.category,
            descriptions: product.description,
            quantity: product.quantity
        })
        console.log(this.state)
    }
    render() {
        var { products } = this.props.products;

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
                                            className="btn btn-outline-primary"
                                            to={`/product/${product._id}`}
                                        >Update</Link>
                                        <button
                                            onClick={() => this.onDelete(product._id)}
                                            className="btn btn-outline-danger"
                                        >Delete
                                    </button>
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
                {/* modal add player */}
                <div className="modal fade" id="addNewProduct" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add New Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.addNewProduct}>
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
                                    <button type="submit" className="btn btn-success">Add</button>
                                    <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal update player */}
                <div className="modal fade" id="updateProduct" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
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
                                    <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#updateProduct"
                    ref={this.refUpdateProduct}
                    style={{ display: "none" }} />


                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <button
                                className="btn btn-outline-success"
                                data-toggle="modal"
                                data-target="#addNewProduct"
                            >Add New Product</button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
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

export default connect(mapStateToProps, { addProduct, deleteProduct, getProducts })(AdminPage);
