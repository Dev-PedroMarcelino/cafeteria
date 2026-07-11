/**
 * Configurações centrais do Café Banana.
 * ⚠️ Ajuste aqui: WhatsApp, endereço, horários e redes sociais.
 */
export const site = {
  name: "Café Banana",
  city: "Leme - SP",
  whatsapp: "5519981057714",
  // TODO: trocar pelo endereço exato para o link do mapa ficar cravado
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Café Banana, Leme - SP"),
  address: "Centro, Leme - SP",
  instagram: "https://instagram.com/", // TODO: @ do café
  facebook: "https://facebook.com/", // TODO: página do café
  hours: [
    { days: "Terça a Sexta", time: "07h — 19h" },
    { days: "Sábado", time: "07h — 20h" },
    { days: "Domingo", time: "08h — 13h" },
  ],
};

export function whatsappOrderUrl(itemName?: string) {
  const text = itemName
    ? `Olá, Café Banana! 🍌 Quero pedir: ${itemName}`
    : "Olá, Café Banana! 🍌 Quero fazer um pedido!";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
