import React, { Component } from 'react'
import { connect } from 'react-redux'

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderTotal: props.orderTotal
        }
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            orderTotal: newProps.orderTotal
        })
    }
    render() {
        console.log("rendering checkout")
        return (
            
            <div>
                <h1>Checkout</h1>
                <p>orderTotal:{this.state.orderTotal}</p>
            
            </div>
        )
    }
}


var mapStateToProps = (state) => {
    return {
 
     
        orderTotal: state.shop.orderTotal
      
    }
}


export default connect(mapStateToProps,null)(Checkout);

