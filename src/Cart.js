import React, { Component } from 'react'
import Item from './Item'
import { connect } from 'react-redux'
import { removeFromCart } from './redux_shop'


class Cart extends Component {
    constructor() {
        super();

        this.state = {
        
            items: []
        }
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            items: newProps.cartItems
     
        })
    }
    removeFromCart = (item) => {
        console.log(item)
        this.props.removeFromCart(item)
    }

    render() {
        console.log("rendering cart")
        return (
            <React.Fragment>
                <h1>Cart</h1>
                {
                    this.state.items.map((item) => {
                        return <Item key={item.productid} item={item} isCart={true} removeFromCart={this.removeFromCart} />
                    })
                }
            </React.Fragment>

        )
    }
}



var mapStateToProps = (state) => {

    return {
   
        cartItems: state.shop.cartItems
        
    }
}

var mapDispatchToProps = {
 
    removeFromCart
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);


