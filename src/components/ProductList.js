import React from 'react';
import Navbar from './Navbar';
import getProducts from 'fetch/getProducts';
import { Link } from 'react-router-dom';

import 'css/Global.css'
import 'css/List.css'

class ListElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Link to={`/product/${this.props.data.id}`} state={{ movie: 'test' }}>
        <div className='list_element'>
          <div className='product_image_container'>
            <img className='product_image' src={require("../" + this.props.data.imagePath)} alt='product'/>
          </div>
          <div className='name_container'>
            <p className='title_text'>{this.props.data.name}</p>
          </div>
          <div className='price_container'>
            <p className='description'>{parseFloat(this.props.data.price).toFixed(2)}€</p>
          </div>
        </div>
      </Link>
    );
  }
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    getProducts().then(response => {
      //setState rerenders the component
      this.setState({products: response}, () => {
        console.warn(this.state.products);
      });
    })
  }

  render () {
    return (
      <div className='productList'>
        <Navbar navigate={this.props.navigate}/>
        <div className='main_container'>
          <h1 className="title">Product List</h1>
          {this.state.products.map((product) => <ListElement key={product.id} data={product} />)}
        </div>
      </div>
    );
  }
}

export default ProductList;
