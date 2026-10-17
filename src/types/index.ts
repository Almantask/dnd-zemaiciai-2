export type PlaceId =
  | 'town'
  | 'tavern'
  | 'archive'
  | 'smithy'
  | 'magic_shop'
  | 'tailor'
  | 'archery'
  | 'stable'
  | 'general_shop'
  | 'alka';

export interface FootstepPoint {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  angle: number; // degrees rotation
  isLeft?: boolean;
}

export interface TownBuilding {
  id: PlaceId;
  name: string;
  subtitle: string;
  description: string;
  locationNote: string;
  iteration: 1 | 2 | 3;
  isOpen: boolean;
  // Hotspot position & size on the town image (in percentages)
  hotspot: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  // Label badge anchor in percentage
  labelPos: {
    x: number;
    y: number;
  };
  // Footstep path from town center crossroads to building entrance
  footsteps: FootstepPoint[];
  preloadImage?: string;
}

export interface CurrencyEntry {
  id: string;
  ltName: string;
  altName: string;
  dndCode: string;
  dndFull: string;
  conversion: string;
  description: string;
  badgeColor: string;
}

export interface ShopItem {
  id: string;
  category: 'food' | 'drink' | 'travel' | 'lodging';
  name: string;
  dndTerm: string;
  price: string;
  description: string;
  statsAndEffects: string;
  visualDescription: string;
  shopkeeperComment: string;
  whenToUse: string;
  // Optional direct hotspot on the tavern interior illustration
  counterHotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  };
}

export interface HeroTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  placeholderNote: string;
  tips: string[];
}

export interface TavernHero {
  id: string;
  name: string;
  classTitle: string;
  dndClass: string;
  specialty: string;
  greeting: string;
  hotspot: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  topics: HeroTopic[];
}

export interface BookSpreadChoice {
  id: string;
  text: string;
  detailNote?: string;
  action?: 'next' | 'prev' | 'close';
}

export interface BookSpread {
  id: string;
  sessionNumber: number; // 0 for prologue
  tabLabel: string;
  romanPlate?: string;
  title: string;
  dateLabel: string;
  isBookmarked?: boolean;
  storyParagraphs: string[];
  promptQuestion?: string;
  choices?: BookSpreadChoice[];
  illustrationTitle: string;
  illustrationCaption: string;
  illustrationPlaceholderNote: string;
  illustrationUrl?: string;
  illustrationScene?:
    | 'tavern'
    | 'forest'
    | 'cavern'
    | 'hillfort'
    | 'innkeeper'
    | 'scouts'
    | 'horn'
    | 'shield'
    | 'moss'
    | 'runes'
    | 'lake'
    | 'archive';
}

export type ArchiveEntityCategory =
  | 'vieta'
  | 'daiktas'
  | 'asmuo'
  | 'zmones'
  | 'zenklai';

export interface ArchiveEntityFact {
  label: string;
  value: string;
}

export interface ArchiveEntity {
  id: string;
  category: ArchiveEntityCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  romanPlate?: string;
  paragraphs: string[];
  keyFacts?: ArchiveEntityFact[];
  relatedIds?: string[];
  illustrationTitle: string;
  illustrationCaption: string;
  illustrationScene:
    | 'tavern'
    | 'forest'
    | 'cavern'
    | 'hillfort'
    | 'innkeeper'
    | 'scouts'
    | 'horn'
    | 'shield'
    | 'moss'
    | 'runes'
    | 'lake'
    | 'archive';
  illustrationUrl?: string;
}

export interface MapMarker {
  id: string;
  name: string;
  type: string;
  x: number; // percentage
  y: number; // percentage
  status: string;
  description: string;
}

export interface ArchiveMap {
  id: string;
  mapNumber: number;
  title: string;
  regionSubtitle: string;
  acquiredNote: string;
  imageUrl: string;
  markers: MapMarker[];
}

export interface TrophyItem {
  id: string;
  name: string;
  sessionLabel: string;
  category: string;
  shortNote: string;
  fullStoryPlaceholder: string;
  quirkNote: string;
  shelfSlot: string;
}

