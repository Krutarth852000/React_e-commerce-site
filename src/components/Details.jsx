import React, { Component } from 'react';
import {ProductConsumer} from '../contextx';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value =>{
                    const {id, title, company, price, info, inCart, img } = value.detailProduct;
                    return(
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/*title ends*/}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <img src={img} className="img-fluid" alt="products"></img>
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>model : {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-3">
                                        made by : <span className="text-uppercase">
                                            {company}
                                        </span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            price : <span>$</span>{price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        detailed info :
                                    </p>
                                    <p className="text-muted lead">{info}</p>
                                    <div>
                                        <Link to="/">
                                            <ButtonContainer>
                                                to products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer
                                        cart
                                        disabled = {inCart? true : false}
                                        onClick = {() =>{
                                            value.handleCart(id);
                                            value.openModal(id);
                                        }}
                                        >
                                            {inCart? "in cart" : "add to cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}
