import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import './contact.css';

export class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {submitted: false};
    }

    handleName = (event) => {
        const name = event.target.value;
        this.setState({ name });
        console.log("name changed: " + name);
    }

    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
        console.log("email changed: " + email);
    }

    handlePhone = (event) => {
        const phone = event.target.value;
        this.setState({ phone });
        console.log("phone changed: " + phone);
    }

    handleText = (event) => {
        const text = event.target.value;
        this.setState({ text });
        console.log("text changed: " + text);
    }

    handleSubmit = (event) => {
        // event.preventDefault();
        const data = new FormData(event.target);
        let _self = this;
        // Grab form data
        const name = data.get('name');
        const email = data.get('email');
        const phone = data.get('phone');
        const text = data.get('text');

        console.log(name, email, phone, text);

        // TODO: frontend indication of form success/err
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                text: text
            })
        }).then(function(res) {
            console.log("Success:");
            console.log(res);
            _self.setState({
                submitted: true,
                name: "",
                email: "",
                phone: "",
                text: ""
            });
        }).catch(function(err) {
            console.log("Error:");
            console.log(err);
        })
    }

    handleErrors(err) {
        console.log("Errors:");
        console.log(err);
    }

    render() {
        const { name, email, phone, text, submitted } = this.state;
        return (
            <ValidatorForm
                className="contactForm"
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => this.handleErrors(errors)}
                >
                <TextValidator
                    className="formField"
                    floatingLabelText="Name"
                    onChange={this.handleName}
                    name="name"
                    value={name}
                    validators={['required', 'isString']}
                    errorMessages={['this field is required', 'cannot be a number']}
                />
                <br/>
                <TextValidator
                    className="formField"
                    floatingLabelText="Email"
                    onChange={this.handleEmail}
                    name="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br/>
                <TextValidator
                    className="formField"
                    floatingLabelText="Phone"
                    onChange={this.handlePhone}
                    name="phone"
                    value={phone}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'must be a number']}
                />
                <br/>
                <TextValidator
                    className="formField"
                    floatingLabelText="Message"
                    onChange={this.handleText}
                    name="text"
                    value={text}
                    validators={['required', 'isString']}
                    errorMessages={['this field is required', 'cannot be just numbers']}
                />
                <br/>
                <RaisedButton type="submit" id="contactButton" label={
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    } primary={true} disabled={submitted}/>
            </ValidatorForm>
        )
    }
}

export default Contact;
