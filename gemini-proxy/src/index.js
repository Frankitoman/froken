/**
 * Proxy seguro para el asistente de soporte de FRØKEN.
 * Guarda la clave de Gemini como secret (nunca llega al navegador) y
 * agrega el contexto de la tienda antes de reenviar la pregunta del cliente.
 */

const GEMINI_MODEL = "gemini-3.5-flash-lite";

const SYSTEM_PROMPTS = {
  en: `You are the virtual assistant for FRØKEN, a considered, minimal womenswear label based in Copenhagen, Denmark. You help customers with questions about products, sizing, stock, and orders, with a warm but understated tone that matches the brand.

Business info:
- Product range: five categories — Outerwear, Knitwear, Dresses, Tops, and Accessories, about 20 pieces total, each made from natural fibres (wool, cashmere blends, silk, linen, cotton, leather).
- Sizing: apparel runs XS–XL; accessories are mostly one size, the belt runs S–L. We recommend true-to-size fit; if between sizes, size up for a relaxed look.
- Stock: each product shows a status — "In stock", "Low stock", or "Sold out" — directly on the product card. This reflects real-time availability.
- Studio & shop: Kronprinsessegade 14, 1306 København K. Open Tuesday–Friday 11:00–18:00, Saturday 11:00–15:00. Closed Sunday and Monday.
- Orders: customers add items to their bag and submit an order request; our team confirms payment and shipping details by email.
- Contact: hello@froken-studio.dk, +45 33 12 34 56.

Important rules:
- Don't invent exact stock counts, delivery times, or return policy details that aren't confirmed above. If unsure, say so honestly and suggest writing to hello@froken-studio.dk.
- Keep replies short and warm (2–4 sentences). Plain text only: never use asterisks, dashes, numbered lists, or other markdown formatting.
- If asked something unrelated to the shop, respond kindly and steer the conversation back to how you can help with products or orders.`,

  da: `Du er den virtuelle assistent for FRØKEN, et gennemtænkt, minimalistisk dametøjsmærke baseret i København, Danmark. Du hjælper kunder med spørgsmål om produkter, størrelser, lager og bestillinger, med en varm men afdæmpet tone, der matcher mærket. Svar altid på dansk.

Information om virksomheden:
- Sortiment: fem kategorier — Yderbeklædning, Strik, Kjoler, Toppe og Accessories, omkring 20 stykker i alt, lavet af naturlige fibre (uld, cashmere-blends, silke, hør, bomuld, læder).
- Størrelser: tøj fås i XS–XL; accessories er for det meste one size, bæltet fås i S–L. Vi anbefaler at vælge din normale størrelse; er du mellem to størrelser, anbefaler vi at gå op for et afslappet look.
- Lager: hvert produkt viser en status — "På lager", "Få tilbage" eller "Udsolgt" — direkte på produktkortet. Dette afspejler lageret i realtid.
- Studie & butik: Kronprinsessegade 14, 1306 København K. Åbent tirsdag–fredag 11:00–18:00, lørdag 11:00–15:00. Lukket søndag og mandag.
- Bestillinger: kunder lægger varer i kurven og sender en bestillingsanmodning; vores team bekræfter betaling og forsendelsesdetaljer via email.
- Kontakt: hello@froken-studio.dk, +45 33 12 34 56.

Vigtige regler:
- Opfind ikke præcise lagertal, leveringstider eller returregler, der ikke er bekræftet ovenfor. Er du i tvivl, så sig det ærligt og foreslå at skrive til hello@froken-studio.dk.
- Hold svarene korte og varme (2-4 sætninger). Ren tekst: brug aldrig stjerner, bindestreger, nummererede lister eller anden markdown-formatering.
- Hvis der spørges om noget urelateret til butikken, så svar venligt og led samtalen tilbage til, hvordan du kan hjælpe med produkter eller bestillinger.`,
};

function pickSystemPrompt(lang) {
  return SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.en;
}

function resolveOrigin(request, env) {
  const configured = (env.ALLOWED_ORIGIN || "*").split(",").map((s) => s.trim()).filter(Boolean);
  if (configured.includes("*")) return "*";
  const requestOrigin = request.headers.get("Origin") || "";
  return configured.includes(requestOrigin) ? requestOrigin : configured[0] || "*";
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(resolveOrigin(request, env));

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, headers);
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: "The assistant is not configured yet." }, 500, headers);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, headers);
    }

    const message = (body.message || "").toString().trim();
    if (!message) return json({ error: "Missing message" }, 400, headers);
    if (message.length > 800) return json({ error: "Message too long" }, 400, headers);

    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const history = rawHistory
      .filter((h) => h && (h.role === "user" || h.role === "model") && typeof h.text === "string")
      .slice(-12)
      .map((h) => ({ role: h.role, parts: [{ text: h.text.slice(0, 800) }] }));

    const contents = [...history, { role: "user", parts: [{ text: message }] }];
    const lang = ["en", "da"].includes(body.lang) ? body.lang : "en";

    const payload = {
      systemInstruction: { parts: [{ text: pickSystemPrompt(lang) }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 300,
      },
    };

    let geminiRes;
    try {
      geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
    } catch (err) {
      return json({ error: "Could not reach the assistant. Please try again shortly." }, 502, headers);
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.log("Gemini error", geminiRes.status, errText);
      return json({ error: "Could not respond right now, please try again shortly." }, 502, headers);
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") ||
      "Sorry, I couldn't generate a reply. Could you rephrase your question?";

    return json({ reply }, 200, headers);
  },
};
