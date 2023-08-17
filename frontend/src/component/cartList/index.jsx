import React from 'react'

export default function CartList({ item,handleRemove,removeItem }) {
  const {id,image,title,swatchColor,swatchTitle,price,estimatedDeliveryDate}=item
  if(removeItem)return 
  return (
    <div className='cart' key={id}>
      <div className='cart-left'>
        <img src={image} className="cart-item-image" />
        <div>
          <span className='cart-item-title'>{title}</span>
          <div className='cart-swatch'>
            <div style={{backgroundColor:`${swatchColor}`}} className="cart-item-swatch"></div>
            <div>{swatchTitle}</div>
          </div>
        </div>
      </div>
      <div className='cart-right'>
        <div>${price}</div>
        <div>Estimated Delivery Date: {estimatedDeliveryDate}</div>
        <a onClick={(e)=>handleRemove(id)}>Remove</a>
      </div>
    </div>
  )
}
