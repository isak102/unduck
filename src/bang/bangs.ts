import { customBangs } from "./custom-bangs";
import { ddgBangs } from "./ddg-bangs";

export const bangs = [...customBangs, ...ddgBangs] as const;
