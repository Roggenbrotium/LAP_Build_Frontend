import './App.css';
import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Main from 'components/Main';
import ProductList from 'components/ProductList'
import Product from 'components/Product';
import { useParams } from 'react-router-dom';
import Login from 'components/Login';
import Registration from 'components/Registration';

class App extends React.Component {
  render () {
    const ProductWrapper = (props) => {
      //for values that are part of the url
      const params = useParams();
      //for passing prop values
      const data = useLocation();
      //method for navigating to other sites
      const navigator = useNavigate();
      return <Product {...{...props, match: {params}, location: {data}, navigate: {navigator} } } />
    }

    const MainWrapper = (props) => {
      //method for navigating to other sites
      const navigator = useNavigate();
      return <Main {...{...props, navigate: {navigator} } } />
    }

    const ProductListWrapper = (props) => {
      //method for navigating to other sites
      const navigator = useNavigate();
      return <ProductList {...{...props, navigate: {navigator} } } />
    }

    const LoginWrapper = (props) => {
      //method for navigating to other sites
      const navigator = useNavigate();
      return <Login {...{...props, navigate: {navigator} } } />
    }

    const RegistationWrapper = (props) => {
      //method for navigating to other sites
      const navigator = useNavigate();
      return <Registration {...{...props, navigate: {navigator} } } />
    }


    return (
      <Routes>
        <Route path='/' element={<MainWrapper />}/>
        <Route path='products' element={<ProductListWrapper />} />
        <Route path='product/:id' element={<ProductWrapper />} />
        <Route path='login' element={<LoginWrapper />} />
        <Route path='registration' element={<RegistationWrapper />} />
      </Routes>
    );
  }
}

export default App;
