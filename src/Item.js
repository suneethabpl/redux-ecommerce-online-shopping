import React, { Component } from 'react'

// import {
//     Link
// } from 'react-router-dom'

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            isCart: props.isCart
        }
    }
    addItemToCart = () => {
        this.props.addItemToCart(this.state.item)
    }
    removeFromCart = () => {
        this.props.removeFromCart(this.state.item)
    }

    render() {
        console.log("rendering item")
        return (
            <div>
                {/* <h1> <Link to={"/items/"+this.state.item.id}>{this.state.item.name}</Link></h1> */}
                <img src={this.state.item.imageUrl[0]}/>
                {/* <h1>{this.state.item.name}</h1> */}
                <h1>{this.state.item.product_short_description}</h1>
                {/* <p>price: {this.state.item.price}</p> */}
                <p>price: {this.state.item.min_list_price}</p>

                {
                    (this.state.isCart == true) ?
                        (<p>Qty:{this.state.item.qty}</p>) :
                        ("")
                }
                {
                    (this.state.isCart == true) ?
                        (<button onClick={this.removeFromCart}>Remove</button>) :
                        (<button onClick={this.addItemToCart}>Add to Cart</button>)
                }
            </div>
        )
    }
}

export default Item;

