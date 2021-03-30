import React, { Component } from 'react'
import Item from './Item'
import { connect } from 'react-redux'
import { removeFromCart } from './redux_shop'


class Cart extends Component {
    constructor() {
        super();

        this.state = {
            // items: props.items
            //Cart is not going to receive items/intial rendering.it should be empty intiall.
            //and no need to send props in constructor,super as intialisation process.
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



//we need to know what is the state for that use mapStateToProps. So use mapStateToPropsfunction.
//the function has state argument. and it returns 
var mapStateToProps = (state) => {
    // return {
    //     cartItems: state
    // }
    return {
        //now state is object. so, it has cartitems.
        // cartItems: state.cartItems
        //here we need to add stste.ourreducer name , because we have 2 reducers so we gave state.shop
        //then only we get the data. 
        cartItems: state.shop.cartItems
        
    }
}

var mapDispatchToProps = {
    //need to imprt removeFromCart.
    //mapDispatchToProps also return in 2 different ways. 
    //i want to receive the above cartItems as a prop name.
    //note--connect function create a container components , that sends me state has a under
    //the name of prop called cartItems. and also connect function create a container components , that sends me 
    //that removeFromCart as a prop function. i can called via this.props.removeFromCart from my current component.
    //so we need to pass those functions/objects into connect function. 
    removeFromCart
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
//connect is herarichal function. this syntax is really currying. currying is a concept of functional
//programming languages. 

