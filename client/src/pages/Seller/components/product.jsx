import React from 'react'

export default function Product(props) {
  return (
    <div>
        <img src={props.product.image} alt={props.product.name}/>
        <span>{props.product.name}</span>
        <span>{props.product.price}</span>
    </div>
  )
}
