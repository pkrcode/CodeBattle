const OpenAI = require('openai');

// Initialize OpenAI client only if key exists
function getClient() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_1 || process.env.OPENAI_APIKEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

function redact(text) {
  if (!text) return text;
  return String(text).replace(/sk-[A-Za-z0-9-_]{10,}/g, 'sk-********');
}

// Generate a smart hint for DSA or Aptitude
async function generateHint({ type, problemStatement, code, constraints }) {
  const client = getClient();
  if (!client) {
    return { hint: 'AI hint service is not configured. Ask an admin to set OPENAI_API_KEY on the server.' };
  }

  const system = type === 'aptitude'
    ? 'You are a concise aptitude tutor. Provide 1-2 short hints that guide the student without revealing the final answer. Focus on approach.'
    : 'You are a concise DSA mentor. Provide 1-2 short hints focusing on approach, data structures, and edge cases. Do not give full code.';

  const user = [
    problemStatement ? `Problem:\n${problemStatement}` : null,
    constraints ? `Constraints:\n${constraints}` : null,
    code ? `User code (optional):\n${code}` : null,
  ].filter(Boolean).join('\n\n');

  try {
    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user || 'Provide a general hint for solving a common DSA problem.' }
      ],
    });
    const content = resp.choices?.[0]?.message?.content?.trim() || 'No hint generated.';
    return { hint: content };
  } catch (err) {
    console.error('AI hint error:', redact(err?.message || err));
    return { hint: 'Unable to generate hint at the moment. Please try again later.' };
  }
}

// Generate safe aptitude question variations
async function generateAptitudeVariants({ question, count = 3 }) {
  const client = getClient();
  if (!client) {
    return { variants: [] };
  }

  const prompt = `You will create ${count} safe variations of a multiple-choice aptitude question.
Return STRICT JSON with an array under key variants. Each variant must have:
{
  "question": string,
  "options": [string, string, string, string],
  "correctIndex": 0|1|2|3,
  "explanation": string,
  "topic": string,
  "difficulty": "easy"|"medium"|"hard"
}
Preserve the underlying concept and difficulty. Do not use copyrighted text. Keep numbers small and simple.`;

  const user = JSON.stringify({ base: question }, null, 2);

  try {
    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: user }
      ],
      response_format: { type: 'json_object' }
    });
    const content = resp.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);
    const variants = Array.isArray(parsed?.variants) ? parsed.variants : [];
    // Validate shape
    const clean = variants.filter(v =>
      v && typeof v.question === 'string' &&
      Array.isArray(v.options) && v.options.length === 4 &&
      Number.isInteger(v.correctIndex) && v.correctIndex >= 0 && v.correctIndex < 4
    ).slice(0, count);
    return { variants: clean };
  } catch (err) {
    console.error('AI variation error:', redact(err?.message || err));
    return { variants: [] };
  }
}

module.exports = { generateHint, generateAptitudeVariants };
