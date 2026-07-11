import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Flagship from "@/components/Flagship";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Footer from "@/components/Footer";
import BananaRain from "@/components/BananaRain";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import IntroProvider from "@/components/IntroProvider";
import CartProvider from "@/components/cart/CartProvider";
import FloatingCart from "@/components/cart/FloatingCart";
import AddToCartModal from "@/components/cart/AddToCartModal";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Home() {
  return (
    <IntroProvider>
      <CartProvider>
        <main className="relative">
          {/* Trilhos laterais com a chuva de bananas (desktop) */}
          <BananaRain />

          <Header />
          <Hero />
          <Flagship />
          <Menu />
          <About />
          <Footer />

          {/* Conversa direta (esquerda) e carrinho do pedido (direita) */}
          <FloatingWhatsApp />
          <FloatingCart />

          {/* Módulo de pedidos */}
          <AddToCartModal />
          <CartDrawer />
        </main>
      </CartProvider>
    </IntroProvider>
  );
}
