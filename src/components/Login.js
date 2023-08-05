import React from 'react';
import 'css/Global.css'
import 'css/Login.css'
import loginUser from 'fetch/loginUser';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.moveToRegisterPage = this.moveToRegisterPage.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);

    this.state = {
      email: '',
      password: '',
      error: false
    };
  }

  login() {
    loginUser(this.state.email, this.state.password).then(() => {
      this.props.navigate.navigator("/");
    }).catch((e) => {
      if (e != null) {
        console.error(e);
      }
      this.setState({error: true});
    })
  }

  moveToRegisterPage() {

  }

  handleKeypress(evt) {
    //it triggers by pressing the enter key
    if (evt.key === 'Enter') {
      this.login();
    }
  };

  render () {
    return (
      <div className='login'>
        <div className='main_container'>
          <h1 className='title'>Login</h1>
          <div className="input_container">
            <label htmlFor="email" className="description input_text">Email</label>
            <input id="email" type="text" className="input_field" value={this.state.email} onChange={evt => {this.setState({email: evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div>
          <div className="input_container">
            <label htmlFor="password" className="description input_text">Password</label>
            <input id="password" type="password" className="input_field" value={this.state.password} onChange={evt => {this.setState({password:evt.target.value})}} onKeyDown={this.handleKeypress}/>
          </div> 
          { this.state.error &&
          <div className='default_container'>
            <p className='description error'>Username or Password is wrong</p>
          </div>
          }
          <div className="input_container">
            <input type="button" className="simple_button" value="Login" onClick={this.login}/>
          </div> 
          <div className="input_container">
            <input type="button" style={{marginTop: "unset"}} className="simple_button" value="Register" onClick={this.moveToRegisterPage}/>
          </div> 
        </div>
      </div>
    );
  }
}

export default Login;
