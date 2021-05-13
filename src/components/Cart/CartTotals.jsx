import React from 'react'
import { Link } from 'react-router-dom';

export default function CartTotals({value}) {
    const{cartSubTotal, cartTax, cartTotal, clearCart } = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 ml-sm-5 mt-2 ml-md-auto text-capitalize text-right">
                        <Link to="/">
                            <button className="btn btn-outline-danger mb-2 px-5 text-uppercase" type="button" onClick={()=>clearCart()}>
                                clear cart
                            </button>
                        </Link>
                            <h5>
                                <span className="text-title">subtotal :
                                    <strong>$ {cartSubTotal}</strong>
                                </span>
                            </h5>
                            <h5>
                                <span className="text-title">tax :
                                    <strong>$ {cartTax}</strong>
                                </span>
                            </h5>
                            <h5>
                                <span className="text-title">cart total :
                                    <strong>$ {cartTotal}</strong>
                                </span>
                            </h5>  
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
// increase and decrease cart totals according to the number of qty