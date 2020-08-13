import React, { Component } from 'react'
import './Shop.css';
import Catalog from './Catalog';
import Cart from './Cart';
import Checkout from './Checkout';

class Shop extends Component {

    render() {
        console.log("rendering shop")


        return (
            <div>
                <h1> SHOP</h1>
                <div className="row">
                    <div className="column">

                        <Catalog />
                    </div>
                    <div className="column">

                        <Cart />
                        <Checkout />
                    </div>
                </div>
            </div>
        )
    }
}


export default Shop;

