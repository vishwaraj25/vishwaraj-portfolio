export type Session = "Short session" | "An evening" | "Time to explore";
export type Gameplay = "Action" | "Exploration" | "Story" | "Strategy";
export type Mood = "Atmospheric" | "Relaxed" | "Intense";

export interface DiscoveryGame {
  id: string;
  title: string;
  gameplay: Gameplay;
  mood: Mood;
  sessions: Session[];
  tags: string[];
  description: string;
}

// Editorial demo metadata, not a live Steam feed or measured player preferences.
export const discoveryGames: DiscoveryGame[] = [
  { id: "367520", title: "Hollow Knight", gameplay: "Exploration", mood: "Atmospheric", sessions: ["An evening", "Time to explore"], tags: ["Exploration", "Atmospheric", "Platformer"], description: "Explore an interconnected underground kingdom, find hidden paths, and learn its demanding combat." },
  { id: "1145360", title: "Hades", gameplay: "Action", mood: "Intense", sessions: ["Short session", "An evening"], tags: ["Action", "Roguelike", "Mythology"], description: "Fight through the underworld in repeatable escape attempts, with a story that unfolds between runs." },
  { id: "413150", title: "Stardew Valley", gameplay: "Strategy", mood: "Relaxed", sessions: ["Short session", "An evening"], tags: ["Farming", "Life sim", "Relaxed"], description: "Build a farm, get to know a town, and choose your own rhythm of exploration and everyday projects." },
  { id: "620", title: "Portal 2", gameplay: "Exploration", mood: "Relaxed", sessions: ["Short session", "An evening"], tags: ["Puzzle", "Science fiction", "Co-op"], description: "Solve spatial puzzles with a portal device while exploring the ruins of a peculiar research facility." },
  { id: "1086940", title: "Baldur’s Gate 3", gameplay: "Story", mood: "Atmospheric", sessions: ["An evening", "Time to explore"], tags: ["Role-playing", "Choices", "Tactical combat"], description: "Lead a party through a fantasy adventure shaped by dialogue, exploration, and tactical decisions." },
  { id: "1245620", title: "ELDEN RING", gameplay: "Action", mood: "Atmospheric", sessions: ["An evening", "Time to explore"], tags: ["Open world", "Action RPG", "Fantasy"], description: "Travel through a vast fantasy landscape, discover its secrets, and take on challenging encounters." },
  { id: "1091500", title: "Cyberpunk 2077", gameplay: "Story", mood: "Intense", sessions: ["An evening", "Time to explore"], tags: ["Open world", "Story", "Science fiction"], description: "Navigate Night City through character-driven quests, exploration, and action." },
  { id: "1174180", title: "Red Dead Redemption 2", gameplay: "Story", mood: "Atmospheric", sessions: ["An evening", "Time to explore"], tags: ["Western", "Open world", "Story"], description: "Follow an outlaw gang through a changing American frontier, with space to wander beyond the main story." },
  { id: "105600", title: "Terraria", gameplay: "Exploration", mood: "Relaxed", sessions: ["Short session", "Time to explore"], tags: ["Sandbox", "Crafting", "Exploration"], description: "Dig, build, and explore a world of resources, creatures, and discoveries." },
  { id: "108600", title: "Project Zomboid", gameplay: "Strategy", mood: "Intense", sessions: ["An evening", "Time to explore"], tags: ["Survival", "Sandbox", "Simulation"], description: "Plan for survival in a detailed zombie sandbox where supplies and everyday decisions matter." },
  { id: "1817070", title: "Marvel’s Spider-Man Remastered", gameplay: "Action", mood: "Intense", sessions: ["Short session", "An evening"], tags: ["Action", "Superhero", "Open world"], description: "Swing through New York, follow a superhero story, and tackle encounters across the city." },
  { id: "730", title: "Counter-Strike 2", gameplay: "Strategy", mood: "Intense", sessions: ["Short session", "An evening"], tags: ["Competitive", "Tactical", "Team play"], description: "Coordinate with a team in tactical, round-based competitive matches." },
];

export const coverFor = (id: string) => `/images/steam-discovery/cover-${id}.jpg`;
