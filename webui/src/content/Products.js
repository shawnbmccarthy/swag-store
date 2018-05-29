import React, {Component} from 'react';


// TODO: Swap out hardcoded image, name, desc, and price and add "Add to cart" handler;
export class SingleProduct extends Component {
  render() {
    const {name, price, shortDescription} = this.props;
    return (
      <div className={'card'}>
        <img className={'card-img-top'} src='/images/products/kids/large.jpg' alt={''}/>
        <div className={'card-body'}>
          <h5 className={'card-title'}>Swag 1</h5>
          <p className={'card-text'}>
            <small>This is a longer card with supporting text below as a natural lead-in to additional
              content.
            </small>
          </p>
        </div>
        <div className="card-footer">
          <p className={'card-text'}>
            <small className={'text-muted'}>$3.99</small>
            <button type="button" className="float-right btn btn-outline-primary btn-sm"><i
              className={'fa fa-plus'}/> Add to cart
            </button>
          </p>
        </div>
      </div>
    )
  }
}

export class ProductDeck extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className={'card-deck w-75'}>
        {children}
      </div>
    )
  }
}


export class ProductsPage extends Component {
  constructor(props) {
    super(props);

    this.state = props;

    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    /*
     * TODO: need to fix this!
     */
    this.state.products.find({category: this.state.category}).execute().then(docs => {
      let html = docs.map(d => '<div>' + d.name + '</div>').join('');
      console.log(html);
    });
  }

  /*
   * TODO: Dynamically generate SingleProduct component for each product in products;
   *       - Max 3 products per row
   *       - All rows should be pushed by expanding menu
   */
  render() {
    this.getProducts();
    return (
      <div>
        <div className=''>
          <div className='row'>
            <h2>{this.state.category}</h2>
          </div>
          <div className='row'>
            <ProductDeck>
              <SingleProduct/>
              <SingleProduct/>
              <SingleProduct/>
            </ProductDeck>
          </div>
        </div>
      </div>
    );
  }
}