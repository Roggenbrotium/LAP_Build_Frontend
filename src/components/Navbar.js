import React from 'react';
import 'css/Navbar.css';
import logo from 'assets/logo.jpg';
import cart from 'assets/shopping_cart.png';
import profile from 'assets/profile-user.png';
import { Link } from 'react-router-dom';
import getCurrentUser from 'fetch/getCurrentUser';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    //this.moveToUserPage = this.props.moveToUserPage.bind(this);
    this.moveToUserPage = this.moveToUserPage.bind(this);
  }

  moveToUserPage() {
    getCurrentUser().then(() => {
      //TODO navigate to UserDetailsPage
      this.props.navigate.navigator("/login");
    }).catch(() => {
      this.props.navigate.navigator("/login");
    })
  }

  render () {
    return (
      <div className='navbar'>
        <nav className='navbar_container sticky' id='navbar'>
          <Link to='/'>
            <img className='logo' src={logo} alt='logo'/>
          </Link>
          <Link to='/products' className='pinpoint'>
            <p className='pinpoint_text'>Products</p>
          </Link>
          <Link to='/products' className='pinpoint'>
            <p className='pinpoint_text'>Tab</p>
          </Link>
          <Link to='/products' className='pinpoint'>
            <p className='pinpoint_text'>Tab</p>
          </Link>
          <div className='top_basket_container'>
            <img className='navbar_right_image' src={cart} alt='shopping_basket'/>
          </div>
          <div>
            <img className='navbar_right_image' src={profile} alt='profile' onClick={this.moveToUserPage}/>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
