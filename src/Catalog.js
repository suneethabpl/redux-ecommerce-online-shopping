import React, { Component } from 'react'
import Item from './Item'
import { addToCart,getProducts } from './redux_shop'
import { connect } from 'react-redux'



class Catalog extends Component {
  
        constructor() {
            super();
        this.state = {
            items: [],
            loading: true,
            error: false

        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            items: newProps.items,
            loading: newProps.loading,
            error: newProps.error
        })
    }

    addItemToCart = (item) => {
        console.log(item);
        this.props.addToCart(item);
    }
 


    componentDidMount(){
       this.props.getProducts();
    }

    render() {
        console.log("rendering catalog")
        if (this.state.loading == true) {
            return (<div>Loading...</div>)
        }

        if (this.state.error == true) {
            return (<div>Failed to load data. please try again.</div>)
         
        }

        return (
            <React.Fragment>
                <h1>Catalog</h1>
                {
                    this.state.items.map((item) => {
                        return <Item key={item.productid} item={item} addItemToCart={this.addItemToCart} isCart={false} />
                    })
                }

            </React.Fragment>

        )
    }
}



var mapStateToProps = (state) => {
    return {
        items: state.catalog.items,
        loading: state.catalog.loading,
        error: state.catalog.error
    }
}
var mapDispatchToProps = {
    addToCart,
    getProducts,
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

