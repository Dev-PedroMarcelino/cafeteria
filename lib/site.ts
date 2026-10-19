/**
 * Configurações centrais do Café da Praça.
 * ⚠️ Ajuste aqui: WhatsApp, endereço, horários e redes sociais.
 */
export const site = {
  name: "Café da Praça",
  city: "Leme - SP",
  whatsapp: "5519981057714",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("R. Carlos Paes de Barros, 35 - São Manoel, Leme - SP, 13610-170"),
  address: "R. Carlos Paes de Barros, 35 - São Manoel, Leme - SP, 13610-170",
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
    ? `Olá, Café da Praça! ☕ Quero pedir: ${itemName}`
    : "Olá, Café da Praça! ☕ Quero fazer um pedido!";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
