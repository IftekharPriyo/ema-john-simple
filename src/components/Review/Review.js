import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart]= useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () =>{
        history.push('/shipment');
    }

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd=> pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={handleRemoveProduct} product ={pd}></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;