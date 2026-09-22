import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Carrinho from './pages/Carrinho/Carrinho.tsx';
import Detalhes from './pages/Detalhes/Detalhes.tsx';
import Login from "./pages/Login/Login";

interface ProdutoCarrinho {
  id: number;
  quantidade: number;
}

interface Usuario {
  nome: string;
  email: string;
}

const CART_KEY = "sport-maps-cart";
const USER_KEY = "sport-maps-user";

function carregarQuantidadeCarrinho(): number {
  try {
    const carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return carrinho.reduce(
      (total, produto) => total + produto.quantidade,
      0
    );
  } catch {
    return 0;
  }
}

function carregarUsuario(): Usuario | null {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

function AppContent() {
  const location = useLocation();

  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(
    carregarQuantidadeCarrinho
  );

  const [usuario, setUsuario] = useState<Usuario | null>(
    carregarUsuario
  );

  useEffect(() => {
    function atualizarCarrinho() {
      setQuantidadeCarrinho(carregarQuantidadeCarrinho());
    }

    function atualizarUsuario() {
      setUsuario(carregarUsuario());
    }

    window.addEventListener("cartUpdated", atualizarCarrinho);
    window.addEventListener("authUpdated", atualizarUsuario);

    return () => {
      window.removeEventListener("cartUpdated", atualizarCarrinho);
      window.removeEventListener("authUpdated", atualizarUsuario);
    };
  }, []);

  return (
    <div className="app">

      {/* HEADER GLOBAL */}
      {location.pathname !== "/Login" && (
        <header className="header">
          <div className="logo">
            <div className="logo-icon">⌾</div>
            <span>SPORT-MAPS</span>
          </div>

          <div className="search-container">
            <span className="search-icon">⌕</span>

            <input
              className="search"
              placeholder="Buscar endereço, bairro ou cidade..."
            />

            <span className="search-location">⌖</span>
          </div>

          <nav className="nav">
            <Link to="/">
              <div className="nav-item active">
                <span>⌾</span>
                Explorar
              </div>
            </Link>

            <Link to="/Carrinho">
              <div className="nav-item cart">
                <span>🛒</span>

                {quantidadeCarrinho > 0 && (
                  <small>{quantidadeCarrinho}</small>
                )}

                Carrinho
              </div>
            </Link>

            <div className="user">
              {usuario ? (
                <>
                  <div className="avatar">
                    {usuario.nome.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-info">
                    <strong>{usuario.nome}</strong>
                    <span>Atleta Bronze</span>

                    <button
                      type="button"
                      className="logout-button"
                      onClick={() => {
                        localStorage.removeItem("sport-maps-user");
                        window.dispatchEvent(new Event("authUpdated"));
                      }}
                    >
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <Link to="/Login" className="user-info">
                  <strong>♙ Entrar</strong>
                </Link>
              )}
            </div>
          </nav>
        </header>
      )}

      {/* CONTEÚDO */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Carrinho" element={<Carrinho />} />
        <Route path="/Detalhes/:id" element={<Detalhes />} />
        <Route path="/Login" element={<Login />} />
      </Routes>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
