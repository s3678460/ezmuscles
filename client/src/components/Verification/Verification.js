import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import { verifyUser } from '../../actions/authAction';

import './Verification.css';


class Verification extends Component {
    constructor(){
        super();
        this.state={
            secretToken:'',
            errors: {}
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

    }
    
    onSubmit(e){
        e.preventDefault();
    
        const secretToken = {
           secretToken: this.state.secretToken
        }
    
        this.props.verifyUser(secretToken,this.props.history);
    }

    render() {

        const {errors} = this.state;

        return (
            <div>

            <div className="container">
              <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card card-signin my-5">
                    <div className="card-body">
                      <h5 className="card-title text-center">Verification</h5>
                      <form className="form-signin" onSubmit={this.onSubmit}>
                        <div className="form-label-group">
                          <input type="text" 
                           
                          className={classnames('form-control', {
                            'is-invalid': errors.secretToken
                        })}  
                          placeholder="Confirmation Code"
                          name="secretToken" 
                          value={this.state.secretToken}
                          onChange={this.onChange}
                          />
                          {errors.secretToken && (<div className="invalid-feedback">{errors.secretToken}</div>)}
                        </div>
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Submit</button>
                       
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

Verification.propTypes = {
    verifyUser: PropsTypes.func.isRequired,
    errors: PropsTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
  })
  

export default connect(mapStateToProps,{verifyUser})(Verification);