import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
//after paste code and remove store object before dispatch methods, we import axios library here.
import axios from 'axios'
import thunk from 'redux-thunk'

//i want to move my api call into the redux. what we need to send to store.dispatchmethod. 
//what is the purpose of store.dispatchmethod?
//to send the action so, means it can only receive action object. 
//store.dispatch expects we to send them  a action object only. 
//action creators simply return action object. and sending to the store.dispatch.
//store.dispatch() can only receive action object only. so,     dispatch(getProductStarted()) will
//receive action object only. so,getProductStarted() function returns action object. this  but in our case, 
//i want to do multiple actions so i have to create a function that is called thunk action. but i want to send
//the function as an action to the store.dispatch. so, when we send the function as an action
//to store.dispatch, immediately store says, hey, i donot know what you are sending me.
//i am expecting a action object. but you are sending me a function. i do not understand. 
//sorry, i can not handle this. //so, in that case when you are handling install redux-thunk
//and apply middleweare is a pipeline. redux-thunk look at every action , hey, is it object, ok, lets
//redux take care of directly. hey , if it is a function, oh, let me(redux-thunk) handle it.
//someone is looking to handle a multiple actions as a one single action. basically,
//whenever it says that it is function, let me handle it. it's mine. not store handle it internally.
//now, redux-thunk takes the function and accordingly, send the actions. it will do necessary dispatches
//before call the api, it will dispatch after api success, it will dispatch after api failure. 
//for that we need to pass Async action(redux-thunk action).
//redux-thunk is watching the actions coming and it will receive the oh, this is the function
// let me handle it. 
//redux-thunk filter out every action that is coming to the store. it will
//handle the function actions. asyn actions themself. it handles the delay in between the api calls.

//Actions
//2 actions here
//addtocart
//removefromcart
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_PRODUCTS_STARTED = 'GET_PRODUCTS_STARTED'
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'

//ACTION CREATORS
export const addToCart = (item) => {
    //this will be function and that will take the item as input and it will create a action object.
    //return action object. 
    return {
        type: ADD_TO_CART,
        item
    }
}

export const removeFromCart = (item) => {
    return {
        type: REMOVE_FROM_CART,
        item
    }
}

export const getProductsStarted = (error) => {
    return {
        //should return action object
        type: GET_PRODUCTS_STARTED
    }
}


export const getProductsSuccess = (items) => {
    //here i am going to send along with action from api.
    return {
        type: GET_PRODUCTS_SUCCESS,
        items
    }
}


export const getProductsFailed = (error) => {
    //here i am going to send along with action from api.
    return {
        type: GET_PRODUCTS_FAILED,
        error
        //we send the this error to redux this time.
    }
}

//Async action//Redux-thunk action
// export const getProducts = () => {
export function getProducts() {//here also this and above syntax are same.
    // return function(dispatch){
    return (dispatch) => {//this return,above return same. just replace with => instead of function keyword.
        console.log(getProductsStarted())
        //here define a thunk action. it is a function. it takes dispatch as argument, we can take anyname as argument.
        //this getProducts function is an action creator, actually function but it looks like actioncreator.
        //it must have dispatch as argument. 
        //and paste the code which we wrote in componentDidMount in shop.js here. and remove store in      store.dispatch(getProductStarted()),
        //   store.dispatch(getProductSucess(results.data.response.products)),    store.dispatch(getProductFailed(error))
        //api call started
        dispatch(getProductsStarted())
        // axios.get('http://api.jsoneditoronline.org/v1/docs/572180836c614dadb4b2eccdc3a33cbc/data?jsonp')
        axios.get('https://3fea7e20-7302-4471-916d-a314d7e9eb08.mock.pstmn.io//live-websie')
            //   .then((data) => {
            //         console.log(data);
            //     })
            .then((results) => {
                dispatch(getProductsSuccess(results.data.response.products))
                //api call completed with success.
                //above we send items.
                console.log(results.data.response.products);

                //we can get data as alist of products rray. 
                //later set state.
                // in this case i do not need mention beloe lines
                // this.setState({
                // items: results.data.response.products,
                //but still we can not get data in output.
                //somehow we send to the catalog, does not implement the componentwillreceiveprops.
                //because intially empty array went to the catalog and catalog rendered. 
                //now, new props went to the catalog.catalog does not handle the componentwillreceiveprops.
                //so go to the catalog to handle it. 
                // loading: false
                // })
                //just send to redux, and catalog will get the data from the redux not from the store/shop , shop is not going to send 
                //props to catalog anymore.
                //i want to have a catalog to connect with redux get data is available. 
                //show loading indicator when the data is not receiving data yet. 
                // show the error when it is notified of the error message
                //those kind of experience , we want to give to catalog component. 
                //now we can directly read from redux.
            })
            .catch((err) => {
                //api call completed with error
                dispatch(getProductsFailed(err))
                //here we send error object
                // this.setState({
                //     error: true
                // })
            })
        //above calling series of multiple actions together.then only we can able to achieve this.
        //but when api call started, we dont know when api call is completed with success
        // and completed with failure. because they(calling api,axios.get('url')) takes some time. 
        //but from the redux , we can only dispatch , store.dispatch for one action at a time. i want to click a button and then send these 3 actions to catalog component.
        // for that we use redux-thunk middle wear. // basically when i click a button, i want to load the products. 
        //how can i dispatched as one action?using thunk. thunk is nothing but function.
        // in redux-thunk we can send function as action. we can dispatch function as action. 
        //send this all this code , create thunk action. 
    }
}
var intialState = {
    cartItems: [],
    //i want to store orderTotal sepearte
    orderTotal: 0
}
//Reducer
//this is a pure function that takes state and action.
//the state structure is intialise to empty array.
//use switch based on type.
var shop = (state = intialState, action) => {
    // console.log(action)
    switch (action.type) {
        case ADD_TO_CART:
            // var isItemExists = state.some((cartItem) => {
            //   [[[[[  state itself as a cartItem]]]]]
            //     return cartItem.id == action.item.id
            // })
            var isItemExists = state.cartItems.some((cartItem) => {
                //state is now object so, it has cartItems.
                return cartItem.productid == action.item.productid
            })

            if (isItemExists == true) {
                // action.item.qty++;
                action.item.qty++;
            }
            else {
                action.item.qty = 1;
            }

            return {
                //return new array 
                // ...state,
                // ...state.filter((cartItem) => {
                //     return cartItem.id != action.item.id
                // }),
                //state is now object so, it has cartItems.
                cartItems: [...state.cartItems.filter((cartItem) => {
                    return cartItem.productid != action.item.productid
                }),
                action.item
                    //here adding one plus to the existing state of items.
                ],
                orderTotal: state.cartItems.filter((cartItem) => {
                    return cartItem.productid!= action.item.productid
                }).reduce((total, cartItem) => {
                    return total + cartItem.min_list_price * cartItem.qty
                }, 0)    + action.item.min_list_price* action.item.qty
            }
        //above i want to remove the item that about to be added. calculate rest of them.
        //and plus i am going to added the item with new quantity will be recalculated.
        case REMOVE_FROM_CART:
            //remove the item based on id, so, using filter method. 
            // return state.filter((cartItem) => {
            //     return cartItem.id != action.item.id
            //simply removefromcart doing create new state with one less item. 
            // })
            return {
                cartItems: state.cartItems.filter((cartItem) => {
                    //    state is now object so, it has cartItems.
                    return cartItem.productid != action.item.productid
                    // simply removefromcart doing create new state with one less item. 
                }),
                orderTotal: state.cartItems.filter((cartItem) => {
                    return cartItem.productid != action.item.productid
                }).reduce((total, cartItem) => {
                    return total + cartItem.min_list_price * cartItem.qty
                }, 0)
            }
        //here 0 is intial value. we need to intialise the accumulatoris 0 because it is object.

        default:
            return state;
    }
}


//reducer for api call
//here reducer name is catalog.
var catalog = (state = {
    items: [],
    // i want to store whatever data/items/products from api into these items.
    //and also maintain flag whether loading is complete or not.
    loading: true,
    error: false
}, action) => {

    switch (action.type) {
        case GET_PRODUCTS_STARTED:
            return {
                items: [],
                loading: true,
                error: false
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                items: action.items,
                //action creator semd the items
                loading: false,
                error: false
            }

        case GET_PRODUCTS_FAILED:
            return {
                items: [],
                //action creator semd the items
                loading: false,
                error: true
            }
        default:
            return state;
        //this way redux is going to store items into memory. any components can acces the items/products.
        //how to include this second reducer.we need to combine 2 reducer to get one root reducer. 
        //for that we are going to use another method called combinereducer.so, import combinereducers.

    }
}


var rootReducer = combineReducers({
    shop,
    //key name is shop and value name is shop. 
    catalog
    //here key name and value is catalog.i skipped it because of es6.
})

//store
// export const store = createStore(shop, applyMiddleware(logger, thunk));
export const store = createStore(rootReducer, applyMiddleware(logger, thunk));

//this is the way of combine multiple reducer. when we need multiple reducers? when we have 
//different state structure requirements. 
