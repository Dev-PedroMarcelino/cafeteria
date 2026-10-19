# ☕ Café da Praça — Landing Page & Cardápio Digital

Landing page de alta conversão + cardápio digital interativo para o **Café da Praça** (Leme - SP).

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion 12

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # build de produção
npm start        # serve o build de produção
```

## Efeitos especiais (100% 2D, sem WebGL)

| Efeito | Onde | Como funciona |
| --- | --- | --- |
| 🎬 Intro de abertura | primeiro paint | [IntroProvider.tsx](components/IntroProvider.tsx) — cortina de marca (logo dourada + nome em springs), sobe com borda curva; Header e Hero esperam o sinal `useIntroDone()` para entrar em cena. Pulada com `prefers-reduced-motion`. |
| 🥩 Carro-Chefe em vídeo | seção própria | [Flagship.tsx](components/Flagship.tsx) — vídeo real (`public/midia/video-carro-chefe.mp4`) com zoom sutil no scroll, marquees, preço vindo de `lib/menu.ts` e CTA de pedido. Toca/pausa via IntersectionObserver; vira foto com `prefers-reduced-motion`. |
| ☕ Chuva de café | trilhos laterais (≤5vw) | [BananaRain.tsx](components/BananaRain.tsx) — grãos de café e copinhos caindo em loop suave com balanço e profundidade. Desligada no mobile e com `prefers-reduced-motion`. |
| ☕ Copo flutuante + vapor dourado | Hero | [HeroArt.tsx](components/HeroArt.tsx) — o copo da logo em SVG, bolhas de vapor caramelo e fatias de bolo em gravidade zero e **parallax de mouse em 3 camadas** de profundidade. |
| 🫧 Transições de scroll | todas as seções | [Reveal.tsx](components/ui/Reveal.tsx) — variantes `up` (mola suave), `gum` (estica suavemente) e `pop` (estoura no lugar) via `whileInView`. |
| 🗂️ Filtros do cardápio | seção Cardápio | [Menu.tsx](components/Menu.tsx) — pill deslizante (`layoutId`) com degradê quente + reorganização fluida dos cards (`AnimatePresence` + `layout`). |
| ✨ Hover dos cards | cards de produto | [ProductCard.tsx](components/ProductCard.tsx) — zoom suave na foto, halo quente na borda e botão "Adicionar" que surge com micro-animação. |

## Onde editar o conteúdo

- **Itens e preços do cardápio** → [lib/menu.ts](lib/menu.ts)
- **WhatsApp, endereço, horários e redes sociais** → [lib/site.ts](lib/site.ts)
- **Fotos** → `public/midia/` (fotos de alta qualidade da fachada e mesa com direitos liberados)
- **Paleta e utilidades da marca** → [app/globals.css](app/globals.css) (`--color-banana`, `--color-terracotta`, `--color-cocoa`, `.gradient-frame`, `.blob-mask`, `.text-brand-gradient`)

## Estrutura

```
app/
  layout.tsx        # fontes (Fredoka + Inter), metadata, tema
  page.tsx          # monta a página
  globals.css       # design system (Tailwind v4 @theme)
components/
  IntroProvider.tsx # cortina de abertura + sinal useIntroDone()
  Header.tsx        # fixo, transparente → blur ao rolar, CTA pulsante
  Hero.tsx          # título gigante + arte 2D animada
  HeroArt.tsx       # copo + vapor + gravidade zero + parallax
  Flagship.tsx      # carro-chefe com vídeo de fundo + marquees
  BananaRain.tsx    # cascata 2D de grãos de café nas laterais
  Menu.tsx          # filtros + grid animado
  ProductCard.tsx   # card com micro-interações
  About.tsx         # história + fotos em blob + botão do mapa
  Footer.tsx        # horários em destaque + redes com "pulinho"
  cart/             # sistema de pedidos e checkout via WhatsApp
  art/              # SVGs da marca (copo de café, bolo, motinha)
  ui/Reveal.tsx     # animações de entrada no scroll
lib/
  menu.ts           # dados do cardápio
  site.ts           # configurações do negócio
  cart.ts           # carrinho, adicionais e checkout
```

## Acessibilidade & performance

- `prefers-reduced-motion` desativa efeitos e loops de animação.
- Efeitos decorativos laterais só em telas `md+` (poupa bateria no celular).
- Imagens otimizadas via `next/image` (AVIF/WebP, lazy).
- First Load JS ultra-leve, página 100% estática (SSG).
