import React, { Component } from 'react'
// import React, { PureComponent } from 'react'
import Item from './Item'
import { addToCart,getProducts } from './redux_shop'
import { connect } from 'react-redux'


// class Catalog extends Component {
// class Catalog extends PureComponent {
class Catalog extends Component {
    // constructor(props) {
    //     super(props);
        constructor() {
            super();
        this.state = {
            // items: props.items,no more props coming intially. 
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
    // shouldComponentUpdate() {
    //     return false;
    // }

    //now need to add componentdidmount here
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
            //it should be in catalog
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

//here i want to receive the state now from redux.

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
//here no need to state. 
// export default connect(null, mapDispatchToProps)(Catalog);
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

//now here connect function create container, container going to send to the props. 
//so, use componwntwillreceiveprops.