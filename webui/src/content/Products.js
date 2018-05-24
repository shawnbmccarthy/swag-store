import React, {Component} from 'react';

export class ProductsPage extends Component {
    constructor(props){
        super(props);

        this.state = props;

        this.getProducts = this.getProducts.bind(this);
    }

    getProducts(){
        /*
         * TODO: need to fix this!
         */
        this.state.products.find({category: this.state.category}).execute().then(docs => {
            let html = docs.map(d => '<div>' + d.name + '</div>').join('');
            console.log(html);
        });
    }

    render(){
        this.getProducts();
        return(
            <div><h2>{this.state.category}</h2></div>
        );
    }
}