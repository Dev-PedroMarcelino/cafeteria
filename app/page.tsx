import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Flagship from "@/components/Flagship";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Footer from "@/components/Footer";
import BananaRain from "@/components/BananaRain";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import IntroProvider from "@/components/IntroProvider";

export default function Home() {
  return (
    <IntroProvider>
      <main className="relative">
        {/* Trilhos laterais com a chuva de bananas (desktop) */}
        <BananaRain />

        <Header />
        <Hero />
        <Flagship />
        <Menu />
        <About />
        <Footer />

        {/* Pedido sempre à mão depois que o hero sai de cena */}
        <FloatingWhatsApp />
      </main>
    </IntroProvider>
  );
}
