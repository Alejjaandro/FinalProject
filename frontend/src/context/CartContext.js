import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

import axios from '../api/axios.js';
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within an AuthProvider");
    }
    return context;
}

export const CartProvider = ({ children }) => {

    const { user } = useAuth();

    const [productsNumber, setProductsNumber] = useState(0);
    const [cart, setCart] = useState([]);

    // ===== GET USER CART ===== //
    const getCart = async (userId) => {
        // we reset ProductsNumber and CartProducts.
        setProductsNumber(0);
        setCart([]);

        if (user) {
            try {
                // We send a petition to get the cart of the user.
                const res = await axios.get(`/carts/find/${userId}`);
    
                // We update ProductsNumber and CartProducts with the new info.
                setProductsNumber(res.data.products.length);
                setCart(res.data.products);
    
            } catch (error) {
                console.log(error.response.data);
            }
        }
    }

    // ===== ADD TO CART ===== //
    const addToCart = async (userId, product, quantity, color, ram) => {

        // First we chack if user is logged. 
        if (user) {
            try {
                // we send a post with the userId and the product with its features.
                await axios.post(`/carts/${userId}`, {
                    userId: userId,
                    product: product,
                    quantity: quantity || 1,
                    color: color || null,
                    ram: ram || null
                });

                // We update the user cart.
                await getCart(userId);

            } catch (error) {
                console.log(error);
            }

        } else {
            console.log("You need to be logged");
        }
    }

    // ===== REMOVE PRODUCT FROM CART ===== //
    const deleteProduct = async (userId, productId) => {
        try {

            await axios.delete(`/carts/${userId}/${productId}`);
            await getCart(userId);

        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {

    //     try {            
    //         const token = Cookies.get('token');
    //         if (token) {
    
    //             const decodedToken = jwt_decode(token);
    //             getCart(decodedToken._id);
    //         }
    //     } catch (error) {
    //         throw new Error('Token expired');
    //     }
    // }, []);


    // All the components inside AuthContext will be able to access it values.
    return (
        <CartContext.Provider value={{
            productsNumber,
            cart,

            addToCart,
            getCart,
            deleteProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}