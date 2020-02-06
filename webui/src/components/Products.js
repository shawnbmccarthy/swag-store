import React from 'react'
import { Link } from 'react-router-dom'
import { USDFormatter } from '../helpers'

const ProductDeck = ({ products, handleAddToCart }) => {
  return (
    <div className={'card-deck'}>
      {products.map((product, i) => {
        let elms = [
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ]
        if ((i + 1) % 2 === 0) {
          elms.push(
            <div
              key={`2-spacer-${i + 1}`}
              className="w-100 d-none d-sm-block d-md-none"
            />
          )
        }
        if ((i + 1) % 3 === 0) {
          elms.push(
            <div
              key={`3-spacer-${i + 1}`}
              className="w-100 d-none d-md-block d-lg-none"
            />
          )
        }
        if ((i + 1) % 4 === 0) {
          elms.push(
            <div
              key={`4-spacer-${i + 1}`}
              className="w-100 d-none d-lg-block d-xl-none"
            />
          )
        }
        if ((i + 1) % 5 === 0) {
          elms.push(
            <div
              key={`5-spacer-${i + 1}`}
              className="w-100 d-none d-xl-block"
            />
          )
        }
        return elms
      })}
    </div>
  )
}

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div className="card mb-4" style={{ maxWidth: '15rem' }}>
      <img
        className="card-img-top img-fluid"
        src={product.image.large}
        alt={product.name}
      />
      <div className="card-body">
        <h4 className="card-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h4>
        <p className={'card-text'}>
          <small>{product.overview}</small>
        </p>
      </div>
      {product.price && (
        <div className="card-footer">
          <p className={'card-text'}>
            <small className={'text-muted'}>
              {USDFormatter.format(product.price)}
            </small>
          </p>
        </div>
      )}
    </div>
  )
}

export { ProductDeck, ProductCard }
