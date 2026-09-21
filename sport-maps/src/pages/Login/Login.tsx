import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

type Modo = "entrar" | "cadastro";

export default function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as { from?: string } | null)?.from;

    const [modo, setModo] = useState<Modo>("entrar");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [lembrar, setLembrar] = useState(true);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    function alternarModo(novoModo: Modo) {
        setModo(novoModo);
        setSenha("");
        setConfirmarSenha("");
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (modo === "cadastro" && senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const usuario = {
            nome:
                modo === "cadastro"
                    ? nome.trim()
                    : email.split("@")[0],
            email: email.trim(),
        };

        // Simulação de autenticação
        localStorage.setItem("sport-maps-user", JSON.stringify(usuario));

        // Atualiza o cabeçalho
        window.dispatchEvent(new Event("authUpdated"));

        // Retorna à página de origem ou à Home
        navigate(from || "/", { replace: true });
    }

    return (
        <div className="login-page">
            {/* HEADER */}
            <header className="login-header">
                <Link to="/" className="login-logo">
                    <div className="login-logo-icon">⌾</div>
                    <span>SPORT-MAPS</span>
                </Link>

                <nav className="login-nav">
                    <Link to="/" className="login-nav-item">
                        <span>⌾</span>
                        Explorar
                    </Link>

                    <Link to="/Carrinho" className="login-nav-item">
                        <span>🛒</span>
                        Carrinho
                    </Link>

                    <Link to="/Login" className="login-nav-item login-nav-active">
                        <span>♙</span>
                        Entrar
                    </Link>
                </nav>
            </header>

            {/* CONTEÚDO */}
            <main className="login-content">
                {/* BANNER ESQUERDO */}
                <section className="login-banner">
                    <div className="banner-overlay">
                        <span className="banner-location">
                            <span className="location-dot" />
                            SUA CIDADE EM MOVIMENTO
                        </span>

                        <div className="banner-text">
                            <h1>
                                Encontre seu próximo pico.{" "}
                                <span>Viva o esporte.</span>
                            </h1>

                            <p>
                                Descubra pistas, parques e equipamentos recomendados
                                pela comunidade esportiva perto de você.
                            </p>

                            <div className="banner-benefits">
                                <span>✓ Locais verificados</span>
                                <span>✓ Comunidade local</span>
                                <span>✓ Equipamentos certos</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAINEL DE LOGIN */}
                <section className="login-panel">
                    <div className="login-panel-heading">
                        <h2>
                            {modo === "entrar"
                                ? "Boas-vindas à Sport-Maps"
                                : "Junte-se à Sport-Maps"}
                        </h2>

                        <p>
                            {modo === "entrar"
                                ? "Entre na sua conta ou crie uma nova para salvar seus locais e equipamentos favoritos."
                                : "Crie sua conta para explorar locais e encontrar os equipamentos ideais."}
                        </p>
                    </div>

                    {/* ABAS */}
                    <div className="login-tabs">
                        <button
                            type="button"
                            className={modo === "entrar" ? "selected" : ""}
                            onClick={() => alternarModo("entrar")}
                        >
                            Entrar
                        </button>

                        <button
                            type="button"
                            className={modo === "cadastro" ? "selected" : ""}
                            onClick={() => alternarModo("cadastro")}
                        >
                            Criar conta
                        </button>
                    </div>

                    {/* FORMULÁRIO */}
                    <form className="login-form" onSubmit={handleSubmit}>
                        {modo === "cadastro" && (
                            <div className="login-field">
                                <label htmlFor="nome">Nome completo</label>

                                <div className="input-wrapper">
                                    <span className="input-icon">♙</span>
                                    <input
                                        id="nome"
                                        type="text"
                                        placeholder="Digite seu nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="login-field">
                            <label htmlFor="email">E-mail</label>

                            <div className="input-wrapper">
                                <span className="input-icon">✉</span>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="voce@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label htmlFor="senha">Senha</label>

                            <div className="input-wrapper">
                                <span className="input-icon">♙</span>

                                <input
                                    id="senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    minLength={6}
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    aria-label={
                                        mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                                    }
                                >
                                    {mostrarSenha ? "◉" : "◎"}
                                </button>
                            </div>
                        </div>

                        {modo === "cadastro" && (
                            <div className="login-field">
                                <label htmlFor="confirmarSenha">Confirmar senha</label>

                                <div className="input-wrapper">
                                    <span className="input-icon">♙</span>

                                    <input
                                        id="confirmarSenha"
                                        type={mostrarSenha ? "text" : "password"}
                                        placeholder="Digite sua senha novamente"
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        minLength={6}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {modo === "entrar" && (
                            <div className="login-options">
                                <label className="remember-option">
                                    <input
                                        type="checkbox"
                                        checked={lembrar}
                                        onChange={(e) => setLembrar(e.target.checked)}
                                    />
                                    <span>Lembrar de mim</span>
                                </label>

                                <button
                                    type="button"
                                    className="forgot-password"
                                    onClick={() =>
                                        alert("A recuperação de senha será implementada futuramente.")
                                    }
                                >
                                    Esqueci minha senha
                                </button>
                            </div>
                        )}

                        <button type="submit" className="login-submit">
                            {modo === "entrar" ? "CONTINUAR COM E-MAIL" : "CRIAR MINHA CONTA"}
                            <span>→</span>
                        </button>
                    </form>

                    {/* DIVISOR */}
                    <div className="login-divider">
                        <span>OU CONTINUE COM</span>
                    </div>

                    {/* LOGIN SOCIAL */}
                    <div className="social-buttons">
                        <button
                            type="button"
                            onClick={() => alert("Login com Google será implementado futuramente.")}
                        >
                            <span className="social-icon">G</span>
                            Google
                        </button>

                        <button
                            type="button"
                            onClick={() => alert("Login com Apple será implementado futuramente.")}
                        >
                            <span className="social-icon">●</span>
                            Apple
                        </button>
                    </div>

                    {/* RODAPÉ */}
                    <div className="login-footer">
                        {modo === "entrar" ? (
                            <p>
                                Ainda não tem uma conta?{" "}
                                <button onClick={() => alternarModo("cadastro")}>
                                    Criar conta grátis
                                </button>
                            </p>
                        ) : (
                            <p>
                                Já possui uma conta?{" "}
                                <button onClick={() => alternarModo("entrar")}>
                                    Entrar
                                </button>
                            </p>
                        )}

                        <small>
                            Ao continuar, você concorda com nossos{" "}
                            <a href="#termos">Termos de Uso</a> e{" "}
                            <a href="#privacidade">Política de Privacidade</a>.
                        </small>
                    </div>
                </section>
            </main>
        </div>
    );
}