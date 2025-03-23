import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import Button from './Button';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };
  
  return (
    <div className="card product-card">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img"
        />
      </Link>
      
      <div className="product-details">
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        
        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-category">{product.category}</span>
        </div>
        
        <div className="product-actions">
          <Button onClick={handleAddToCart} block>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;