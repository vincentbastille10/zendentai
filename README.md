# ZenDentAI — Nori

Compagnon d'attente vivant pour salle d'attente de dentiste.

---

## 1. Lancement local

```bash
cd ~/Desktop/ZenDentAI
npm install
npm run dev
# → http://localhost:4000
```

---

## 2. Flow Nori

```
Arrivée
  └─ Nori se présente (NoriIntro)
       ├─ Bouton "Commencer" → Séance respiration (9 étapes)
       └─ Message utilisateur → Réponse vivante Nori → Séance respiration
                                        │
                                 Post-breathing choices
                                  ├─ Continuer doucement
                                  ├─ Voyager dans une image calme (3 paysages)
                                  ├─ Petit jeu calme (5 bulles)
                                  └─ Recommencer depuis le début
```

---

## 3. Logique "présence vivante + respiration"

- **Script local** (`lib/nori-engine.ts`) : répond sans LLM à 5 cas courants.
- **LLM** (`app/api/nori-reply/route.ts`) : si `LLM_API_KEY` est défini, génère une réponse personnalisée avec le system prompt Nori strict.
- **Fallback automatique** : si LLM absent ou erreur → script local. Aucun crash.
- Les **9 étapes respiration** sont dans `data/meditations.ts → noriBreathingSteps`.
- La config complète Nori est dans `data/nori.yaml` (référence) et `lib/nori-engine.ts` (code).

---

## 4. Remplacer les médias

**Avatar Nori** :
```
public/images/nori/nori-avatar.png
```
Si absent → fallback CSS (visage minimal + halo).

**Images paysages** :
```
public/images/ocean/main.jpg
public/images/forest/main.jpg
public/images/space/main.jpg
```
Si absent → gradient CSS premium.

**Audios** :
```
public/audio/ocean/waves.mp3
public/audio/wind/mountain-wind.mp3
public/audio/forest/birds.mp3
public/audio/rain/soft-rain.mp3
```
Interface fonctionnelle si absent.

---

## 5. Variables LLM (Vercel)

| Variable | Valeur |
|---|---|
| `LLM_API_KEY` | Clé API (OpenAI, Mistral, Together…) |
| `LLM_MODEL` | `gpt-4o-mini` |
| `LLM_PROVIDER` | `openai` |
| `LLM_BASE_URL` | `https://api.openai.com/v1` |

Sans ces variables → scripts locaux. Aucun crash.

---

## 6. Git + Vercel

```bash
cd ~/Desktop/ZenDentAI
git init
git add .
git commit -m "Add living Nori reply flow"
git remote add origin https://github.com/<vous>/zendentai.git
git push -u origin main
# Puis connecter sur vercel.com → New Project
```

---

## 7. Architecture future

| Dossier | Usage |
|---|---|
| `future/voice/` | ElevenLabs — voix Nori générée |
| `future/dashboard/` | Stats cabinet (Neon + Prisma) |
| `future/analytics/` | Suivi ambiances / intentions (Posthog) |
| `future/ai/` | Personnalisation LLM par historique |

---

## Stack

Next.js 15 · TypeScript · TailwindCSS · Framer Motion · PWA · Mobile first
