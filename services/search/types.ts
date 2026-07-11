export interface SearchResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
}

export interface SearchProvider {
  search(query: string): Promise<SearchResponse>;
}