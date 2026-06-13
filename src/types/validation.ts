export type Verdict = 'valid' | 'risky' | 'invalid';
export type CompetitionLevel = 'low' | 'medium' | 'high';
export type MarketFit = 'strong' | 'moderate' | 'weak';
export type PainLevel = 'high' | 'medium' | 'low';

export interface Competitor {
  name: string;
  url: string;
  note: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RedditPost {
  id: string;
  title: string;
  url: string;
  subreddit: string;
  score: number;
  commentCount: number;
  painLevel: PainLevel;
  excerpt: string;
}

export interface ValidationReport {
  verdict: Verdict;
  summary: string;
  demandScore: number;
  competitionLevel: CompetitionLevel;
  marketFit: MarketFit;
  keywords: string[];
  competitors: Competitor[];
  swot: SwotAnalysis;
  redditPosts: RedditPost[];
}

export interface ValidateIdeaRequest {
  idea: string;
  sessionId?: string;
}

export interface ValidateIdeaResponse {
  report: ValidationReport;
  cached: boolean;
  createdAt: string;
}
