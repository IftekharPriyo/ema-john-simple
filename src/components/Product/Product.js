import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    // console.log(props.product.key);
    return (
        <div className='product'>
            <div className='img'>
                <img src={img} alt="" />
            </div>
            <div className='name'>
                <h4><Link to={'/product/'+key}>{name}</Link></h4><br />
                <p><small>by : {seller} </small></p><br />
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock. Order soon</small></p>
                { props.showAddToCart && <button onClick={() => props.handleProduct(props.product)} className='main-button'> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>

        </div>
    );
};

export default Product;