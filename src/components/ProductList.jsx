import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import { ProductConsumer } from '../contextx'
export default class ProductList extends Component {
 
    render() {
        //console.log(this.state.products)
        return (
            <React.Fragment>
                <div className="py-5 p-5">
                    <div className="contaoner">
                    <Title name="our" title="Products"/>
                        <div className="row">
                            <ProductConsumer>
                                {value => {  
                                    return value.products.map(product =>{
                                        return <Product key={product.id} product={product}/>;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
