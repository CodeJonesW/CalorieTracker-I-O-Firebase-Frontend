import React from "react";
// import { Redirect } from 'react-router-dom'
import { Form, FormInput, FormGroup } from "shards-react";

export default class SignUpForm extends React.Component {

    handleSignUp = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
    }


    render() {
        return (
            // needs to be refactored for signup
            <Form onSubmit={(e) => this.handleSignUp(e)}>
            <FormGroup >
                <label htmlFor="#email">Email</label>
                <FormInput name="email" id="#email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput name="password" type="password" id="#password" placeholder="Password" />
            </FormGroup>
            <button className="btn-primary" type="submit">Submit</button>
            </Form>
        );
    }

}