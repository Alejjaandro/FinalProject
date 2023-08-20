import './styles/Product.css';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '../context/AuthContext.js';
import { useCart } from '../context/CartContext';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Product({ item }) {

  const { user } = useAuth();
  const { addToCart } = useCart();

  const [alertMessage, setAlertMessage] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleShoppingCart = async (e) => {
    e.preventDefault();

    // We stablish a condition where you can only add if you are logged.
    // If not it will display an alert message.
    if (user) {
      await addToCart(user._id, item);

      setAddedMessage(true);
      setTimeout(() => {
        setAddedMessage(false);
      }, 3000);

    } else {

      setAlertMessage(true);
      setTimeout(() => {
        setAlertMessage(false);
      }, 3000);
    }
  }

  return (
    <div className='prod-container'>

      <img className="prod-image" src={item.thumbnail} alt="" />

      <div className="prod-info">

        <button className="prod-icon" onClick={(e) => handleShoppingCart(e)}>
          <ShoppingCartIcon />
        </button>

        <button className="prod-icon">
          <FavoriteBorderIcon />
        </button>

        <Link className="prod-icon" to={`/product/${item._id}`}>
          <SearchIcon />
        </Link>

      </div>

      {/* ALERTS */}
      {addedMessage && (
        <div className="added-alert">Product added {item.title} to Cart</div>
      )}
      {alertMessage && (
        <div className="error-alert">You must be logged.</div>
      )}

    </div>
  )
}