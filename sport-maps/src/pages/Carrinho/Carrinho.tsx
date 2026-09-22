import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Carrinho.css";

// Substitua pelos caminhos reais das imagens dos seus produtos
//import capaceteImg from "../../assets/capacete.jpg";
//import rodasImg from "../../assets/rodas.jpg";
//import protecaoImg from "../../assets/protecao.jpg";

interface ProdutoCarrinho {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  quantidade: number;
}

interface CartItemProps {
  product: ProdutoCarrinho;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

// =========================================
// PRODUTOS
// =========================================


// const initialProducts: Product[] = [
//   {
//     id: 1,
//     name: "Capacete Pro Skate Black Neon",
//     price: 179.9,
//     quantity: 1,
//     image: capaceteImg,
//     category: "Para Pistas",
//     recommended: "Pista de Skate Vila Bocaina",
//   },
//   {
//     id: 2,
//     name: "Rodas Street 54mm 99A (Jogo c/ 4)",
//     price: 80.9,
//     quantity: 2,
//     image: rodasImg,
//     category: "Para Pistas",
//     recommended: "Pista de Skate Vila Bocaina",
//   },
//   {
//     id: 3,
//     name: "Kit de Proteção Completo (Joelheira/Cotoveleira/Wrist)",
//     price: 78.9,
//     quantity: 1,
//     image: protecaoImg,
//     category: "Para Pistas",
//     recommended: "Parque Linear do Guaputiba",
//   },
// ];

// =========================================
// FUNÇÕES
// =========================================

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// =========================================
// COMPONENTE PRINCIPAL
// =========================================


const CART_KEY = "sport-maps-cart";

function carregarCarrinho(): ProdutoCarrinho[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (error) {
    console.error("Erro ao carregar carrinho:", error);
    return [];
  }
}

export default function Cart() {
  const navigate = useNavigate();

  const [products, setProducts] =
    useState<ProdutoCarrinho[]>(carregarCarrinho());

  const [coupon, setCoupon] = useState("");

  const shipping = products.length > 0 ? 15 : 0;

  const subtotal = products.reduce(
    (total, product) =>
      total + product.preco * product.quantidade,
    0
  );

  const quantidadeTotal = products.reduce(
    (total, product) => total + product.quantidade,
    0
  );

  const total = subtotal + shipping;

  function increaseQuantity(id: number) {
    setProducts((current) => {
      const updated = current.map((product) =>
        product.id === id
          ? {
            ...product,
            quantidade: product.quantidade + 1,
          }
          : product
      );

      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));

      return updated;
    });
  }

  function decreaseQuantity(id: number) {
    setProducts((current) => {
      const updated = current.map((product) =>
        product.id === id
          ? {
            ...product,
            quantidade: Math.max(1, product.quantidade - 1),
          }
          : product
      );

      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));

      return updated;
    });
  }

  function removeProduct(id: number) {
    setProducts((current) => {
      const updated = current.filter(
        (product) => product.id !== id
      );

      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));

      return updated;
    });
  }

  function finalizarCompra() {
    const usuario = localStorage.getItem("sport-maps-user");

    if (!usuario) {
      navigate("/Login", {
        state: {
          from: "/Carrinho",
        },
      });

      return;
    }

    alert("Pagamento será implementado futuramente!");
  }



  // =========================================
  // RENDER
  // =========================================

  return (
    <main className="cart-page">
      <div className="cart-container">

        {/* =========================
            COLUNA ESQUERDA
        ========================== */}
        <section className="cart-content">

          <div className="cart-title-row">
            <div className="cart-title-wrapper">
              <h1>Meu Carrinho</h1>

              <span className="saved-items">
                {quantidadeTotal} itens salvos
              </span>
            </div>

            <button className="continue-shopping">
              <span>←</span>
              Continuar Explorando Locais
            </button>
          </div>

          <div className="title-divider" />

          <div className="products-list">
            {products.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onIncrease={() => increaseQuantity(product.id)}
                onDecrease={() => decreaseQuantity(product.id)}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>



          {/* Garantia */}
          <div className="compatibility-box">
            <div className="compatibility-icon">
              ✓
            </div>

            <div>
              <strong>
                Garantia Sport-Maps de Compatibilidade
              </strong>

              <p>
                Todos os itens acima são certificados pela comunidade
                local de Maud para a Pista de Vila Bocaina e Parque
                Guapituba.
              </p>
            </div>
          </div>

        </section>

        {/* =========================
         RESUMO
        ========================== */}
        <aside className="order-summary">

          <h2>Resumo do Pedido</h2>

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Subtotal dos itens</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <div className="summary-row shipping-row">
            <span>Entrega / Frete</span>
            <strong>{formatPrice(shipping)}</strong>
          </div>

          <div className="summary-divider summary-divider-small" />

          {/* Cupom */}
          <div className="coupon-section">
            <label htmlFor="coupon">
              Cupom de Desconto
            </label>

            <div className="coupon-input-row">
              <input
                id="coupon"
                type="text"
                placeholder="Inserir cupom"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <button>
                Aplicar
              </button>
            </div>
          </div>

          <div className="summary-divider summary-divider-small" />

          {/* Total */}
          <div className="total-row">
            <span>Total</span>

            <div className="total-value">
              <strong>{formatPrice(total)}</strong>
              <small>ou até 10x de R$ 43,50</small>
            </div>
          </div>

          {/* Checkout */}
          <button
            className="checkout-button"
            onClick={finalizarCompra}
            disabled={products.length === 0}
          >
            <span>♧</span>
            FINALIZAR COMPRA
          </button>

          {/* Pagamentos */}
          <div className="payment-methods">
            <span>Formas de pagamento aceitas:</span>

            <div className="payment-badges">
              <span>PIX</span>
              <span>Cartão de Crédito</span>
              <span>Boleto</span>
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}


/* =================================
   ITEM DO CARRINHO
================================= */

function CartItem({
  product,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const productTotal = product.preco * product.quantidade;

  return (
    <article className="cart-item">

      {/* Imagem */}
      <div className="product-image-container">
        <img
          src={product.imagem}
          alt={product.nome}
          className="product-image"
        />
      </div>

      {/* Informações */}
      <div className="product-info">

        <h3>{product.nome}</h3>

        <div className="product-meta">
          <span className="category-badge">
            {product.categoria}
          </span>

          {/* <span className="recommendation">
            Recomendado p/: {product.recommended}
          </span> */}
        </div>

      </div>

      {/* Preço unitário */}
      <div className="unit-price">
        <span>Valor Unitário</span>
        <strong>{formatPrice(product.preco)}</strong>
      </div>

      {/* Quantidade */}
      <div className="quantity-control">

        <button
          type="button"
          onClick={onDecrease}
          disabled={product.quantidade <= 1}
        >
          −
        </button>

        <span>{product.quantidade}</span>

        <button
          type="button"
          onClick={onIncrease}
        >
          +
        </button>

      </div>

      {/* Subtotal */}
      <div className="product-subtotal">
        <span>Subtotal</span>
        <strong>{formatPrice(productTotal)}</strong>
      </div>

      {/* Remover */}
      <button
        type="button"
        className="remove-button"
        onClick={onRemove}
        aria-label={`Remover ${product.nome}`}
      >
        🗑
      </button>

    </article>
  );
}
