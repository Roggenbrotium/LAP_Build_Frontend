import React from 'react';
import 'css/Global.css'
import 'css/Login.css'
import registerUser from 'fetch/registerUser';
import { StatusCode } from 'constants/enums';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);

    this.state = {
      email: '',
      password: '',
      repeatPassword: '',
      telephone: '',
      billingAddress: '',
      deliveryAddress: '',
      error: ''
    };
  }

  register() {
    if (this.state.email == '') {
      this.setState({error: 'Email cannot be empty'});
      return;
    }

    if (this.state.password == '' || this.state.repeatPassword == '') {
      this.setState({error: 'Password cannot be empty'});
      return;
    }

    if (this.state.password != this.state.repeatPassword) {
      this.setState({error: 'Passwords don\'t match'});
      return;
    }

    registerUser(this.state.email, this.state.password, this.state.telephone, this.state.billingAddress, this.state.deliveryAddress).then((response) => {
      if (response.statusCode == StatusCode.ERROR) {
        this.setState({error: response.message});
        return;
      } else {
        this.props.navigate.navigator("/");
      }
    }).catch((e) => {
      if (e != null) {
        console.error(e);
      }
    })
  }

  handleKeypress(evt) {
    //it triggers by pressing the enter key
    if (evt.key === 'Enter') {
      this.login();
    }
  };

  render () {
    return (
      <div className='registration'>
        <div className='main_container'>
          <h1 className='title'>Registration</h1>
          <div className="input_container">
            <label htmlFor="email" className="description input_text">Email*</label>
            <input id="email" type="text" className="input_field" value={this.state.email} onChange={evt => {this.setState({email: evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div>
          <div className="input_container">
            <label htmlFor="telephone" className="description input_text">Telephone</label>
            <input id="telephone" type="text" className="input_field" value={this.state.telephone} onChange={evt => {this.setState({telephone: evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div>
          <div className="input_container">
            <label htmlFor="billingAddress" className="description input_text">Billing Address</label>
            <input id="billingAddress" type="text" className="input_field" value={this.state.billingAddress} onChange={evt => {this.setState({billingAddress: evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div>
          <div className="input_container">
            <label htmlFor="deliveryAddress" className="description input_text">Delivery Address</label>
            <input id="deliveryAddress" type="text" className="input_field" value={this.state.deliveryAddress} onChange={evt => {this.setState({deliveryAddress: evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div>
          <div className="input_container">
            <label htmlFor="password" className="description input_text">Password*</label>
            <input id="password" type="password" className="input_field" value={this.state.password} onChange={evt => {this.setState({password:evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div> 
          <div className="input_container">
            <label htmlFor="repeatPassword" className="description input_text">Repeated Password*</label>
            <input id="repeatPassword" type="password" className="input_field" value={this.state.repeatPassword} onChange={evt => {this.setState({repeatPassword:evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div> 
          { this.state.error != '' &&
          <div className='default_container'>
            <p className='description error'>{this.state.error}</p>
          </div>
          }
          <div className="input_container">
            <input type="button" className="simple_button" value="Register" onClick={this.register}/>
          </div> 
        </div>
      </div>
    );
  }
}

export default Registration;
