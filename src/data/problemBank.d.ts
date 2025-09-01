import { Problem, Question } from '../types';

export function getAllProblems(): Problem[];
export function getProblemById(id: string): Problem | undefined;
export function getAllQuestions(): Question[];
export function getQuestionById(id: string): Question | undefined;
export function getStarterCode(problemId: string): { cpp: string; python: string; java: string };

export {};
