import { useState } from "react";
import { FaLock } from "react-icons/fa";
import axios from "axios";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const API_URL = 'http://localhost:3000'; // Coloque a URL do seu backend aqui

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
      console.log(response.data);
      
    } catch (error) {
      console.error('Erro ao redefinir senha:', error.message);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Redefinir senha</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit" className="enter-button">Redefinir Senha</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
