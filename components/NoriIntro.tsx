"use client";

import { useState } from "react";

type NoriIntroProps = {
  onStart: () => void;
};

export default function NoriIntro({ onStart }: NoriIntroProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    "Bonjour, je suis Nori.\n\nJe reste avec vous quelques instants.\n\nOn commence par respirer ensemble ?\n\nÇa marche presque tout le temps 🙂"
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
          "Je vous entends.\n\nOn va faire simple.\n\nJe vous propose de respirer quelques instants ensemble."
      );
      setMessage("");
    } catch {
      setReply(
        "Je vous entends.\n\nOn va faire simple.\n\nJe vous propose de respirer quelques instants ensemble."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#071B2C] text-[#F8FAFC]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(94,214,200,0.28),_transparent_34%),linear-gradient(180deg,_#0F4C5C_0%,_#0B2E45_38%,_#071B2C_100%)]" />
      <div className="fixed inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.16),_transparent_22%),radial-gradient(circle_at_85%_12%,_rgba(94,214,200,0.18),_transparent_18%),radial-gradient(circle_at_50%_92%,_rgba(255,255,255,0.10),_transparent_20%)]" />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-[430px] mx-auto">
          <div className="relative rounded-[2.25rem] border border-white/15 bg-white/[0.08] shadow-2xl backdrop-blur-xl px-5 pt-6 pb-5 overflow-hidden">
            <div className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#5ED6C8]/25 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              {/* Avatar Nori */}
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-[#5ED6C8]/25 blur-2xl scale-125" />
                <div className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full bg-[#EAFDFC] shadow-[0_20px_70px_rgba(94,214,200,0.28)] flex items-center justify-center overflow-hidden border border-white/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/nori/nori-avatar.png"
                    alt="Nori"
                    className="h-full w-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>

              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8EF2E7] mb-3">
                ZenDentAI
              </p>

              {/* Bulle de parole */}
              <div className="w-full rounded-[1.75rem] border border-white/15 bg-[#F8FAFC]/95 px-5 py-5 shadow-xl">
                <p className="whitespace-pre-line text-left text-[22px] leading-[1.18] font-semibold text-[#0B2E45]">
                  {reply}
                </p>
              </div>

              {/* Bouton principal */}
              <button
                type="button"
                onClick={onStart}
                className="mt-5 w-full rounded-2xl bg-[#5ED6C8] px-6 py-4 text-[18px] font-extrabold text-[#052238] shadow-[0_16px_40px_rgba(94,214,200,0.30)] transition active:scale-[0.98]"
              >
                Respirer avec Nori
              </button>

              {/* Lien discret chat */}
              {!chatOpen && (
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="mt-3 w-full rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-[#D9FAF7] transition active:scale-[0.99]"
                >
                  Parler un instant avec Nori
                </button>
              )}

              {/* Zone de chat */}
              {chatOpen && (
                <div className="mt-4 w-full space-y-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez quelques mots à Nori…"
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-white/20 bg-white/[0.10] px-4 py-4 text-[#F8FAFC] outline-none placeholder:text-[#CFE7EA]/65 focus:border-[#5ED6C8]"
                  />

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={loading}
                      className="w-full rounded-2xl bg-[#F8FAFC] px-5 py-3 font-bold text-[#0B2E45] transition active:scale-[0.98] disabled:opacity-60"
                    >
                      {loading ? "Nori vous répond…" : "Envoyer à Nori"}
                    </button>

                    <button
                      type="button"
                      onClick={onStart}
                      className="w-full rounded-2xl border border-white/15 px-5 py-3 font-semibold text-[#F8FAFC] transition active:scale-[0.98]"
                    >
                      Respirer maintenant
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-5 max-w-[330px] text-center text-[11px] leading-relaxed text-[#CFE7EA]/70">
                Nori ne remplace pas l'équipe du cabinet. Pour toute question sur votre soin,
                adressez-vous à l'accueil ou au praticien.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
