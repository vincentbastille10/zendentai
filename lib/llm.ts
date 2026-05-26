// Server-side uniquement.

import { getLocalScript } from "@/data/meditations";
import { getNoriReply, type NoriReply } from "@/lib/nori-engine";

// ── Breathing session ─────────────────────────────────────────────────────────

export interface GuideInput {
  ambience: string;
  intention: string;
  durationMinutes: number;
}

export interface GuideOutput {
  steps: string[];
  source: "llm" | "local";
}

export async function generateGuidedSession(input: GuideInput): Promise<GuideOutput> {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) return { steps: getLocalScript(input.intention), source: "local" };
  try {
    return await callBreathingLLM(input, apiKey);
  } catch (err) {
    console.error("[LLM] breathing error, fallback:", err);
    return { steps: getLocalScript(input.intention), source: "local" };
  }
}

async function callBreathingLLM(input: GuideInput, apiKey: string): Promise<GuideOutput> {
  const base = process.env.LLM_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.LLM_MODEL ?? "gpt-4o-mini";

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: `Tu es un guide de méditation doux en salle d'attente de dentiste.
Génère une séance guidée courte, apaisante, en français.
Ton doux, rassurant — jamais anxiogène, jamais médical.
Évite : stress, peur, anxiété, angoisse, douleur.
Retourne uniquement un JSON valide : { "steps": ["..."] } avec 7 étapes courtes.`,
        },
        {
          role: "user",
          content: `Ambiance : ${input.ambience} | Intention : ${input.intention} | Durée : ${input.durationMinutes}min`,
        },
      ],
      temperature: 0.7,
      max_tokens: 600,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) throw new Error(`LLM ${res.status}`);
  const data = await res.json() as { choices: Array<{ message: { content: string } }> };
  const parsed = JSON.parse(data.choices[0]?.message?.content ?? "{}") as { steps: string[] };
  if (!Array.isArray(parsed.steps) || parsed.steps.length === 0) throw new Error("bad format");
  return { steps: parsed.steps, source: "llm" };
}

// ── Nori conversational reply ─────────────────────────────────────────────────

const NORI_SYSTEM = `Tu es Nori, compagnon d'attente dans une salle d'attente de dentiste.
Tu réponds en français.
Tu n'es pas médecin. Tu ne donnes aucun avis médical.
Tu ne promets jamais qu'un soin sera indolore.
Tu ne diagnostiques rien.
Tu ne demandes aucune donnée personnelle.
Tu réponds en 2 à 4 phrases courtes maximum.
Tu es doux, précis, humain, rassurant.
Tu ramènes presque toujours vers une respiration simple ou une attente guidée.
Tu évites les mots anxiogènes sauf si l'utilisateur les emploie lui-même.
Tu préfères : "On ne va pas aller trop vite." / "On peut commencer par une respiration." / "Vous n'avez rien à réussir." / "Je reste avec vous."
Tu ne dramatises jamais. Tu ne dis pas "ne vous inquiétez pas" de façon vide.

Retourne UNIQUEMENT ce JSON strict :
{
  "text": "ta réponse en 2-4 phrases",
  "nextAction": "start_breathing",
  "cta": "texte du bouton (5 mots max)"
}`;

export async function generateNoriLLMReply(message: string): Promise<NoriReply> {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) return getNoriReply(message);

  const base = process.env.LLM_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.LLM_MODEL ?? "gpt-4o-mini";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: NORI_SYSTEM },
          { role: "user", content: message },
        ],
        temperature: 0.65,
        max_tokens: 200,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`LLM ${res.status}`);
    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    const parsed = JSON.parse(data.choices[0]?.message?.content ?? "{}") as NoriReply;
    if (!parsed.text || !parsed.cta) throw new Error("bad format");
    return { ...parsed, nextAction: parsed.nextAction ?? "start_breathing" };
  } catch (err) {
    console.error("[LLM] nori reply error, fallback:", err);
    return getNoriReply(message);
  } finally {
    clearTimeout(timeout);
  }
}
