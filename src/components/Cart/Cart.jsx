import React, { Component } from 'react'
import Title from '../Title'
import CartColumn from './cartColumn'

export default class Cart extends Component {
    render() {
        return (
            <section>
                
                <Title name="your" title="cart"/>
                <CartColumn/>
            </section>
        )
    }
}
