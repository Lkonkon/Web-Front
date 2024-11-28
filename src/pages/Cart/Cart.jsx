import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from '../../utils/generatePDF'; // Ajuste o caminho conforme necessário
import './Cart.css';

const Cart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : (location.state?.cart || []);
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isSavingEnabled, setIsSavingEnabled] = useState(false);
    const [showPaperSelection, setShowPaperSelection] = useState(false);
    useEffect(() => {
        setIsSavingEnabled(paymentMethod !== '' && cart.length > 0);
    }, [paymentMethod, cart]);

    const goBack = () => {
        navigate(-1);
    };

    const removeFromCart = (index) => {
        if (window.confirm('Tem certeza que deseja remover este item do carrinho?')) {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // const handleSave = async () => {
    //     try {
    //         const response = await fetch('/save-sale', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 cart,
    //                 paymentMethod,
    //                 totalPrice,
    //             }),
    //         });
    
    //         // Verifica se a resposta é válida e se não está vazia
    //         const text = await response.text();
    //         const data = text ? JSON.parse(text) : {};
    
    //         if (response.ok) {
    //             alert('Venda salva com sucesso!');
    //             setShowPaperSelection(true); // Mostrar a seleção de impressão
    //             clearCart(); // Limpar o carrinho após salvar a venda
    //         } else {
    //             alert(`Erro: ${data.message || 'Erro desconhecido'}`);
    //         }
    //     } catch (error) {
    //         console.error('Erro ao salvar a venda:', error);
    //         alert('Erro ao salvar a venda');
    //     }
    // };
    const handleSave = () => {
        setShowPaperSelection(true); // Mostrar a seleção de tipo de papel
    };

    const handlePrintSelection = (type) => {
        setShowPaperSelection(false);
        generatePDF(cart, paymentMethod, parseFloat(totalPrice));

        clearCart(); 
    };

    const formatCurrency = (value) => {
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const totalPrice = cart.reduce((sum, product) => {
        const price = parseFloat(product.precounitariocomercial) || 0;
        return sum + price;
    }, 0).toFixed(2);

    return (
        <div className="cart">
            <header className="header">
                <div className="logo">Carrinho</div>
                <div className="header-buttons">
                    <button onClick={goBack}>Voltar</button>
                    <button onClick={clearCart} className="clear-button">Limpar Carrinho</button>
                </div>
            </header>
            <div className="cart-content">
                {cart.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                ) : (
                    <>
                        <ul>
                            {cart.map((product, index) => (
                                <li key={index}>
                                    <img src={product.image} alt={product.name} />
                                    <div>
                                        <h2>{product.name}</h2>
                                        <p>{formatCurrency(product.precounitariocomercial)}</p>
                                        <button onClick={() => removeFromCart(index)}>Remover</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="total">
                            <h2>Total: {formatCurrency(totalPrice)}</h2>
                        </div>

                        <div className="payment-container">
                            <div className="payment-method">
                                <label htmlFor="dinheiro">
                                    <input
                                        id="dinheiro"
                                        type="radio"
                                        value="Dinheiro"
                                        checked={paymentMethod === 'Dinheiro'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Dinheiro
                                </label>
                                <label htmlFor="cartaoDebito">
                                    <input
                                        id="cartaoDebito"
                                        type="radio"
                                        value="Cartão de Débito"
                                        checked={paymentMethod === 'Cartão de Débito'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Cartão de Débito
                                </label>
                                <label htmlFor="pix">
                                    <input
                                        id="pix"
                                        type="radio"
                                        value="Pix"
                                        checked={paymentMethod === 'Pix'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Pix
                                </label>
                                <label htmlFor="boleto">
                                    <input
                                        id="boleto"
                                        type="radio"
                                        value="Boleto Bancário"
                                        checked={paymentMethod === 'Boleto Bancário'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Boleto Bancário
                                </label>
                            </div>
                            <div className="bottom-buttons">
                                <button
                                    onClick={handleSave}
                                    disabled={!isSavingEnabled}
                                    className="save-button"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Se a seleção de papel for ativada, mostra as opções */}
            {showPaperSelection && (
                <div className="paper-selection">
                    <h3>Escolha o tipo de impressão:</h3>
                    <div className="paper-buttons">
                        <button onClick={() => handlePrintSelection('Visualizar')}>Visualizar</button>
                        {/* <button onClick={() => handlePrintSelection('Imprimir')}>Imprimir</button> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
