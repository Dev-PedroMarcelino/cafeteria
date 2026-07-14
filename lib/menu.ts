export type Category = "cafes" | "doces" | "salgados" | "banana";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  featured?: boolean;
  /** Destaque máximo — ganha selo próprio e a seção com vídeo. */
  flagship?: boolean;
};

export const categories: { id: Category | "todos"; label: string; emoji: string }[] = [
  { id: "todos", label: "Tudo", emoji: "✨" },
  { id: "cafes", label: "Cafés", emoji: "☕" },
  { id: "doces", label: "Doces", emoji: "🍰" },
  { id: "salgados", label: "Salgados", emoji: "🥟" },
  { id: "banana", label: "Especiais de Banana", emoji: "🍌" },
];

export const menu: MenuItem[] = [
  // ── Cafés ──────────────────────────────────────────────
  {
    id: "expresso",
    name: "Expresso",
    description: "Curto, intenso e encorpado. O clássico que abre qualquer dia bom.",
    price: 6.0,
    image: "/midia/expresso.jpg",
    category: "cafes",
  },
  {
    id: "cafe-coado",
    name: "Café Coado na Hora",
    description: "Passado no coador, na sua frente. Aroma de casa de vó.",
    price: 7.5,
    image: "/midia/cafe-coado.jpg",
    category: "cafes",
  },
  {
    id: "capuccino",
    name: "Capuccino Cremoso",
    description: "Espuma densa, canela e aquele abraço quente em forma de xícara.",
    price: 14.9,
    image: "/midia/capuccino-cremoso.jpg",
    category: "cafes",
  },
  {
    id: "chocolate-quente",
    name: "Chocolate Quente",
    description: "Cremoso de verdade, com chocolate nobre e finalização da casa.",
    price: 15.9,
    image: "/midia/chocolate-quente.jpg",
    category: "cafes",
  },

  // ── Doces ──────────────────────────────────────────────
  {
    id: "bolinho-chuva",
    name: "Bolinho de Chuva",
    description: "Crocante por fora, macio por dentro, com açúcar e canela.",
    price: 9.9,
    image: "/midia/bolinho-de-chuva.jpg",
    category: "doces",
  },
  {
    id: "bolo-milho",
    name: "Bolo de Milho Cremoso",
    description: "Receita de fazenda: úmido, doce na medida e irresistível.",
    price: 12.0,
    image: "/midia/bolo-de-milho.jpg",
    category: "doces",
  },
  {
    id: "bolo-pacoca",
    name: "Bolo de Paçoca",
    description: "Massa fofinha com cobertura generosa de paçoca. Pecado bom.",
    price: 12.0,
    image: "/midia/bolo-de-pacoca.jpg",
    category: "doces",
  },
  {
    id: "bolo-ferreiro",
    name: "Bolo Ferreiro",
    description: "Chocolate com cobertura cremosa que derrete na boca.",
    price: 14.0,
    image: "/midia/bolo-ferreiro.jpg",
    category: "doces",
  },
  {
    id: "canjica",
    name: "Canjica da Casa",
    description: "Quentinha, com coco e um toque de canela. Conforto puro.",
    price: 11.0,
    image: "/midia/canjica.jpg",
    category: "doces",
  },
  {
    id: "fatia-bolo",
    name: "Fatia de Bolo do Dia",
    description: "Pergunte o sabor de hoje — sai do forno todo dia de manhã.",
    price: 10.0,
    image: "/midia/bolos.jpg",
    category: "doces",
  },

  // ── Salgados ───────────────────────────────────────────
  {
    id: "pao-de-queijo",
    name: "Pão de Queijo",
    description: "Quentinho, puxa-puxa, feito com queijo de verdade.",
    price: 7.0,
    image: "/midia/pao-de-queijo.jpg",
    category: "salgados",
  },
  {
    id: "pastel",
    name: "Pastel da Casa",
    description: "Massa sequinha e recheio generoso. Peça com caldo de cana!",
    price: 12.9,
    image: "/midia/pastel.jpg",
    category: "salgados",
  },
  {
    id: "tapioca",
    name: "Tapioca Recheada",
    description: "Leve e recheada do jeito que você escolher.",
    price: 16.9,
    image: "/midia/tapioca.jpg",
    category: "salgados",
  },
  {
    id: "misto-costela",
    name: "Misto de Carne",
    description: "Carne desfiada com queijo derretido no pão na chapa. O carro-chefe da casa!",
    price: 22,
    image: "/midia/misto-costela.jpg",
    category: "salgados",
    flagship: true,
  },

  // ── Especiais de Banana ────────────────────────────────
  {
    id: "combo-banana",
    name: "Combo Café Banana",
    description: "Café especial + doce da casa. A dupla que deu nome ao café.",
    price: 24.9,
    image: "/midia/combo.jpg",
    category: "banana",
    featured: true,
  },
  {
    id: "bolinho-banana",
    name: "Bolinho de Chuva com Banana",
    description: "Nosso clássico com banana caramelizada por cima. Exclusivo!",
    price: 13.9,
    image: "/midia/bolinho-de-chuva-2.jpg",
    category: "banana",
    featured: true,
  },
  {
    id: "cesta-tarde",
    name: "Cestinha da Tarde",
    description: "Bolinhos quentinhos para acompanhar o café das 16h.",
    price: 15.9,
    image: "/midia/bolinho-de-chuva-3.jpg",
    category: "banana",
  },
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
