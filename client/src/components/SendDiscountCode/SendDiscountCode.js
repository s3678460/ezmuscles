import React, { Component } from 'react'
import './SendDiscountCode.css';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import { sendSMS } from '../../actions/authAction';


class SendDiscountCode extends Component {
    constructor(){
        super();
        this.state={
            phoneNumber:''
        }

        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
    
        const phoneNumber = {
          phoneNumber: this.state.phoneNumber
       }
       
        this.props.sendSMS(phoneNumber,this.props.history);
    }
    

    render() {
        return (
            <div>

            <div className="container">
              <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card card-signin my-5">
                    <div className="card-body">
                      <h5 className="card-title text-center">Send Discount Code</h5>
                      <form className="form-signin" onSubmit={this.onSubmit}>
                        <div className="form-label-group">
                          <input type="text" 
                          id="inputEmail" 
                          className="form-control"
                          placeholder="Phone Number (+61)"
                          name="phoneNumber" 
                          value={this.state.phoneNumber}
                          onChange={this.onChange}
                          />
                        </div>

                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Send vis SMS</button>
                        <hr className="my-4" />
                       
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

SendDiscountCode.propTypes = {
    sendSMS:PropsTypes.func.isRequired,
    auth:PropsTypes.object.isRequired
  }
  
  const mapStatetoProps = (state) => ({
    auth: state.auth,
  
  })

export default connect(mapStatetoProps,{sendSMS}) (SendDiscountCode);