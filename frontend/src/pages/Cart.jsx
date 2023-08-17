import React, { useState, useEffect, useCallback } from 'react'
import CartList from "../component/cartList"
import CartFee from "../component/cartFee"

export default function Cart() {
  const [cartItem, setCartItem] = useState([])
  const [postalCode, setPostalCode] = useState("")
  const [postalCodeError, setPostalCodeError] = useState(false)
  const [removeItem, setRemovedItem] = useState({})
  const [loading, setLoading] = useState(false)


  const getCartData = async (postalCode) => {
    const baseUrl = "http://localhost:3000/items"
    const url = postalCode ? baseUrl + `?postalCode=${postalCode}` : baseUrl
    setLoading(true)
    const res = await fetch(url, { method: "POST" })
    const data = await res.json()
    setLoading(false)
    setCartItem(data.data)
  }

  useEffect(() => {
    getCartData()
  }, [])

  const handleRemove = (id) => {
    const filteredData = cartItem.filter((item) => item.id !== id)
    setRemovedItem({ ...removeItem, [id]: true })
    setCartItem(filteredData)
  }

  const getCartFee = useCallback(() => {
    const subTotal = Number(cartItem.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0).toFixed(2))
    const taxes = subTotal * 0.13
    const shipping = 15
    return {
      shipping,
      subTotal,
      taxes,
      total: (subTotal + taxes) + shipping
    }
  }, [cartItem])

  const getEstimatedDelivery = (e) => {
    e.preventDefault()
    if (postalCode.startsWith("v") || postalCode.startsWith("m") || postalCode.startsWith("k")) {
      setPostalCodeError(false)
      getCartData(postalCode)
    }
    else {
      setPostalCodeError(true)
      setPostalCode("")
    }
  }

  const handleChange = (e) => {
    setPostalCode(e.target.value.toLowerCase())
  }

  return (
    <div>
      <h1 className='title'>Your Cart</h1>
      {(cartItem.length === 0 && !loading) && <h1>Cart is empty</h1>}
      {cartItem.length > 0 && <div>
        {cartItem.map((item) => <CartList
          item={item}
          handleRemove={handleRemove}
          key={item.id}
          removeItem={removeItem[item.id]}
        />)}
        <CartFee cartFee={getCartFee()}
          getEstimatedDelivery={getEstimatedDelivery}
          postalCode={postalCode}
          handleChange={handleChange}
          postalCodeError={postalCodeError}
        />
      </div>
      }
    </div>
  )
}

