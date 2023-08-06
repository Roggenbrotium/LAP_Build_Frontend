import React from 'react';
import Navbar from './Navbar';

import 'css/Global.css'
import 'css/List.css'
import getCurrentUser from 'fetch/getCurrentUser';
import updateUser from 'fetch/updateUser';
import updatePassword from 'fetch/updatePassword';
import { StatusCode } from 'constants/enums';
import logoutUser from 'fetch/logoutUser';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      email: '',
      telephone:'' ,
      billingAddress: '',
      deliveryAddress: '',
      newPassword: '',
      repeatPassword: '',
      oldPassword: '',
      error: ''
    };
  }

  componentDidMount() {
    getCurrentUser().then(user => {
      this.setState({email: (user.email != null) ? user.email : '', telephone: (user.telephone != null) ? user.telephone : '',
      billingAddress: (user.billingAddress != null) ? user.billingAddress : '', deliveryAddress: (user.deliveryAddress != null) ? user.deliveryAddress : ''});
    })
  }

  saveUser() {
    updateUser(this.state.telephone, this.state.billingAddress, this.state.deliveryAddress);
  }

  savePassword() {
    if (this.state.oldPassword == '') {
      this.setState({error: 'Old password cannot be empty'});
      return;
    }

    if (this.state.newPassword == '') {
      this.setState({error: 'New password cannot be empty'});
      return;
    }

    if (this.state.newPassword != this.state.repeatPassword) {
      this.setState({error: 'Passwords don\'t match'});
      return;
    }

    updatePassword(this.state.oldPassword, this.state.newPassword).then(response => {
      if (response.statusCode == StatusCode.ERROR) {
        this.setState({error: response.message});
        return;
      }

      this.setState({error: ''});
    })
  }

  logout() {
    logoutUser().then(() => {
      this.props.navigate.navigator("/");
    })
  }

  render () {
    return (
      <div className='productList'>
        <Navbar navigate={this.props.navigate}/>
        <div className='main_container'>
          <h1 className="title">Your User</h1>

          <div id="info_fields" className="top_input_container">
            <div className="input_container">
              <label htmlFor="email_address" className="description input_text">Email address</label>
              <p id="email_address" className="input_field" style={{marginTop: 0, marginBottom: 0}}>{this.state.email}</p>
            </div>  
            <div className="input_container">
              <label htmlFor="telephone_number" className="description input_text">Telephone number</label>
              <input id="telephone_number" type="number" className="input_field" value={this.state.telephone} onChange={evt => {this.setState({telephone: evt.target.value})}}/>
            </div> 
            <div className="input_container">
              <label htmlFor="billing_address" className="description input_text">Billing address</label>
              <input id="billing_address" type="text" className="input_field" value={this.state.billingAddress} onChange={evt => {this.setState({billingAddress: evt.target.value})}}/>
            </div>
            <div className="input_container">
              <label htmlFor="delivery_address" className="description input_text">Delivery address</label>
              <input id="delivery_address" type="text" className="input_field" value={this.state.deliveryAddress} onChange={evt => {this.setState({deliveryAddress: evt.target.value})}}/>
            </div> 
            <div className="input_container">
              <input type="button" className="simple_button" value="Save" onClick={this.saveUser}/>
            </div> 
          </div>

          <h1 className="title" style={{borderTop: "2px darkgray solid", paddingTop: 20, marginRight: 20}}>Change Password</h1>
          <div id="password_fields" className="top_input_container">
            <div className="input_container">
              <label htmlFor="oldPassword" className="description input_text">Old Password</label>
              <input id="oldPassword" type="password" className="input_field" value={this.state.passwooldPasswordrd} onChange={evt => {this.setState({oldPassword: evt.target.value})}}/>
            </div>
            <div className="input_container">
              <label htmlFor="newPassword" className="description input_text">New Password</label>
              <input id="newPassword" type="password" className="input_field" value={this.state.newPassword} onChange={evt => {this.setState({newPassword: evt.target.value})}}/>
            </div>
            <div className="input_container">
              <label htmlFor="repeatPassword" className="description input_text">Repeat Password</label>
              <input id="repeatPassword" type="password" className="input_field" value={this.state.repeatPassword} onChange={evt => {this.setState({repeatPassword: evt.target.value})}}/>
            </div> 
            { this.state.error != '' &&
              <div className='default_container'>
                <p className='description error'>{this.state.error}</p>
              </div>
            }
            <div className="input_container">
              <input type="button" className="simple_button" value="Save" onClick={this.savePassword}/>
            </div> 
          </div>

          <h1 className="title" style={{borderTop: "2px darkgray solid", paddingTop: 20, marginRight: 20}}>Log Out</h1>
          <div id="logout_field" className="top_input_container">
            <div className="input_container">
              <input type="button" className="simple_button" value="Log Out" onClick={this.logout}/>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default User;
