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
        this.setState(
            () =>{return { products : tempProduct, cart : [...this.state.cart, product]}},
            () =>{ this.sumOfTotals();}
            );
    }
    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState(
            () =>{return { modalProducts : product, modalOpen : true }}
        );
    }
    closeModal = () =>{
        this.setState({ modalOpen : false });
    }
    handleIncreament = (id) =>{
        let tempCart = [...this.state.cart];
        const foundCart = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(foundCart);
        const foundProduct = tempCart[index];
        foundProduct.count += 1;
        foundProduct.total = foundProduct.count * foundProduct.price;
        this.setState(
            () =>{
                return{ cart : [...tempCart]};
            },
            () =>{
                this.sumOfTotals();
            }
        );
    }
    handleDecreament = (id) =>{
        let tempCart = [...this.state.cart];
        const foundCart = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(foundCart);
        const onlyProduct = tempCart[index];
        onlyProduct.count = onlyProduct.count - 1;
        if( onlyProduct.count === 0 ){
            this.removeItem(id);
        }
        else{
            onlyProduct.total = onlyProduct.count * onlyProduct.price;
            this.setState(
                () =>{
                    return{ cart : [...tempCart]};
                },
                () =>{
                    this.sumOfTotals();
                }
            );
        }
    }
    removeItem = (id) =>{
        let tempCart = [...this.state.cart];
        let tempProduct = [...this.state.products];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProduct.indexOf(this.getItem(id));
        let removedProduct = tempProduct[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(
            () =>{
                return{ cart : [...tempCart], products : [...tempProduct]};
            },
            () =>{
                this.sumOfTotals();
            }
        );
    }
    clearCart = () =>{
        this.setState(() => {
            return { cart : []}},
            () =>{
                this.setProducts();
                this.sumOfTotals();
            })
    }
    sumOfTotals = () =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tax = subTotal * 0.1;
        const tempTax = parseFloat(tax.toFixed(2));
        const total = subTotal + tax;
        this.setState({ cartSubTotal : subTotal, cartTax : tempTax, cartTotal : total})
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
