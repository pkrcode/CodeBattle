import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { LangKey } from './codeStorage';

export type SubmissionStatus = 'Accepted' | 'Failed' | 'Error';

export interface SubmissionRecord {
  id: string;
  uid: string;
  problemId: string;
  language: LangKey;
  status: SubmissionStatus;
  passedTests: number;
  totalTests: number;
  executionTimeMs?: number; // aggregate or last case
  code: string;
  error?: string;
  resultsSummary?: string; // short text summary
  createdAt: Date | null;
}

export async function addSubmission(params: {
  uid: string;
  problemId: string;
  language: LangKey;
  status: SubmissionStatus;
  passedTests: number;
  totalTests: number;
  executionTimeMs?: number;
  code: string;
  error?: string;
  resultsSummary?: string;
}): Promise<string> {
  const { uid, problemId, language, status, passedTests, totalTests, executionTimeMs, code, error, resultsSummary } = params;
  const colRef = collection(db, 'users', uid, 'submissions');
  const docRef = await addDoc(colRef, {
    problemId,
    language,
    status,
    passedTests,
    totalTests,
    executionTimeMs: executionTimeMs ?? null,
    code,
    error: error ?? null,
    resultsSummary: resultsSummary ?? null,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function listSubmissions(params: { uid: string; problemId: string; limitN?: number }): Promise<SubmissionRecord[]> {
  const { uid, problemId, limitN = 20 } = params;
  const colRef = collection(db, 'users', uid, 'submissions');
  try {
    // Preferred: indexed query with where + orderBy
    const q = query(colRef, where('problemId', '==', problemId), orderBy('createdAt', 'desc'), limit(limitN));
    const snap = await getDocs(q);
    const items: SubmissionRecord[] = [];
    snap.forEach((d) => {
      const data: any = d.data();
      const ts = data.createdAt && typeof data.createdAt.toDate === 'function' ? (data.createdAt.toDate() as Date) : null;
      items.push({
        id: d.id,
        uid,
        problemId: data.problemId,
        language: data.language,
        status: data.status,
        passedTests: data.passedTests ?? 0,
        totalTests: data.totalTests ?? 0,
        executionTimeMs: data.executionTimeMs ?? undefined,
        code: data.code ?? '',
        error: data.error ?? undefined,
        resultsSummary: data.resultsSummary ?? undefined,
        createdAt: ts,
      });
    });
    return items;
  } catch (err: any) {
    // Fallback when composite index is missing: fetch without orderBy, sort client-side
    const msg = typeof err?.message === 'string' ? err.message : '';
    if (!msg.includes('requires an index')) throw err;
    const q2 = query(colRef, where('problemId', '==', problemId));
    const snap2 = await getDocs(q2);
    const all: SubmissionRecord[] = [];
    snap2.forEach((d) => {
      const data: any = d.data();
      const ts = data.createdAt && typeof data.createdAt.toDate === 'function' ? (data.createdAt.toDate() as Date) : null;
      all.push({
        id: d.id,
        uid,
        problemId: data.problemId,
        language: data.language,
        status: data.status,
        passedTests: data.passedTests ?? 0,
        totalTests: data.totalTests ?? 0,
        executionTimeMs: data.executionTimeMs ?? undefined,
        code: data.code ?? '',
        error: data.error ?? undefined,
        resultsSummary: data.resultsSummary ?? undefined,
        createdAt: ts,
      });
    });
    all.sort((a, b) => {
      const at = a.createdAt ? a.createdAt.getTime() : 0;
      const bt = b.createdAt ? b.createdAt.getTime() : 0;
      return bt - at;
    });
    return all.slice(0, limitN);
  }
}
