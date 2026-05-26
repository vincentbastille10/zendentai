"use client";

import { useState } from "react";

type NoriIntroProps = {
  onStart: () => void;
};

export default function NoriIntro({ onStart }: NoriIntroProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    "Bonjour, je suis Nori.\n\nJe vais rester avec vous quelques instants.\n\nOn commence simplement par respirer ensemble ?\n\nÇa marche presque tout le temps 🙂"
  );
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    setLoading(true);

    try {
      const res = await fetch("/api/nori-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: cleanMessage }),
      });

      const data = await res.json();

      setReply(
        data?.text ||
          "Je vous entends. On va faire simple. Je vous propose de commencer par quelques respirations."
      );
      setMessage("");
    } catch {
      setReply(
        "Je vous entends. On va faire simple. Je vous propose de commencer par quelques respirations."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#071B2C] text-[#F8FAFC]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(94,214,200,0.22),_transparent_34%),linear-gradient(135deg,_#071B2C_0%,_#0B2E45_50%,_#0F4C5C_100%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl grid gap-6 md:grid-cols-[0.95fr_1.05fr] items-center">
          {/* Colonne image */}
          <section className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl min-h-[320px] md:min-h-[620px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/nori/nori-scene.png"
              alt="Nori, compagnon d'attente"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B2C]/80 via-[#071B2C]/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-[#071B2C]/55 backdrop-blur-md px-5 py-4">
              <p className="text-sm text-[#CFE7EA]">
                Un moment doux avant votre rendez-vous.
              </p>
            </div>
          </section>

          {/* Colonne contenu */}
          <section className="rounded-[2rem] border border-white/20 bg-[#071B2C]/75 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#5ED6C8]">
              ZenDentAI
            </p>

            {/* Bulle de parole Nori */}
            <div className="rounded-3xl bg-white/10 border border-white/15 px-5 py-5 md:px-7 md:py-7">
              <p className="whitespace-pre-line text-2xl md:text-4xl font-semibold leading-tight text-[#F8FAFC]">
                {reply}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {/* Bouton principal */}
              <button
                type="button"
                onClick={onStart}
                className="w-full rounded-2xl bg-[#F8FAFC] px-6 py-4 text-lg font-bold text-[#0B2E45] shadow-xl transition hover:scale-[1.015] active:scale-[0.99]"
              >
                Respirer avec Nori
              </button>

              {/* Lien discret pour ouvrir le chat */}
              {!chatOpen && (
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="w-full rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-[#CFE7EA] transition hover:bg-white/10"
                >
                  Parler un instant avec Nori
                </button>
              )}
            </div>

            {/* Zone de chat — visible uniquement si ouverte */}
            {chatOpen && (
              <div className="mt-5 space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez quelques mots à Nori…"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-[#F8FAFC] outline-none placeholder:text-[#CFE7EA]/65 focus:border-[#5ED6C8]"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={loading}
                    className="flex-1 rounded-2xl bg-[#5ED6C8] px-5 py-3 font-bold text-[#071B2C] transition hover:scale-[1.01] disabled:opacity-60"
                  >
                    {loading ? "Nori vous répond…" : "Envoyer à Nori"}
                  </button>

                  <button
                    type="button"
                    onClick={onStart}
                    className="flex-1 rounded-2xl border border-white/15 px-5 py-3 font-semibold text-[#F8FAFC] transition hover:bg-white/10"
                  >
                    Respirer maintenant
                  </button>
                </div>
              </div>
            )}

            <p className="mt-6 text-xs leading-relaxed text-[#CFE7EA]/70">
              Nori ne remplace pas l'équipe du cabinet. Pour toute question sur votre soin,
              adressez-vous à l'accueil ou au praticien.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
