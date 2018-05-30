import React from 'react'

const testProduct = {
  image: {
    large: '/images/products/kids/large.jpg',
    thumb: '/images/products/kids/thumb.jpg'
  },
  name: 'Swag 1',
  overview:
    'This is a longer card with supporting text below as a natural lead-in to additional content.',
  price: '3.99'
}

const ProductDeck = ({ products }) => {
  return (
    <div className={'card-deck w-75'}>
      {products.map(product => {
        return <ProductCard key={product.id} {...product} />
      })}
      <ProductCard {...testProduct} />
      <ProductCard {...testProduct} />
      <ProductCard {...testProduct} />
    </div>
  )
}

const ProductCard = props => {
  return (
    <div className={'card'}>
      <img className={'card-img-top'} src={props.image.large} alt={''} />
      <div className={'card-body'}>
        <h5 className={'card-title'}>{props.name}</h5>
        <p className={'card-text'}>
          <small>{props.overview}</small>
        </p>
      </div>
      <div className="card-footer">
        <p className={'card-text'}>
          <small className={'text-muted'}>${props.price}</small>
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
