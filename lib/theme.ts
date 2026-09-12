/**
 * Single source of truth for which scoped palette a route belongs to.
 * Used by RouteTheme (sets <body data-theme>) and by the shared chrome
 * (Header / Footer) so navigation, homepage and case studies stay in
 * their own visual lane.
 */
export type ThemeName = "global" | "swiggy" | "expedition" | "duolingo" | "steam";

export function isCaseStudyRoute(pathname: string): boolean {
  return pathname === "/case-studies" || pathname.startsWith("/case-studies/");
}

export function getThemeName(pathname: string): ThemeName {
  if (pathname.startsWith("/case-studies/steam-discovery")) return "steam";
  if (pathname.startsWith("/case-studies/swiggy-instamart")) return "swiggy";
  if (pathname.startsWith("/case-studies/expedition-33")) return "expedition";
  if (pathname.startsWith("/case-studies/duolingo")) return "duolingo";
  return "global";
}

interface ChromeTheme {
  /** header bar when scrolled */
  barScrolled: string;
  /** header bar at top of page */
  barTop: string;
  brand: string;
  tag: string;
  dot: string;
  navLink: string;
  activeLink: string;
  divider: string;
  pill: string;
  dropdown: string;
  dropdownItemHover: string;
  drawer: string;
  footerBg: string;
  footerRule: string;
  footerFaint: string;
  footerChip: string;
}

const GLOBAL: ChromeTheme = {
  barScrolled:
    "bg-[#ece5d6] border-b border-[#d0c6ac] shadow-sm shadow-black/5 text-[#282e20]",
  barTop: "bg-[#ece5d6] border-b border-[#d0c6ac]/60 text-[#282e20]",
  brand: "text-[#282e20] hover:text-[#525e3c]",
  tag: "text-[#5c6350]",
  dot: "bg-[#525e3c]",
  navLink: "text-[#5c6350] hover:text-[#282e20]",
  activeLink: "text-[#414a2e] font-bold underline underline-offset-4 decoration-[#525e3c]",
  divider: "bg-[#c7bda2]",
  pill: "bg-[#e2d9c4] hover:bg-[#d8cdb2] text-[#3c4230] border border-[#d0c6ac]",
  dropdown: "bg-[#f4efe2] border-[#d0c6ac] shadow-xl text-[#282e20]",
  dropdownItemHover: "hover:bg-[#e2d9c4]",
  drawer: "bg-[#ece5d6] border-b border-[#d0c6ac] text-[#282e20]",
  footerBg: "bg-[#e2d9c4] text-[#282e20]",
  footerRule: "border-[#cabf9f]",
  footerFaint: "text-[#5c6350]",
  footerChip: "bg-[#d8cdb2] text-[#3c4230] border border-[#c7bda2]",
};

const SWIGGY: ChromeTheme = {
  barScrolled:
    "bg-[#ff5400]/95 backdrop-blur-md border-b border-white/25 shadow-lg shadow-black/10 text-white",
  barTop: "bg-transparent border-b border-white/15 text-white",
  brand: "text-white hover:text-white/90",
  tag: "text-white/75",
  dot: "bg-white",
  navLink: "text-white/80 hover:text-white",
  activeLink: "text-white font-bold underline underline-offset-4 decoration-white",
  divider: "bg-white/25",
  pill: "bg-white/12 hover:bg-white/20 text-white border border-white/25",
  dropdown: "bg-[#e64600] border-white/25 shadow-2xl text-white",
  dropdownItemHover: "hover:bg-white/10",
  drawer: "bg-[#ff5400] border-b border-white/20 text-white",
  footerBg: "bg-[#e64600] text-white",
  footerRule: "border-white/20",
  footerFaint: "text-white/75",
  footerChip: "bg-white/12 text-white border border-white/25",
};

const EXPEDITION: ChromeTheme = {
  barScrolled:
    "bg-[#171a19]/95 backdrop-blur-md border-b border-white/15 shadow-xl shadow-black/30 text-[#f0e7d6]",
  barTop: "bg-transparent border-b border-white/12 text-[#f0e7d6]",
  brand: "text-[#f0e7d6] hover:text-white",
  tag: "text-[#f0e7d6]/70",
  dot: "bg-[#d2b98a]",
  navLink: "text-[#f0e7d6]/78 hover:text-[#f0e7d6]",
  activeLink: "text-[#f0e7d6] font-bold underline underline-offset-4 decoration-[#d2b98a]",
  divider: "bg-white/20",
  pill: "bg-white/10 hover:bg-white/18 text-[#f0e7d6] border border-white/18",
  dropdown: "bg-[#22251f] border-white/18 shadow-2xl text-[#f0e7d6]",
  dropdownItemHover: "hover:bg-white/8",
  drawer: "bg-[#171a19] border-b border-white/15 text-[#f0e7d6]",
  footerBg: "bg-[#22251f] text-[#f0e7d6]",
  footerRule: "border-white/15",
  footerFaint: "text-[#f0e7d6]/70",
  footerChip: "bg-white/10 text-[#f0e7d6] border border-white/18",
};

const DUOLINGO: ChromeTheme = {
  barScrolled:
    "bg-white/95 backdrop-blur-md border-b border-[#d7e8ca] shadow-sm shadow-black/5 text-[#2b3a2b]",
  barTop: "bg-transparent border-b border-[#d7e8ca]/70 text-[#2b3a2b]",
  brand: "text-[#2b3a2b] hover:text-[#58cc02]",
  tag: "text-[#5d6b58]",
  dot: "bg-[#58cc02]",
  navLink: "text-[#5d6b58] hover:text-[#58cc02]",
  activeLink: "text-[#3c9a00] font-bold underline underline-offset-4 decoration-[#58cc02]",
  divider: "bg-[#cfe3c0]",
  pill: "bg-[#f0f7ea] hover:bg-[#e6f2da] text-[#2b3a2b] border border-[#d7e8ca]",
  dropdown: "bg-white border-[#d7e8ca] shadow-xl text-[#2b3a2b]",
  dropdownItemHover: "hover:bg-[#f0f7ea]",
  drawer: "bg-white border-b border-[#d7e8ca] text-[#2b3a2b]",
  footerBg: "bg-[#f0f7ea] text-[#2b3a2b]",
  footerRule: "border-[#d7e8ca]",
  footerFaint: "text-[#5d6b58]",
  footerChip: "bg-white text-[#2b3a2b] border border-[#d7e8ca]",
};

const MAP: Record<ThemeName, ChromeTheme> = {
  steam: {
    barScrolled: "bg-[#07111d] border-b border-[#1f3a52] text-[#dbe9f4]",
    barTop: "bg-[#07111d] border-b border-[#1f3a52] text-[#dbe9f4]",
    brand: "text-[#f4f8fb]",
    tag: "text-[#8fb8d8]",
    dot: "bg-[#66c0f4]",
    navLink: "text-[#8fb8d8] hover:text-[#f4f8fb]",
    activeLink: "text-[#66c0f4]",
    divider: "bg-[#1f3a52]",
    pill: "bg-[#0b1823] text-[#dbe9f4] border border-[#28445d]",
    dropdown: "bg-[#0b1823] border-[#28445d] text-[#dbe9f4]",
    dropdownItemHover: "hover:bg-[#142c40]",
    drawer: "bg-[#07111d] text-[#dbe9f4]",
    footerBg: "bg-[#07111d] text-[#dbe9f4]",
    footerRule: "border-[#1f3a52]",
    footerFaint: "text-[#8fb8d8]",
    footerChip: "bg-[#0b1823] text-[#dbe9f4] border border-[#28445d]",
  },
  global: GLOBAL,
  swiggy: SWIGGY,
  expedition: EXPEDITION,
  duolingo: DUOLINGO,
};

export function getChromeTheme(pathname: string): ChromeTheme {
  return MAP[getThemeName(pathname)];
}
