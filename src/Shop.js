import React, { Component } from 'react'
import './Shop.css';
import Catalog from './Catalog';
import Cart from './Cart';
import Checkout from './Checkout';
// import axios from 'axios'
// import { store, getProducts } from './redux_shop';
//here getProducts is a fucncton. 

class Shop extends Component {
    // constructor() {

    //     super();
    // }
    // var items = [
    //     {
    //         id: 1,
    //         name: "Shirt",
    //         price: 100
    //     },
    //     {
    //         id: 2,
    //         name: "Pant",
    //         price: 100
    //     },
    //     {
    //         id: 3,
    //         name: "Short",
    //         price: 100
    //     }
    // ]

    //     this.state = {
    //         items: [],
    //         loading: true,
    //         error: false
    //     }
    // }

    // componentDidMount() {
    // //api call started
    // store.dispatch(getProductStarted())
    // axios.get('http://api.jsoneditoronline.org/v1/docs/572180836c614dadb4b2eccdc3a33cbc/data?jsonp')
    //     //   .then((data) => {
    //     //         console.log(data);
    //     //     })
    //     .then((results) => {
    //         store.dispatch(getProductSucess(results.data.response.products))
    //         //api call completed with success.
    //         //above we send items.
    //         console.log(results.data.response.products);

    //         //we can get data as alist of products rray. 
    //         //later set state.
    //         // in this case i do not need mention beloe lines
    //         // this.setState({
    //             // items: results.data.response.products,
    //             //but still we can not get data in output.
    //             //somehow we send to the catalog, does not implement the componentwillreceiveprops.
    //             //because intially empty array went to the catalog and catalog rendered. 
    //             //now, new props went to the catalog.catalog does not handle the componentwillreceiveprops.
    //             //so go to the catalog to handle it. 
    //             // loading: false
    //         // })
    //         //just send to redux, and catalog will get the data from the redux not from the store/shop , shop is not going to send 
    //         //props to catalog anymore.
    //         //i want to have a catalog to connect with redux get data is available. 
    //         //show loading indicator when the data is not receiving data yet. 
    //         // show the error when it is notified of the error message
    //         //those kind of experience , we want to give to catalog component. 
    //         //now we can directly read from redux.
    //     })
    //     .catch((err) => {
    //         //api call completed with error
    //         store.dispatch(getProductFailed(error))
    //         //here we send error object
    //         this.setState({
    //             error: true
    //         })
    //     })
    //     //above calling series of multiple actions together.then only we can able to achieve this.
    //     //but when api call started, we dont know when api call is completed with success
    //     // and completed with failure. because they(calling api,axios.get('url')) takes some time. 
    //     //but from the redux , we can only dispatch , store.dispatch for one action at a time. i want to click a button and then send these 3 actions to catalog component.
    //     // for that we use redux-thunk middle wear. // basically when i click a button, i want to load the products. 
    //     //how can i dispatched as one action?using thunk. thunk is nothing but function.
    //     // in redux-thunk we can send function as action. we can dispatch function as action. 
    //     //send this all this code , create thunk action. 
    // previosely, we are doing here manuallay getting data from api.

    //now we use async action. for that 

    // store.dispatch(getProducts())
    //here getProducts function logic is in redux, means redux_shop.js.now
    //logic is centeralised. at the same time store.dispatch is expecting
    //an action object. but we are sending a function. so, what  i will do is
    //first i remove the middleweare. 
    // }


    render() {
        console.log("rendering shop")


        // if (this.state.loading == true) {
        //     return (<div>Loading...</div>)
        // }

        // if (this.state.error == true) {
        //     return (<div>Failed to load data. please try again.</div>)
        //it should be in catalog
        // }

        return (
            <div>
                <h1> SHOP</h1>
                <div className="row">
                    <div className="column">
                        {/* no more props to catalog.
                            <Catalog items={this.state.items} /> */}
                        <Catalog />
                    </div>
                    <div className="column">
                        {/* <Cart items={this.state.cartItems} /> */}
                        <Cart />
                        <Checkout />
                    </div>
                </div>
            </div>
        )
    }
}
//now catalog should talk to the centerlaised state not to the shop. 

export default Shop;

