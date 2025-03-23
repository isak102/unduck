/**
 * Represents a search engine bang command
 */
export interface Bang {
  /** The search engine name/title */
  t: string;
  /** The search URL template with {{{s}}} placeholder for the search term */
  u: string;
  /** Description of the search engine */
  d: string;
  /** Rank/priority of the bang */
  r: number;
  /** Search engine name/source */
  s: string;
  /** Category (optional) */
  c?: string;
  /** Subcategory (optional) */
  sc?: string;
  /** Wether the bang is custom or not (optional) */
  custom?: boolean;
}
