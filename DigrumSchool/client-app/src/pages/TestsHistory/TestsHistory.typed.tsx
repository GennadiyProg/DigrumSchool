export type Order = 'asc' | 'desc';

export interface CompletedTestRow {
  id: number,
  title: string,
  score: number,
  date: string,
}