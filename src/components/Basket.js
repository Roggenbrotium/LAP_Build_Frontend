import React from 'react';
import Navbar from './Navbar';

import 'css/Global.css'
import 'css/List.css'
import listBasket from 'fetch/listBasket';
import getManyProducts from 'fetch/getManyProducts';
import remove from 'assets/remove.png';
import removeProduct from 'fetch/removeProduct';
import getCurrentUser from 'fetch/getCurrentUser';
import startOrder from 'fetch/startOrder';
import { PaymentMethod } from 'constants/enums';

class ListElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="list_element">
        <div className="amount_container">
            <p className="description">x{this.props.data.amount}</p>
        </div>
        <div className='product_image_container'>
          <img className='product_image' src={require("../" + this.props.data.imagePath)} alt='product'/>
        </div>
        <div className='name_container'>
          <p className='title_text'>{this.props.data.name}</p>
        </div>
        <div className="price_details_container">
          <div className='price_container'>
            <p className='description'>{parseFloat(this.props.data.price).toFixed(2)}€</p>
          </div>
          <div className="remove_container">
            <img className="remove" src={remove} alt="remove" onClick={this.props.remove}/>
          </div>
        </div>
      </div>
    );
  }
}

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.toCheckout = this.toCheckout.bind(this);

    this.state = {
      products: [],
      totalPrice: 0.00,
      email: '',
      telephone:'' ,
      billingAddress: '',
      deliveryAddress: '',
      bill: false,
      creditCard: false,
      error: false
    };
  }

  removeFromBasket(id) {
    removeProduct(id).then(() => {
      this.setState({products: this.state.products.filter(function(product) { 
        if (product.id != id) {
          return product;
        }
      })});
    }).catch(() => {
      let currentBasket = window.sessionStorage.getItem("basket");
      currentBasket = JSON.parse(currentBasket);
      currentBasket = currentBasket["basket"];
      for( var i = 0; i < currentBasket.length; i++){ 
        if (currentBasket[i].id == id) {
          console.warn(currentBasket);
          currentBasket.splice(i, id);
          window.sessionStorage.setItem("basket", JSON.stringify(
              {basket: currentBasket})
          );

          this.setState({products: this.state.products.filter(function(product) { 
            if (product.id != id) {
              return product;
            }
          })});
        }
      }
    })
  }

  toCheckout() {
    if (this.state.email == '' || this.state.telephone == '' || this.state.billingAddress == '' || this.state.deliveryAddress == '') {
      this.setState({error: true});
      return;
    }

    if (!this.state.bill && !this.state.creditCard) {
      this.setState({error: true});
      return;
    }

    let currentBasket = [];
    if (window.sessionStorage.getItem("basket") != null) {
      currentBasket = window.sessionStorage.getItem("basket");
      currentBasket = JSON.parse(currentBasket);
      currentBasket = currentBasket["basket"];
    }

    startOrder(this.state.email, this.state.telephone, this.state.billingAddress, this.state.deliveryAddress,
      this.state.bill && PaymentMethod.BILL || this.state.creditCard && PaymentMethod.CREDIT_CARD, currentBasket).then(() => {
        window.sessionStorage.setItem("basket", JSON.stringify({basket: []}));
        this.props.navigate.navigator("/");
    })
  }

  componentDidMount() {
    listBasket().then(response => {
      let totalPrice = 0;

      response.forEach(product => {
        totalPrice = (parseFloat(totalPrice) + parseFloat(product.price) * parseInt(product.amount)).toFixed(2);
      });

      getCurrentUser().then(user => {
        //setState rerenders the component
        this.setState({products: response, totalPrice: totalPrice, email: (user.email != null) ? user.email : '', telephone: (user.telephone != null) ? user.telephone : '',
          billingAddress: (user.billingAddress != null) ? user.billingAddress : '', deliveryAddress: (user.deliveryAddress != null) ? user.deliveryAddress : ''});
      });
    }).catch(() => {
      let currentBasket = [];
      if (window.sessionStorage.getItem("basket") != null) {
        currentBasket = window.sessionStorage.getItem("basket");
        currentBasket = JSON.parse(currentBasket);
        currentBasket = currentBasket["basket"];
      }

      let productIds = [];

      currentBasket.forEach(element => {
        productIds.push(element.id);
      });

      let totalPrice = 0;

      getManyProducts(productIds).then(response => {
        response.forEach(product => {
          currentBasket.forEach(element => {
            if (product.id == element.id) {
              product.amount = element.amount;
              totalPrice = (parseFloat(totalPrice) + parseFloat(product.price) * parseInt(element.amount)).toFixed(2);
            }
          });
        });

        this.setState({products: response, totalPrice: totalPrice});
      });
    })
  }

  render () {
    return (
      <div className='productList'>
        <Navbar navigate={this.props.navigate}/>
        <div className='main_container'>
          <h1 className="title">Your basket</h1>
          <div id="list" className="list list_closer">
            {this.state.products.map((product) => <ListElement key={product.id} data={product} remove={() => this.removeFromBasket(product.id)} />)}
          </div>

          <div className="default_container" style={{'alignItems': 'flex-end'}}>
              <p htmlFor="billing_address" className="title_text" id="total_sum">Total: {this.state.totalPrice}€</p>
          </div>

          <div id="info_fields" className="top_input_container">
            <div className="input_container">
                <label htmlFor="email_address" className="description input_text">Email address*</label>
                <input id="email_address" type="text" className="input_field" value={this.state.email} onChange={evt => {this.setState({email: evt.target.value})}}/>
            </div>  
            <div className="input_container">
                <label htmlFor="telephone_number" className="description input_text">Telephone number*</label>
                <input id="telephone_number" type="number" className="input_field" value={this.state.telephone} onChange={evt => {this.setState({telephone: evt.target.value})}}/>
            </div> 
            <div className="input_container">
                <label htmlFor="billing_address" className="description input_text">Billing address*</label>
                <input id="billing_address" type="text" className="input_field" value={this.state.billingAddress} onChange={evt => {this.setState({billingAddress: evt.target.value})}}/>
            </div>
            <div className="input_container">
                <label htmlFor="delivery_address" className="description input_text">Delivery address*</label>
                <input id="delivery_address" type="text" className="input_field" value={this.state.deliveryAddress} onChange={evt => {this.setState({deliveryAddress: evt.target.value})}}/>
            </div> 
            <div className="input_container"> 
                <p className="description radio_title">Please select your payment method*:</p>
            </div>
            <div className="input_container">
                <input id="bill" type="radio" className="radio_button" name="payment_method" checked={this.state.bill} onChange={evt => {this.setState({bill: evt.target.checked, creditCard: false})}}/>
                <label htmlFor="bill" className="description input_text">Bill</label>
                <input id="credit_card" type="radio" className="radio_button" name="payment_method" checked={this.state.creditCard} onChange={evt => {this.setState({creditCard: evt.target.checked, bill: false})}}/>
                <label htmlFor="credit_card" className="description input_text">Credit card</label>
            </div> 
            { this.state.error &&
              <div className='default_container'>
                <p className='description error'>All required fields need to be filled out</p>
              </div>
            }
            <div className="input_container">
                <input type="button" className="simple_button" value="To checkout" onClick={this.toCheckout}/>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default Basket;
