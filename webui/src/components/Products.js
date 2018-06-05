import React from 'react'
import { Link } from 'react-router-dom'
import { USDFormatter } from '../helpers'

const ProductDeck = ({ products, handleAddToCart }) => {
  return (
    <div className={'card-deck w-75'}>
      {products.map(product => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        )
      })}
    </div>
  )
}

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div className={'card col-md-4'}>
      <img className={'card-img-top'} src={product.image.large} alt={''} />
      <div className={'card-body'}>
        <h5 className={'card-title'}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h5>
        <p className={'card-text'}>
          <small>{product.overview}</small>
        </p>
      </div>
      <div className="card-footer">
        <p className={'card-text'}>
          <small className={'text-muted'}>
            {USDFormatter.format(product.price)}
          </small>
          <button
            type="button"
            className="float-right btn btn-outline-primary btn-sm"
            onClick={() => {
              handleAddToCart(product.id)
            }}
          >
            <i className={'fa fa-plus'} /> Add to cart
          </button>
        </p>
      </div>
    </div>
  )
}

export { ProductDeck, ProductCard }
