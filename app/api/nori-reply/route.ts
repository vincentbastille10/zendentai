import { NextResponse } from "next/server";

const fallback = {
  text: "Je vous entends.\n\nOn va faire simple.\n\nJe vous propose de commencer par quelques respirations.",
  cta: "Respirer avec Nori",
  nextAction: "start_breathing",
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json() as { message?: string };

    if (!process.env.TOGETHER_API_KEY) {
      return NextResponse.json(fallback);
    }

    const model =
      process.env.TOGETHER_MODEL ||
      "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo";

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.55,
        max_tokens: 180,
        messages: [
          {
            role: "system",
            content:
              "Tu es Nori, une présence interactive dans une salle d'attente de dentiste. Tu n'es pas médecin. Tu ne donnes aucun conseil médical. Tu ne fais aucun diagnostic. Tu ne promets jamais qu'un soin sera indolore. Tu ne demandes aucune donnée personnelle. Tu réponds en français, en 2 à 4 phrases courtes. Tu es humain, doux, précis et calme. Tu accompagnes la personne avant son rendez-vous. Tu ne parles pas comme une IA technique. Tu ramènes presque toujours vers une respiration simple, une pause ou une visualisation douce.",
          },
          {
            role: "user",
            content: String(message || "").slice(0, 500),
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(fallback);
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data?.choices?.[0]?.message?.content?.trim() || fallback.text;

    return NextResponse.json({
      text,
      cta: "Respirer avec Nori",
      nextAction: "start_breathing",
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
