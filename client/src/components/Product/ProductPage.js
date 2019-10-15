import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";

export class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getProducts();
  }

  myIndexFunction({index}){
      return "#exampleModalLong" + index.toString();
  }
  render() {
    var { products } = this.props.products;
    //render list products
    var listProducts = products.map((product, index) => {

        
       
      return (
        <div key={index} className="row pt-4">
          <div
            className="col-12 hoverable"
            style={{ backgroundColor: "white" }}
          >
            <div className="row">
              <div className="col-6">
                <div style={{ padding: "12px 12px 12px 0px" }}>
                  <img
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    src={`https://ezmuscles.s3-ap-southeast-2.amazonaws.com/${product.imageURL}`}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-6">
                <div style={{ paddingTop: "20px" }}>
                  <div className="card" style={{ width: "25rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Price: {product.price}
                      </h6>
                      <h6 className="card-subtitle mb-2 ">
                        Category: {product.category}
                      </h6>
                      <p className="card-text">{product.description}</p>
                      <a href="#" className="card-link">
                        <Link to={`/purchase/${product._id}`}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          
                          
                          
                        >
                          Purchase
                        </button>
                        </Link>
                      </a>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return <div>{listProducts}</div>;
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { getProducts }
)(ProductPage);
