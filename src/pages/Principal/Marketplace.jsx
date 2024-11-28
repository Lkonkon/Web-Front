import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './Marketplace.css';
import ProductCard from '../../Components/ProductCard/ProductCard';
import '../../Components/ProductCard/ProductCard.css';
import '../../Components/SidebarMarketplace.css';
import { useNavigate } from 'react-router-dom';

const categories = [
    'Atari',
    'Playstation 1',
    'Nintendo 64'
];

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [userName, setUserName] = useState('');
    const API_URL = 'http://localhost:3000';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserName(user.name);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        let results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategory && !!products) {
            results = results.filter(product => {
                return product.departamento && product.departamento.toLowerCase() === selectedCategory.toLowerCase()
            });
        }

        if (!!maxPrice) {
            results = results.filter(product => {
                return product.precounitariocomercial <= maxPrice;
            });
        }

        setFilteredProducts(results);
    }, [searchTerm, selectedCategory, maxPrice, products]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory('');
        } else {
            setSelectedCategory(category);
        }
    };

    const updatePriceValue = (value) => {
        setMaxPrice(parseInt(value));
    };

    const addToCart = (product) => {
        const productToAdd = {
            id: product.id,
            name: product.name,
            precounitariocomercial: product.precounitariocomercial,
            image: product.imagemproduto,
        };
        const currentCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const updatedCart = [...currentCart, productToAdd];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        setShowMessage(true);
    };

    const goToCart = () => {
        navigate('/cart', { state: { cart } });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="marketplace">
            <header className="header">
                <div className="logo">Marketplace</div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FaSearch className="icon" />
                </div>
                <div className="user-options">
                    <div className="user-icon-container">
                        {userName && (
                            <span className="user-name">{"Olá, bem vindo " + userName}</span>
                        )}
                    </div>
                    <div className="cart-icon-container" onClick={goToCart}>
                        <FaShoppingCart className="icon" />
                        {showMessage && <p className="info">Item adicionado ao carrinho!</p>}
                    </div>
                    <div className="logout-button-container">
                        {userName && (
                            <button onClick={handleLogout} className="logout-button">Sair</button>
                        )}
                    </div>
                </div>
            </header>
            <div className="main-content">
                <aside className="sidebar">
                    <h2>Categorias</h2>
                    <ul>
                        {categories.map(category => (
                            <li
                                key={category}
                                className={selectedCategory === category ? 'active' : ''}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    <div className="filters">
                        <div className="filter">
                            <label>Preço</label>
                            <input
                                type="range"
                                min="0"
                                max="500"
                                defaultValue={0}
                                onChange={(event) => updatePriceValue(event.target.value)}
                            />
                            <span id="priceValue"> R$ {maxPrice},00</span>
                        </div>
                    </div>
                </aside>
                <div className="products">
                    <h1>Produtos</h1>
                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} addToCart={addToCart} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
