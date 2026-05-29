"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NoriIntro from "@/components/NoriIntro";
import { GuideSession } from "@/components/GuideSession";
import { PostBreathingChoices, PostBreathingChoice } from "@/components/PostBreathingChoices";
import { CalmGamePreview } from "@/components/CalmGamePreview";
import { AmbienceSelector } from "@/components/AmbienceSelector";
import { AmbientBackground } from "@/components/AmbientBackground";
import { SoftButton } from "@/components/SoftButton";
import { NoriAvatar } from "@/components/NoriAvatar";
import { PractitionerValuePanel } from "@/components/PractitionerValuePanel";
import { noriBreathingSteps } from "@/data/meditations";

type Screen =
  | "intro"
  | "breathing"
  | "post-breathing"
  | "calm-image-select"
  | "calm-image-view"
  | "calm-game"
  | "practitioner";

function ScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0 overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CalmImageView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-14 text-white">
      <div />
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <NoriAvatar size="sm" animate className="mx-auto mb-6" />
        <p className="font-display text-2xl text-white mb-2">Laissez-vous aller.</p>
        <p className="text-white/60 text-sm">Restez ici aussi longtemps que vous voulez.</p>
      </motion.div>
      <SoftButton onClick={onBack} size="md" variant="ghost">
        Revenir
      </SoftButton>
    </div>
  );
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [calmAmbienceId, setCalmAmbienceId] = useState<string | null>(null);

  const bgAmbienceId =
    screen === "calm-image-view" || screen === "calm-image-select" ? calmAmbienceId : null;

  function handlePostBreathing(choice: PostBreathingChoice) {
    if (choice === "continue")         setScreen("breathing");
    else if (choice === "calm-image")  setScreen("calm-image-select");
    else if (choice === "calm-game")   setScreen("calm-game");
    else if (choice === "practitioner") setScreen("practitioner");
    else                               setScreen("intro");
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background only outside intro (NoriIntro manages its own background) */}
      {screen !== "intro" && <AmbientBackground ambienceId={bgAmbienceId} />}

      <AnimatePresence mode="wait">
        {/* ── Intro Nori ── */}
        {screen === "intro" && (
          <motion.div
            key="intro"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NoriIntro onStart={() => setScreen("breathing")} />
          </motion.div>
        )}

        {/* ── Respiration guidée ── */}
        {screen === "breathing" && (
          <ScreenWrapper key="breathing">
            <GuideSession
              predefinedSteps={noriBreathingSteps}
              showNori
              onComplete={() => setScreen("post-breathing")}
            />
          </ScreenWrapper>
        )}

        {/* ── Post-respiration ── */}
        {screen === "post-breathing" && (
          <ScreenWrapper key="post-breathing">
            <PostBreathingChoices onChoice={handlePostBreathing} />
          </ScreenWrapper>
        )}

        {/* ── Choix image calme ── */}
        {screen === "calm-image-select" && (
          <ScreenWrapper key="calm-image-select">
            <div className="flex flex-col min-h-screen px-5 pt-12 pb-6 text-white">
              <motion.p
                className="text-white/55 text-xs tracking-[0.2em] uppercase text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Choisissez un paysage
              </motion.p>
              <AmbienceSelector
                limitIds={["ocean", "forest", "space"]}
                onSelect={(id) => {
                  setCalmAmbienceId(id);
                  setScreen("calm-image-view");
                }}
              />
            </div>
          </ScreenWrapper>
        )}

        {/* ── Vue image calme ── */}
        {screen === "calm-image-view" && (
          <ScreenWrapper key="calm-image-view">
            <CalmImageView onBack={() => setScreen("post-breathing")} />
          </ScreenWrapper>
        )}

        {/* ── Jeu calme : Souffler la feuille ── */}
        {screen === "calm-game" && (
          <ScreenWrapper key="calm-game">
            <CalmGamePreview onDone={() => setScreen("post-breathing")} />
          </ScreenWrapper>
        )}

        {/* ── Section praticien ── */}
        {screen === "practitioner" && (
          <ScreenWrapper key="practitioner">
            <PractitionerValuePanel onBack={() => setScreen("post-breathing")} />
          </ScreenWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}
