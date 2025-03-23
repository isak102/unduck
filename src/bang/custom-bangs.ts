import { Bang } from "../types";

export const customBangs: Bang[] = [
  {
    c: "AI",
    d: "www.t3.chat",
    r: 0,
    s: "T3 Chat",
    sc: "AI",
    t: "t3",
    u: "https://www.t3.chat/new?q={{{s}}}",
  },
  {
    s: "GMail",
    t: "gm",
    u: "https://mail.google.com/mail/u/0/#search/{{{s}}}",
    d: "www.gmail.com",
    r: 0,
  },
  {
    s: "LolAlytics",
    t: "la",
    u: "https://lolalytics.com/lol/{{{s}}}/build/",
    d: "lolalytics.com",
    r: 0,
  },
  {
    s: "Fotmob",
    t: "fot",
    u: "https://www.google.com/search?q={{{s}}}+site%3Awww.fotmob.com",
    d: "fotmob.com",
    r: 0,
  },
];
