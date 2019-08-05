import React from 'react';
import { connect } from 'react-redux'
import LoginForm from '../components/login_form'
import SignupForm from '../components/signup_form'
import store from '../store'
import SplashDiv from '../components/splash_div'


class AccountContainer extends React.Component {
    state = {
        showSignup: false
      }

    toggleSignup = (e) => {
        e.preventDefault()
        this.setState(prevState => ({
            showSignup: !prevState.showSignup
        }))
    }


    handleSubmit = values => {
        this.state.showSignup === true ? this.props.registerUser(values) : this.props.getUserInfo(values)
        console.log(store.getState())
    }

    render() { 
        return ( 
            <SplashDiv>
                <div className="AccountContainer">
                    {this.state.showSignup ? <SignupForm onSubmit={this.handleSubmit} toggleSignup={this.toggleSignup} /> : <LoginForm onSubmit={this.handleSubmit} toggleLogin={this.toggleSignup}/> }
                </div>
            </SplashDiv>
         );
    }
}



    let mapStateToProps = (state) => {
        return { user: state.user}
    }

export default connect(mapStateToProps)(AccountContainer)