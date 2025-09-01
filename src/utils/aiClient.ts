import { sampleAptitudeQuestions } from './aptitudeData';

// Use the same backend URL resolution as codeExecutionService
function resolveBackendUrl(): string {
  // Highest priority: explicit env var
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  if (envUrl && envUrl.trim().length > 0) return envUrl;

  // If running locally, prefer local backend
  if (typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost') {
    return 'http://localhost:5111';
  }

  // Fallback to Render backend in production
  return 'https://codebattle-backend-bvzj.onrender.com';
}

const BACKEND_URL = resolveBackendUrl();

export async function fetchHint(params: {
  type?: 'dsa' | 'aptitude';
  problemStatement?: string;
  code?: string;
  constraints?: string;
}): Promise<{ hint: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/ai/hint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params || {}),
    });
    if (res.ok) {
      const data = await res.json();
      return { hint: data.hint || 'No hint available' };
    }
  } catch (e) {
    // fallthrough to external fallback
  }

  // Fallback: call Gemini (or other LLM) directly if configured via env var.
  const apiKey = process.env.REACT_APP_GEMINI_KEY || '';
  if (!apiKey) return { hint: 'No hint available' };

  // Build a concise prompt for a hint
  const prompt = `Provide a concise, high-level hint (no full solution) for the following problem.\nProblem:\n${params.problemStatement || 'N/A'}\nConstraints:\n${params.constraints || 'N/A'}`;

  try {
    const res = await fetch('https://generative.googleapis.com/v1/models/text-bison-001:generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: { text: prompt },
        temperature: 0.2,
        maxOutputTokens: 200,
      }),
    });
    if (!res.ok) throw new Error('External AI hint failed');
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.[0]?.text || data?.output?.[0]?.content?.[0]?.text || '';
    return { hint: (text as string).trim() || 'No hint available' };
  } catch (e) {
    console.error('External AI hint error', e);
    return { hint: 'No hint available' };
  }
}

export async function fetchAptitudeVariants(params: {
  question: { question: string; options: string[]; correctIndex: number; topic?: string; difficulty?: string };
  count?: number;
}): Promise<{ variants: Array<{ question: string; options: string[]; correctIndex: number; explanation?: string; topic?: string; difficulty?: string }> }> {
  const res = await fetch(`${BACKEND_URL}/api/ai/aptitude/variants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params || {}),
  });
  if (!res.ok) throw new Error('Failed to get variants');
  const data = await res.json();
  return { variants: data.variants || [] };
}

// Utility to count how many aptitude questions are available locally (MVP)
export function getAptitudeQuestionCount(): number {
  return sampleAptitudeQuestions.length;
}
