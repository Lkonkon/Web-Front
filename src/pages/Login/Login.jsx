import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import '/src/Components/text-animation/style.css';
import { changeTextLetter } from '../../Components/text-animation/main';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = 'http://localhost:3000';
  const navigate = useNavigate();

  useEffect(() => {
    const animTexts = document.querySelectorAll('.animated-text');

    animTexts.forEach((element) => {
      element.addEventListener('mouseover', changeTextLetter);
    });

    return () => {
      animTexts.forEach((element) => {
        element.removeEventListener('mouseover', changeTextLetter);
      });
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      // Armazena o token e as infos do usuário no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Redireciona pro marketplace
      navigate('/marketplace');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <h1 className="animated-text" data-text-value="Seja bem vindo">
              Seja bem vindo
            </h1>
          </div>
          <h1>Faça seu login<br /></h1>
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="/forgot-password">Esqueceu a senha?</a>
          </div>
          <button type="submit" className="enter-button">Entrar</button>
          <div className="signup-link">
            <p>
              Não tem uma conta? <a href="/register">Registrar</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
