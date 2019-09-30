import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import { loginUser } from '../../actions/authAction';
import './Login.css';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';


class Login extends Component {
  constructor(){
    super();
    this.state= {
        email:'',
        password:'',
        errors: {}
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
}

onSubmit(e){
    e.preventDefault();

    const user = {
        email: this.state.email,
        password: this.state.password
    }

    this.props.loginUser(user);
}

componentDidMount() {
  if (this.props.auth.isAuthenticated) {
    this.props.history.push('/');
  }
}

componentWillReceiveProps(nextProps) {

  if(nextProps.auth.isAuthenticated) {
    this.props.history.push('/');
  }

  if (nextProps.errors) {
    this.setState({errors: nextProps.errors})
  }
}

    render() {
      const {errors} = this.state;

        return (
            <div>

            {/* This snippet uses Font Awesome 5 Free as a dependency. You can download it at fontawesome.io! */}
            <div className="container">
              <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card card-signin my-5">
                    <div className="card-body">
                      <h5 className="card-title text-center">Sign In</h5>
                      <form className="form-signin" onSubmit={this.onSubmit}>
                        <div className="form-label-group">
                          <input type="email" 
                          id="inputEmail" 
                          className={classnames('form-control', {
                            'is-invalid': errors.email
                        })}  
                          placeholder="Email address"
                          name="email" 
                          value={this.state.email}
                          onChange={this.onChange}
                          />
                          {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                          <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                          <input 
                          type="password" 
                          id="inputPassword" 
                          className={classnames('form-control', {
                            'is-invalid': errors.password
                        })} 
                          placeholder="Password" 
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          />
                          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                          <label htmlFor="inputPassword">Password</label>
                        </div>
                        
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                        <hr className="my-4" />
                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2" /> Sign in with Google</button>
                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2" /> Sign in with Facebook</button>
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

Login.propTypes = {
  loginUser: PropsTypes.func.isRequired,
  auth: PropsTypes.object.isRequired,
  errors: PropsTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {  loginUser })(Login);