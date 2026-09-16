
import { useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaMapMarkerAlt,
  FaMoon,
  FaParking,
  FaShieldAlt,
  FaShoppingCart,
  FaStar,
  FaStreetView,
  FaSun,
  FaTimesCircle,
  FaWalking,
} from "react-icons/fa";
import { MdDirections, MdLocationOn } from "react-icons/md";
import "./Detalhes.css";
import capaceteImg from "../../assets/capacete.jpg";
import rodasImg from "../../assets/rodas.jpg";
import protecaoImg from "../../assets/protecao.jpg";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
}

interface DetalhesProps {
  onVoltar?: () => void;
}

/**
 * Chave utilizada para armazenar o carrinho.
 *
 * A página Carrinho deve utilizar a mesma chave:
 * "sport-maps-cart"
 */
const CART_KEY = "sport-maps-cart";

const produtos: Produto[] = [
  {
    id: 1,
    nome: "Capacete Pro Skate",
    preco: 149.9,
    categoria: "Segurança",
    imagem:
      capaceteImg,
  },
  {
    id: 2,
    nome: "Joelheira Impact Shield",
    preco: 89.9,
    categoria: "Proteção",
    imagem:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    nome: "Rodas Street 54mm 95A",
    preco: 69.9,
    categoria: "Skate",
    imagem:
      rodasImg,
  },
  {
    id: 4,
    nome: "Rolamentos ABEC-7",
    preco: 45.9,
    categoria: "Skate",
    imagem:
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    nome: "Cotovelo Flex Guard",
    preco: 79.9,
    categoria: "Proteção",
    imagem:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    nome: "Kit de Proteção",
    preco: 249.9,
    categoria: "Segurança",
    imagem:
      protecaoImg,
  },
];

const formatarPreco = (preco: number) => {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const abrirGoogleMaps = () => {
  const endereco = encodeURIComponent(
    "R. Antônio Diniz, 120 - Vila Bocaina, Mauá - SP, 09310-430"
  );

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${endereco}`,
    "_blank"
  );
};

const abrirWaze = () => {
  const endereco = encodeURIComponent(
    "R. Antônio Diniz, 120 - Vila Bocaina, Mauá - SP, 09310-430"
  );

  window.open(
    `https://www.waze.com/ul?q=${endereco}`,
    "_blank"
  );
};

export default function Detalhes({ onVoltar }: DetalhesProps) {
  const [adicionados, setAdicionados] = useState<number[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    try {
      const carrinhoAtual = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );

      /*
       * Se o produto já existe no carrinho,
       * aumenta apenas a quantidade.
       */
      const produtoExistente = carrinhoAtual.find(
        (item: Produto & { quantidade: number }) => item.id === produto.id
      );

      let novoCarrinho;

      if (produtoExistente) {
        novoCarrinho = carrinhoAtual.map(
          (item: Produto & { quantidade: number }) =>
            item.id === produto.id
              ? {
                  ...item,
                  quantidade: item.quantidade + 1,
                }
              : item
        );
      } else {
        novoCarrinho = [
          ...carrinhoAtual,
          {
            ...produto,
            quantidade: 1,
          },
        ];
      }

      localStorage.setItem(CART_KEY, JSON.stringify(novoCarrinho));

      /*
       * Evento customizado para avisar outros componentes
       * que o carrinho foi atualizado.
       */
      window.dispatchEvent(new Event("cartUpdated"));

      setAdicionados((estadoAtual) => {
        if (estadoAtual.includes(produto.id)) {
          return estadoAtual;
        }

        return [...estadoAtual, produto.id];
      });

      /*
       * Remove o feedback visual depois de 2 segundos.
       */
      setTimeout(() => {
        setAdicionados((estadoAtual) =>
          estadoAtual.filter((id) => id !== produto.id)
        );
      }, 2000);
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
    }
  };

  return (
    <main className="detalhes-page">
      <div className="detalhes-container">
        {/* =========================
            BOTÃO VOLTAR
        ========================== */}
        <button className="btn-voltar" onClick={onVoltar}>
          <FaArrowLeft />
          Voltar
        </button>

        {/* =========================
            CONTEÚDO PRINCIPAL
        ========================== */}
        <section className="detalhes-grid">
          {/* COLUNA ESQUERDA */}
          <div className="detalhes-main">
            {/* IMAGEM PRINCIPAL */}
            <div className="local-imagem-container">
              <img
                className="local-imagem"
                src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=300&q=80"
                alt="Pista de Skate Vila Bocaina"
              />

              <div className="imagem-overlay">
                <span className="badge-verificado">
                  <FaCheckCircle />
                  Local verificado
                </span>
              </div>
            </div>

            {/* TAGS */}
            <div className="tags-local">
              <span className="tag tag-verde">Skate</span>
              <span className="tag">Pública</span>
            </div>

            {/* TÍTULO */}
            <div className="titulo-local">
              <div>
                <h1>Pista de Skate Vila Bocaina</h1>

                <div className="avaliacao-mobile">
                  <FaStar />
                  <strong>4.8</strong>
                  <span>(24 avaliações)</span>
                </div>
              </div>

              <div className="avaliacao">
                <FaStar />
                <strong>4.8</strong>
                <span>(24 avaliações)</span>
              </div>
            </div>

            <div className="separador" />

            {/* =========================
                HORÁRIOS E INFRAESTRUTURA
            ========================== */}
            <div className="informacoes-grid">
              {/* HORÁRIOS */}
              <section className="info-section">
                <h2>Horários de Funcionamento</h2>

                <div className="horarios">
                  <div className="horario-item fechado">
                    <div>
                      <span>Segunda a Sexta</span>
                    </div>

                    <strong>06:00 - 22:00</strong>
                  </div>

                  <div className="horario-item aberto">
                    <div>
                      <FaCheckCircle />
                      <span>Sábado e Domingo</span>
                    </div>

                    <strong>06:00 - 23:00</strong>
                  </div>
                </div>
              </section>

              {/* INFRAESTRUTURA */}
              <section className="info-section">
                <h2>Infraestrutura Disponível</h2>

                <div className="infraestrutura">
                  <span>
                    <FaCheckCircle />
                    Piso Liso / Tratado
                  </span>

                  <span>
                    <FaMoon />
                    Iluminação Noturna
                  </span>

                  <span>
                    <FaWalking />
                    Banheiros Públicos
                  </span>

                  <span>
                    <FaParking />
                    Área de Estacionamento
                  </span>

                  <span className="indisponivel">
                    <FaTimesCircle />
                    Boa Segurança Ativa
                  </span>

                  <span>
                    <FaStreetView />
                    Estacionamento
                  </span>
                </div>
              </section>
            </div>

            {/* =========================
                PRODUTOS
            ========================== */}
            <section className="produtos-section">
              <div className="section-header">
                <div>
                  <h2>Equipamentos Recomendados</h2>
                  <p>
                    Itens sugeridos para sua sessão neste local
                  </p>
                </div>

                <FaShoppingCart className="section-cart-icon" />
              </div>

              <div className="produtos-container">
                {produtos.map((produto) => {
                  const foiAdicionado = adicionados.includes(produto.id);

                  return (
                    <article className="produto-card" key={produto.id}>
                      {/* IMAGEM */}
                      <div className="produto-imagem-container">
                        <img
                          src={produto.imagem}
                          alt={produto.nome}
                          className="produto-imagem"
                        />

                        <span className="produto-badge">
                          Recomendado para você
                        </span>
                      </div>

                      {/* INFORMAÇÕES */}
                      <div className="produto-info">
                        <h3>{produto.nome}</h3>

                        <strong className="produto-preco">
                          {formatarPreco(produto.preco)}
                        </strong>

                        <button
                          className={`btn-adicionar ${
                            foiAdicionado ? "adicionado" : ""
                          }`}
                          onClick={() => adicionarAoCarrinho(produto)}
                        >
                          {foiAdicionado ? (
                            <>
                              <FaCheckCircle />
                              Adicionado
                            </>
                          ) : (
                            <>
                              <FaShoppingCart />
                              Adicionar ao Carrinho
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* =========================
                COMENTÁRIO
            ========================== */}
            <section className="comentarios-section">
              <h2>Comentários da Comunidade</h2>

              <article className="comentario">
                <div className="comentario-header">
                  <div className="usuario">
                    <div className="avatar">LP</div>

                    <div>
                      <strong>Lucas Pereira</strong>
                      <small>há 2 dias</small>
                    </div>
                  </div>

                  <div className="nota-comentario">
                    <FaStar />
                    5.0
                  </div>
                </div>

                <p>
                  Iluminação excelente à noite e o asfalto está super
                  liso. Ideal para treinar transições no bowl!
                </p>
              </article>
            </section>
          </div>

          {/* =========================
              COLUNA DIREITA
          ========================== */}
          <aside className="local-sidebar">
            <div className="endereco-card">
              <h2>Endereço</h2>

              <p className="endereco">
                R. Antônio Diniz, 120 - Vila Bocaina,
                <br />
                Mauá - SP,
                <br />
                09310-430
              </p>

              {/* MINI MAPA */}
              <div className="mini-mapa">
                <div className="mapa-linha linha-1" />
                <div className="mapa-linha linha-2" />
                <div className="mapa-linha linha-3" />

                <div className="marcador">
                  <MdLocationOn />
                </div>

                <div className="mapa-rota">
                  <FaCompass />
                </div>
              </div>

              {/* BOTÕES DE NAVEGAÇÃO */}
              <button
                className="btn-mapa"
                onClick={abrirGoogleMaps}
              >
                <MdDirections />
                Abrir no Google Maps
              </button>

              <button
                className="btn-mapa"
                onClick={abrirWaze}
              >
                <FaCompass />
                Abrir no Waze
              </button>

              <button
                className="btn-como-chegar"
                onClick={abrirGoogleMaps}
              >
                <FaWalking />
                COMO CHEGAR AO LOCAL
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
