import React from 'react'

const ProductDeck = ({ products }) => {
  return (
    <div className={'card-deck w-75'}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

const ProductCard = ({ name, price, shortDescription }) => {
  return (
    <div className={'card'}>
      <img
        className={'card-img-top'}
        src="/images/products/kids/large.jpg"
        alt={''}
      />
      <div className={'card-body'}>
        <h5 className={'card-title'}>Swag 1</h5>
        <p className={'card-text'}>
          <small>
            This is a longer card with supporting text below as a natural
            lead-in to additional content.
          </small>
        </p>
      </div>
      <div className="card-footer">
        <p className={'card-text'}>
          <small className={'text-muted'}>$3.99</small>
          <button
            type="button"
            className="float-right btn btn-outline-primary btn-sm"
          >
            <i className={'fa fa-plus'} /> Add to cart
          </button>
        </p>
      </div>
    </div>
  )
}

export { ProductDeck, ProductCard }
