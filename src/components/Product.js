import React from 'react';
import Navbar from './Navbar';

import 'css/Global.css'
import 'css/ElementDetails.css'
import getProduct from 'fetch/getProduct';
import cart from 'assets/shopping_cart.png';
import addProduct from 'fetch/addProduct';

class Product extends React.Component {
  constructor(props) {
    super(props);
    //this is necessary for the function to be executed in the correct context
    this.addToBasket = this.addToBasket.bind(this);

    this.state = {
      product: null
    };
  }

  componentDidMount() {
    //console.warn(this.props.location.data.state.movie);

    getProduct(this.props.match.params.id).then(response => {
      //setState rerenders the component
      this.setState({product: response}, () => {
        console.warn(this.state.product);
      });
    })
  }

  addToBasket() {
    addProduct(this.state.product.id).then(response => {
      console.warn(response);
    }).catch(() => {
      const id = this.state.product.id;
      var currentBasket = window.sessionStorage.getItem("basket");
      if (currentBasket == null) {
        window.sessionStorage.setItem("basket", JSON.stringify(
          {basket: [{
              "id": id,
              "amount": 1
            }]
          })
        );
      } else {
        var increased = false;
        currentBasket = JSON.parse(currentBasket);
        //if element already exists in basket increase amount
        currentBasket["basket"].forEach(product => {
          if (product["id"] == id) {
            product["amount"]++;
            window.sessionStorage.setItem("basket", JSON.stringify(currentBasket));
            increased = true;
            return;
          }
        });

        //if element doesn't already exists in basket add it to it
        if (!increased) {
          currentBasket["basket"].push({
            "id": id,
            "amount": 1
          });
          window.sessionStorage.setItem("basket", JSON.stringify(currentBasket));
        }
      }
    });
  }

  render () {
    return (
      <div className='product'>
        <Navbar navigate={this.props.navigate}/>
        <div className='main_container'>
          <h1 className="title">Product</h1>
          {this.state.product != null &&
          <div className="product_container">
            <div className='product_image_container'>
              <img className='product_image' src={require("../" + this.state.product.imagePath)} alt='product'/>
            </div>
            <div className="details_container">
              <div className='name_container'>
                  <p className="title_text">{this.state.product.name}</p>
              </div>
              <div className="description_container">
                  <p className="description description_seperator">{this.state.product.description}</p>
                  <p className="description description_seperator">Calories: {this.state.product.calories}</p>
                  <p className="description description_seperator">Sugar: {this.state.product.sugar}g</p>
              </div>
            </div>
            <div className="price_details_container">
              <div className="price_container">
                  <p className="description">{parseFloat(this.state.product.price).toFixed(2)}€</p>
              </div>
              <div className="basket_container">
                  <img className="basket" src={cart} alt="shopping_basket" onClick={this.addToBasket}/>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default Product;
