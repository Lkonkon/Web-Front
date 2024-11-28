import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="product-card">
      <img src={product.imagemproduto} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">R${formatPrice(product.precounitariocomercial)}</p>
      <button className="add-to-cart" onClick={() => addToCart(product)}>Adicionar ao carrinho</button>
    </div>
  );
};

export default ProductCard;
