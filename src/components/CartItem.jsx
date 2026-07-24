function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="d-flex align-items-center py-3 border-bottom">
      <img 
        src={item.image} 
        alt={item.name} 
        className="me-3" 
        style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
      />
      <div className="flex-grow-1">
        <h6 className="mb-0">{item.name}</h6>
        <small className="text-muted">${item.price}</small>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button 
          className="btn btn-sm btn-outline-dark" 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <i className="bi bi-dash"></i>
        </button>
        <span className="fw-bold">{item.quantity}</span>
        <button 
          className="btn btn-sm btn-outline-dark" 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <i className="bi bi-plus"></i>
        </button>
        <button 
          className="btn btn-sm btn-outline-danger ms-2" 
          onClick={() => removeFromCart(item.id)}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  );
}

export default CartItem;