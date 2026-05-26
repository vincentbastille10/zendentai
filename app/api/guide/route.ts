import { NextRequest, NextResponse } from "next/server";
import { generateGuidedSession, type GuideInput } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<GuideInput>;

    if (!body.ambience || !body.intention) {
      return NextResponse.json(
        { error: "Champs requis manquants : ambience, intention" },
        { status: 400 }
      );
    }

    const result = await generateGuidedSession({
      ambience: body.ambience,
      intention: body.intention,
      durationMinutes: body.durationMinutes ?? 5,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[API /guide]", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
