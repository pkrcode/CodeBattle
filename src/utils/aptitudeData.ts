// Local sample dataset for Aptitude MCQs.
// Note: Do not scrape or copy external content. Use curated or user-contributed questions.
// This file seeds a minimal set and defines the shape for future expansion.

import { AptitudeQuestion, AptitudeDifficulty } from '../types';

// Curated aptitude topics (Quantitative, Logical Reasoning, Verbal subset)
export const aptitudeTopics = [
	// Quantitative
	'Numbers',
	'Percentages',
	'Ratio & Proportion',
	'Averages',
	'Profit & Loss',
	'Simple Interest',
	'Compound Interest',
	'Time & Work',
	'Time, Speed & Distance',
	'Pipes & Cisterns',
	'Mixtures & Alligation',
	'LCM & HCF',
	'Ages',
	'Permutation & Combination',
	'Probability',
	'Progressions',
	'Logarithms',
	'Geometry',
	'Mensuration 2D',
	'Mensuration 3D',
	'Trains',
	'Boats & Streams',
	'Clocks',
	'Calendars',
	'Simplification',
	'Data Interpretation',
	// Logical Reasoning (subset)
	'Number Series',
	'Analogies',
	'Classification',
	'Blood Relations',
	'Directions',
	'Statements & Conclusions',
	'Coding-Decoding',
] as const;

export const sampleAptitudeQuestions: AptitudeQuestion[] = [
	// Percentages
	{ id: 'apt-0001', difficulty: 'easy', topic: 'Percentages', question: 'What is 25% of 160?', options: ['30', '35', '40', '45'], correctIndex: 2, explanation: '25% of 160 = 160/4 = 40.' },
	{ id: 'apt-0002', difficulty: 'medium', topic: 'Percentages', question: 'A value increases from 80 to 100. What is the percent increase?', options: ['20%', '25%', '30%', '22.5%'], correctIndex: 1, explanation: 'Increase = 20 on base 80 → 20/80 = 0.25 = 25%.' },
	// Ratio & Proportion
	{ id: 'apt-0003', difficulty: 'easy', topic: 'Ratio & Proportion', question: 'Simplify the ratio 18:24.', options: ['3:4', '4:3', '6:8', '9:12'], correctIndex: 0, explanation: 'Divide both by 6 → 3:4.' },
	{ id: 'apt-0004', difficulty: 'medium', topic: 'Ratio & Proportion', question: 'If a:b = 2:3 and b:c = 4:5, then a:c = ?', options: ['8:15', '2:5', '3:10', '4:15'], correctIndex: 0, explanation: 'Make b common: a:b = 8:12 and b:c = 12:15 → a:c = 8:15.' },
	// Averages
	{ id: 'apt-0005', difficulty: 'easy', topic: 'Averages', question: 'Average of 6, 8, 10, 12 is?', options: ['8', '9', '10', '9.5'], correctIndex: 1, explanation: 'Sum 36 / 4 = 9.' },
	{ id: 'apt-0006', difficulty: 'medium', topic: 'Averages', question: 'Average of 5 numbers is 20. Sum of first four is 70. The fifth number is?', options: ['25', '30', '35', '20'], correctIndex: 1, explanation: 'Total = 20×5 = 100. Fifth = 100 - 70 = 30.' },
	// Profit & Loss
	{ id: 'apt-0007', difficulty: 'easy', topic: 'Profit & Loss', question: 'CP = 200, SP = 240. Profit % = ?', options: ['10%', '15%', '20%', '25%'], correctIndex: 2, explanation: 'Profit 40 on 200 → 20%.' },
	{ id: 'apt-0008', difficulty: 'medium', topic: 'Profit & Loss', question: 'Marked Price = 1000, discount 10%, then 10% on SP. Effective discount ≈ ?', options: ['19%', '20%', '21%', '18%'], correctIndex: 0, explanation: 'Effective factor 0.9 × 0.9 = 0.81 ⇒ discount = 1 - 0.81 = 0.19 = 19%.' },
	// Simple Interest
	{ id: 'apt-0009', difficulty: 'easy', topic: 'Simple Interest', question: 'SI on 1000 at 10% p.a. for 2 years is?', options: ['100', '150', '200', '250'], correctIndex: 2, explanation: 'SI = PRT/100 = 1000×10×2/100 = 200.' },
	// Compound Interest
	{ id: 'apt-0010', difficulty: 'medium', topic: 'Compound Interest', question: 'Amount on 1000 at 10% p.a. compounded annually for 2 years?', options: ['1100', '1200', '1210', '1220'], correctIndex: 2, explanation: 'A = 1000 × 1.1 × 1.1 = 1210.' },
	// Time & Work
	{ id: 'apt-0011', difficulty: 'medium', topic: 'Time & Work', question: 'A completes a work in 6 days, B in 12 days. Together they take?', options: ['3 days', '4 days', '5 days', '6 days'], correctIndex: 1, explanation: 'Rates 1/6 + 1/12 = 1/4 → 4 days.' },
	// Time, Speed & Distance
	{ id: 'apt-0012', difficulty: 'easy', topic: 'Time, Speed & Distance', question: 'Speed 60 km/h for 2 hours. Distance = ?', options: ['100 km', '110 km', '120 km', '90 km'], correctIndex: 2, explanation: 'd = st = 60×2 = 120 km.' },
	// Pipes & Cisterns
	{ id: 'apt-0013', difficulty: 'medium', topic: 'Pipes & Cisterns', question: 'A fills tank in 4h, B fills in 6h. Together?', options: ['2.4 h', '3 h', '3.5 h', '5 h'], correctIndex: 0, explanation: '1/4+1/6=5/12 → 12/5=2.4h.' },
	// Mixtures
	{ id: 'apt-0014', difficulty: 'medium', topic: 'Mixtures & Alligation', question: 'Mix 2 L of 30% solution with 3 L of 50%. Result concentration?', options: ['40%', '42%', '44%', '46%'], correctIndex: 1, explanation: '(0.3×2+0.5×3)/(5)= (0.6+1.5)/5=2.1/5=42%.' },
	// LCM & HCF
	{ id: 'apt-0015', difficulty: 'easy', topic: 'LCM & HCF', question: 'LCM of 12 and 18?', options: ['24', '30', '36', '48'], correctIndex: 2, explanation: '12: 2²×3; 18: 2×3² → LCM 2²×3²=36.' },
	// Ages
	{ id: 'apt-0016', difficulty: 'medium', topic: 'Ages', question: 'Sum of ages of A and B is 40. A is 4 years older. Age of B?', options: ['18', '19', '20', '22'], correctIndex: 0, explanation: 'Let B=x, A=x+4 → x+(x+4)=40 ⇒ x=18.' },
	// PnC
	{ id: 'apt-0017', difficulty: 'medium', topic: 'Permutation & Combination', question: 'How many ways to arrange letters of WORD (distinct)?', options: ['12', '24', '48', '6'], correctIndex: 1, explanation: '4! = 24.' },
	// Probability
	{ id: 'apt-0018', difficulty: 'easy', topic: 'Probability', question: 'Probability of getting a 4 on a fair die?', options: ['1/3', '1/4', '1/6', '1/5'], correctIndex: 2, explanation: 'One favorable out of 6.' },
	// Progressions
	{ id: 'apt-0019', difficulty: 'medium', topic: 'Progressions', question: 'Sum of first n terms of AP with a=3, d=2 for n=5?', options: ['25', '35', '40', '45'], correctIndex: 1, explanation: 'S5 = 5/2 [2×3 + 4×2] = 5/2 × 14 = 35.' },
	// Logarithms
	{ id: 'apt-0020', difficulty: 'hard', topic: 'Logarithms', question: 'If log10(x)=2, x = ?', options: ['10', '100', '1000', '1'], correctIndex: 1, explanation: 'log10(x)=2 → x=10²=100.' },
	// Geometry
	{ id: 'apt-0021', difficulty: 'easy', topic: 'Geometry', question: 'Area of a triangle with base 10 and height 6?', options: ['20', '25', '30', '40'], correctIndex: 2, explanation: '½×10×6=30.' },
	// Mensuration 2D
	{ id: 'apt-0022', difficulty: 'easy', topic: 'Mensuration 2D', question: 'Circumference of a circle of radius 7?', options: ['22', '44', '88', '14π'], correctIndex: 1, explanation: '2πr ≈ 2×22/7×7 = 44.' },
	// Mensuration 3D
	{ id: 'apt-0023', difficulty: 'medium', topic: 'Mensuration 3D', question: 'Volume of a cube with side 5?', options: ['15', '25', '75', '125'], correctIndex: 3, explanation: 'a³=125.' },
	// Trains
	{ id: 'apt-0024', difficulty: 'medium', topic: 'Trains', question: 'Train 120 m long crosses a pole in 6 s. Speed?', options: ['10 m/s', '15 m/s', '20 m/s', '25 m/s'], correctIndex: 2, explanation: 'Speed = distance/time = 120/6 = 20 m/s.' },
	// Boats & Streams
	{ id: 'apt-0025', difficulty: 'medium', topic: 'Boats & Streams', question: 'Boat speed in still water 12 km/h, stream 3 km/h. Downstream speed?', options: ['9', '12', '15', '18'], correctIndex: 2, explanation: 'Downstream = 12+3=15 km/h.' },
	// Clocks
	{ id: 'apt-0026', difficulty: 'hard', topic: 'Clocks', question: 'Angle between hour and minute hands at 3:20?', options: ['0°', '20°', '40°', '80°'], correctIndex: 1, explanation: 'Minute hand = 20×6 = 120°. Hour hand = 3×30 + 20×0.5 = 90 + 10 = 100°. |120−100| = 20°.' },
	// Calendars
	{ id: 'apt-0027', difficulty: 'hard', topic: 'Calendars', question: 'If a year is not a leap year, how many odd days does it have?', options: ['0', '1', '2', '3'], correctIndex: 1, explanation: '365 = 52 weeks + 1 day ⇒ 1 odd day.' },
	// Simplification
	{ id: 'apt-0028', difficulty: 'easy', topic: 'Simplification', question: 'Evaluate 48 ÷ 4 × 3 + 2.', options: ['38', '14', '38?', '38.0'], correctIndex: 0, explanation: '48/4=12; 12×3=36; 36+2=38.' },
	// Data Interpretation (basic)
	{ id: 'apt-0029', difficulty: 'medium', topic: 'Data Interpretation', question: 'A class has 20 boys and 15 girls. What percent are girls?', options: ['40%', '42.5%', '43%', '45%'], correctIndex: 1, explanation: '15/35≈0.4286 → 42.86% ≈ 42.5%.' },
	// Number Series
	{ id: 'apt-0030', difficulty: 'easy', topic: 'Number Series', question: 'Find the next number: 2, 6, 12, 20, ?', options: ['28', '30', '32', '34'], correctIndex: 1, explanation: 'Differences +4, +6, +8, +10 ⇒ next is 30.' },
	// Analogies
	{ id: 'apt-0031', difficulty: 'easy', topic: 'Analogies', question: 'Puppy : Dog :: Kitten : ?', options: ['Cat', 'Cub', 'Foal', 'Calf'], correctIndex: 0, explanation: 'Young one of a cat is a kitten.' },
	// Classification (odd one out)
	{ id: 'apt-0032', difficulty: 'easy', topic: 'Classification', question: 'Pick the odd one out: 3, 5, 7, 9', options: ['3', '5', '7', '9'], correctIndex: 3, explanation: '9 is not prime.' },
	// Blood Relations
	{ id: 'apt-0033', difficulty: 'medium', topic: 'Blood Relations', question: 'If A is brother of B and B is sister of C, then A is ___ of C.', options: ['Brother', 'Sister', 'Cousin', 'Uncle'], correctIndex: 0, explanation: 'A male sibling of B; B and C siblings → A is brother of C.' },
	// Directions
	{ id: 'apt-0034', difficulty: 'medium', topic: 'Directions', question: 'Facing North, you turn right, then right, then left. Final direction?', options: ['North', 'East', 'South', 'West'], correctIndex: 1, explanation: 'Right from North → East; then South; then left → East.' },
	// Statements & Conclusions (Syllogism-like)
	{ id: 'apt-0035', difficulty: 'hard', topic: 'Statements & Conclusions', question: 'All apples are fruits. Some fruits are sweet. Conclusion: Some apples may be sweet.', options: ['True', 'False', 'Cannot be determined', 'Both true and false'], correctIndex: 0, explanation: 'Possibility exists; conclusion is logically possible.' },
	// Coding-Decoding
	{ id: 'apt-0036', difficulty: 'medium', topic: 'Coding-Decoding', question: 'If CAT is coded as DBU, then DOG is coded as?', options: ['EPH', 'DPH', 'FPG', 'EOH'], correctIndex: 0, explanation: 'Each letter shifted +1: C→D, A→B, T→U; D→E, O→P, G→H → EPH.' },
];

export function getLocalAptitudeQuestions(
	difficulty?: AptitudeDifficulty,
	limit = 20
): AptitudeQuestion[] {
	const pool = difficulty
		? sampleAptitudeQuestions.filter(q => q.difficulty === difficulty)
		: sampleAptitudeQuestions;
	// Shuffle copy
	const arr = [...pool];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr.slice(0, Math.min(limit, arr.length));
}

// TODO: Replace with Firestore-backed dataset once curated questions are available.
// For large datasets (1000+), store questions in Firestore collections partitioned by difficulty/topic
// and page with query cursors.

export type TopicFilter = string | 'all';

export function filterQuestions(args: {
	topics?: TopicFilter[];
	difficulty?: AptitudeDifficulty | 'all';
	limit?: number;
}): AptitudeQuestion[] {
	const { topics, difficulty, limit = 20 } = args;
	let pool = [...sampleAptitudeQuestions];
	if (difficulty && difficulty !== 'all') {
		pool = pool.filter(q => q.difficulty === difficulty);
	}
	if (topics && topics.length && !topics.includes('all')) {
		const set = new Set(topics);
		pool = pool.filter(q => set.has(q.topic));
	}
	// shuffle
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool.slice(0, Math.min(limit, pool.length));
}

// Slight randomization for repeated practice: shuffle options and tweak numeric values in question/options when safe
export function randomizeQuestion(q: AptitudeQuestion): AptitudeQuestion {
	// Try to parse numeric values and nudge by up to ±10% for certain patterns
	const tweak = (text: string): string => {
		return text.replace(/\b(\d+)(?:\.(\d+))?\b/g, (m) => {
			const val = Number(m);
			if (!Number.isFinite(val) || val === 0) return m;
			const factor = 1 + (Math.random() * 0.2 - 0.1); // ±10%
			const tweaked = Math.round(val * factor);
			// Ensure positive and not identical to original
			return String(Math.max(1, tweaked === val ? val + 1 : tweaked));
		});
	};

	const newOptions = [...q.options];
	// Shuffle options and recompute correct index
	const indices = newOptions.map((_, i) => i);
	for (let i = indices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[indices[i], indices[j]] = [indices[j], indices[i]];
	}
	const shuffled = indices.map(i => newOptions[i]);
	const newCorrect = indices.indexOf(q.correctIndex);

		// For safety, only tweak values for numeric-heavy topics
		const numericTopics = new Set<string>([
			'Numbers','Percentages','Ratio & Proportion','Averages','Profit & Loss','Simple Interest','Compound Interest','Time & Work','Time, Speed & Distance','Pipes & Cisterns','Mixtures & Alligation','LCM & HCF','Ages','Permutation & Combination','Probability','Progressions','Logarithms','Geometry','Mensuration 2D','Mensuration 3D','Trains','Boats & Streams','Clocks','Calendars','Simplification','Data Interpretation'
		]);
		const shouldTweak = numericTopics.has(q.topic) && /\d/.test(q.question);

	return {
		...q,
	question: shouldTweak ? tweak(q.question) : q.question,
	options: shouldTweak ? shuffled.map(tweak) : shuffled,
		correctIndex: newCorrect,
	};
}

