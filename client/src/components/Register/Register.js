import React, { Component } from 'react'
import './Register.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction'

class Register extends Component {
    constructor(){
        super();
        this.state= {
            name:'',
            email:'',
            password:'',
            errors: {}
        };

        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        
        this.props.registerUser(newUser,this.props.history);
    }


    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({errors: nextProps.errors})
      }
    }

    render() {
        const { errors } = this.state;


        return (
            <div>

            {/* This snippet uses Font Awesome 5 Free as a dependency. You can download it at fontawesome.io! */}
            <div className="container">
              <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card card-signin my-5">
                    <div className="card-body">
                      <h5 className="card-title text-center">Register</h5>
                      <form className="form-signin" onSubmit={this.onSubmit}>
                        <div className="form-label-group">
                          <input 
                          type="email" 
                          name="email"
                          id="inputEmail" 
                          className={classnames('form-control', {
                            'is-invalid': errors.email
                        })}  
                          placeholder="Email address" 
                          value={this.state.email}
                          onChange={this.onChange}
                          />
                          {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                          <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                          <input 
                          type="text" 
                          name="name"
                          id="inputUserName" 
                          className={classnames('form-control', {
                              'is-invalid': errors.name
                          })} 
                          placeholder="Username" 
                          value={this.state.name}
                          onChange={this.onChange}
                          />
                          {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                          <label htmlFor="Username">Username</label>
                        </div>

                        <div className="form-label-group">
                          <input 
                          type="password" 
                          name="password"
                          id="inputPassword" 
                          className={classnames('form-control', {
                            'is-invalid': errors.password
                        })} 
                          placeholder="Password" 
                          value={this.state.password}
                          onChange={this.onChange}
                          />
                          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                          <label htmlFor="inputPassword">Password</label>
                        </div>
                       
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                        <hr className="my-4" />
                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2" /> Register with Google</button>
                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2" /> Register with Facebook</button>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  auth: state.auth,
  errors: state.errors

})

export default connect(mapStatetoProps, { registerUser })(withRouter (Register));