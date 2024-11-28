import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Register.css";
import "/src/Components/text-animation/style.css";
import { changeTextLetter } from "../../Components/text-animation/main";
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const API_URL = 'http://localhost:3000';
  useEffect(() => {
    const animTexts = document.querySelectorAll(".animated-text");

    animTexts.forEach((element) => {
      element.addEventListener("mouseover", changeTextLetter);
    });

    return () => {
      animTexts.forEach((element) => {
        element.removeEventListener("mouseover", changeTextLetter);
      });
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não correspondem");
      return;
    }
    const response = await axios.post(`${API_URL}/register`,
      {
        email: email,
        password: password,
        name: name
      },
    );
    console.log(response)
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <h1 className="animated-text" data-text-value="Crie sua conta">
              Crie sua conta
            </h1>
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Usuário"
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Confirme a senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit" className="enter-button">Registrar</button>
          <div className="signup-link">
            <p>
              Já tem uma conta? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
