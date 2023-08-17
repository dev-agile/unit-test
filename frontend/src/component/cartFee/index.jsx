import React from 'react'

export default function CartFee({ cartFee, getEstimatedDelivery, handleChange, postalCode, postalCodeError }) {
    const { subTotal, taxes, shipping, total } = cartFee
    return (
        <div className='cart-fee'>
            <div>
                <span>Subtotal</span>
                <span>${subTotal}</span>
            </div>
            <div>
                <span>Taxes (estimated)</span>
                <span>${taxes.toFixed(2)}</span>
            </div>
            <div>
                <span>Shipping</span>
                <span>{shipping}</span>
            </div>
            <div>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div>
                <div>
                    <h3>Check estimated delivery</h3>
                    <form onSubmit={getEstimatedDelivery}>

                        <input type="text" placeholder='Postal Code'
                            className='postal-code'
                            required
                            onChange={handleChange}
                            value={postalCode}
                        />
                        <button type="submit">Check estimated delivery</button>
                        {postalCodeError && <div className='not-available'>Delivery Not available on this postal code</div>}
                    </form>

                </div>
            </div>
        </div>
    )
}
