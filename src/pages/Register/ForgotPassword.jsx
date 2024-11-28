import { useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const API_URL = 'http://localhost:3000'; // Coloque a URL do seu backend aqui

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      console.log(response.data);
      
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error.message);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Esqueci minha senha</h1>
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <button type="submit" className="enter-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
