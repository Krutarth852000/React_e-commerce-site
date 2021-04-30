import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';
const ProductContext = React.createContext();

export default class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [], 
        modalOpen: false,
        modalProducts: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () =>{
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() =>{
            return{ products : tempProducts}});
    }
    getItem = (id) =>{
        const products = this.state.products.find(item => item.id === id);
        return products;
    }
    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState({ detailProduct : product });
    }
    handleCart = (id) =>{
        const tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState({ products : tempProduct, cart : [...this.state.cart, product]});
    }
    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState({ modalProducts : product, modalOpen : true });
    }
    closeModal = () =>{
        this.setState({ modalOpen : false });
    }
    handleIncreament = () =>{
        console.log("increment");
    }
    handleDecreament = () =>{
        console.log("decreament");
    }
    removeItem = () =>{
        console.log("removed");
    }
    clearCart = () =>{
        console.log("cart clear");
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                handleCart: this.handleCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                handleIncreament: this.handleIncreament,
                handleDecreament: this.handleDecreament,
                removeItem: this.removeItem,
                clearCart: this.clearCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;
export {ProductProvider, ProductConsumer};
