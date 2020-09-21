import React, { Component } from "react";
// import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function requireAuth(WrappedComponent) {

    class Authentication extends Component {

        state = {
            loggedIn: false
        }
        
        componentWillMount() {
           const loggedIn = Boolean(localStorage.getItem('loggedIn'));
           console.log('requireAuth#componentWillMount', loggedIn);
           this.setState({ loggedIn });
        }

        render() {

            if (!this.state.loggedIn) {
                return <Redirect to = "/login" />
            }

            return <WrappedComponent {...this.props }/>
        }
    }

    return Authentication;
}