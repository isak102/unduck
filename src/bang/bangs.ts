import { Bang } from "../types";
import { customBangs } from "./custom-bangs";
import { ddgBangs } from "./ddg-bangs";

export const bangs: Bang[] = [...customBangs, ...ddgBangs] as const;
