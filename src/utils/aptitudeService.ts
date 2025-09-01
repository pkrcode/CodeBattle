// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { db } from '../firebase/config';
import {
	AptitudeChallenge,
	AptitudeDifficulty,
	AptitudeQuestion,
	ChallengeMode,
	AptitudeSessionRecord,
} from '../types';
import { filterQuestions, getLocalAptitudeQuestions, randomizeQuestion } from './aptitudeData';

// NOTE: Minimal stub for now. Later, persist to Firestore under
// collections: challenges, users/{uid}/challenges, questions (curated dataset).

export async function createLocalChallenge(params: {
	createdBy: string;
	mode: ChallengeMode;
	difficulty: AptitudeDifficulty;
	rules?: { maxWrong?: number };
	numQuestions?: number;
}): Promise<{
	challenge: AptitudeChallenge;
	questions: AptitudeQuestion[];
}> {
	const { createdBy, mode, difficulty } = params;
	const maxWrong = params.rules?.maxWrong ?? 3;
	const numQuestions = params.numQuestions ?? 15;
	const questions = getLocalAptitudeQuestions(difficulty, numQuestions);
	const challenge: AptitudeChallenge = {
		id: `local-${Date.now()}`,
		mode,
		difficulty,
		createdBy,
		status: 'active',
		rules: { maxWrong },
		participants: [
			{
				uid: createdBy,
				displayName: 'You',
				score: 0,
				wrong: 0,
				joinedAt: new Date(),
			},
		],
		questions: questions.map(q => q.id),
		createdAt: new Date(),
		startedAt: new Date(),
	};

	return { challenge, questions };
}

export type AnswerResult = {
	correct: boolean;
	newScore: number;
	wrong: number;
	finished: boolean;
};

export function scoreAnswer(args: {
	challenge: AptitudeChallenge;
	currentScore: number;
	currentWrong: number;
	isCorrect: boolean;
}): AnswerResult {
	const { challenge, currentScore, currentWrong, isCorrect } = args;
	const newScore = isCorrect ? currentScore + 1 : currentScore;
	const wrong = isCorrect ? currentWrong : currentWrong + 1;
	const finished = wrong >= challenge.rules.maxWrong;
	return { correct: isCorrect, newScore, wrong, finished };
}

// Practice sessions (MVP: local)
export function createPracticeSet(args: {
	topics?: string[];
	difficulty?: AptitudeDifficulty | 'all';
	count?: number;
	randomizeEachRun?: boolean;
}): AptitudeQuestion[] {
	const q = filterQuestions({ topics: args.topics, difficulty: args.difficulty, limit: args.count ?? 15 });
	return (args.randomizeEachRun ? q.map(randomizeQuestion) : q);
}

const LS_KEY = 'aptitude_progress_v1';
type StoredProgress = {
	sessions: AptitudeSessionRecord[];
};

export function loadAptitudeProgress(uid: string): StoredProgress {
	try {
		const raw = localStorage.getItem(`${LS_KEY}:${uid}`);
		if (!raw) return { sessions: [] };
		const parsed = JSON.parse(raw);
		// revive dates
		parsed.sessions = (parsed.sessions || []).map((s: any) => ({
			...s,
			startedAt: s.startedAt ? new Date(s.startedAt) : new Date(),
			endedAt: s.endedAt ? new Date(s.endedAt) : new Date(),
		}));
		return parsed;
	} catch {
		return { sessions: [] };
	}
}

export function saveAptitudeSession(uid: string, session: AptitudeSessionRecord) {
	const data = loadAptitudeProgress(uid);
	data.sessions.unshift(session);
	localStorage.setItem(`${LS_KEY}:${uid}`, JSON.stringify(data));
}

export function summarizeProgress(uid: string) {
	const data = loadAptitudeProgress(uid);
	const byTopic = new Map<string, { attempts: number; correct: number; wrong: number }>();
	for (const s of data.sessions) {
		for (const t of s.topics) {
			const rec = byTopic.get(t) || { attempts: 0, correct: 0, wrong: 0 };
			rec.attempts += 1;
			rec.correct += s.correct;
			rec.wrong += s.wrong;
			byTopic.set(t, rec);
		}
	}
	return { sessions: data.sessions, byTopic };
}

