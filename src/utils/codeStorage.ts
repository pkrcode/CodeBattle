import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export type LangKey = 'cpp' | 'python' | 'java';

const LANGS: LangKey[] = ['cpp', 'python', 'java'];

function draftKey(problemId: string, language: LangKey) {
  return `draft:${problemId}:${language}`;
}

function draftDocRef(uid: string, problemId: string) {
  return doc(db, 'users', uid, 'drafts', problemId);
}

export async function saveDraftToCloud(params: { uid: string; problemId: string; language: LangKey; code: string }) {
  const { uid, problemId, language, code } = params;
  const ref = draftDocRef(uid, problemId);
  await setDoc(
    ref,
    {
      [language]: code,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function loadDraftFromCloud(params: { uid: string; problemId: string; language: LangKey }): Promise<string | null> {
  const { uid, problemId, language } = params;
  const snap = await getDoc(draftDocRef(uid, problemId));
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  return typeof data?.[language] === 'string' ? (data[language] as string) : null;
}

export function saveDraftToLocal(params: { problemId: string; language: LangKey; code: string }) {
  const { problemId, language, code } = params;
  try {
    localStorage.setItem(draftKey(problemId, language), code);
  } catch {}
}

export function loadDraftFromLocal(params: { problemId: string; language: LangKey }): string | null {
  const { problemId, language } = params;
  try {
    return localStorage.getItem(draftKey(problemId, language));
  } catch {
    return null;
  }
}

export async function migrateGuestDraftsForProblem(uid: string, problemId: string) {
  const updates: Record<string, string> = {};
  for (const lang of LANGS) {
    const val = loadDraftFromLocal({ problemId, language: lang });
    if (val && val.length > 0) {
      updates[lang] = val;
    }
  }
  if (Object.keys(updates).length > 0) {
    await setDoc(
      draftDocRef(uid, problemId),
      {
        ...updates,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    // cleanup migrated keys
    for (const lang of Object.keys(updates)) {
      try { localStorage.removeItem(draftKey(problemId, lang as LangKey)); } catch {}
    }
  }
}
