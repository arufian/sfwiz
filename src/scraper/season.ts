/** Salesforce release season detector. Returns current + previous 2 seasons. */

type Season = 'Spring' | 'Summer' | 'Winter';

export interface SfReleaseSeason {
  name: string; // e.g. "Spring '25"
  year: number;
  season: Season;
}

interface SeasonEntry { season: Season; year: number }

/**
 * Salesforce releases: Spring (Jan–Apr, same year), Summer (May–Sep, same year),
 * Winter (Oct–Dec, NEXT year — e.g. Nov 2025 = Winter '26).
 */
function currentSeasonEntry(now: Date): SeasonEntry {
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  if (month >= 1 && month <= 4) return { season: 'Spring', year };
  if (month >= 5 && month <= 9) return { season: 'Summer', year };
  return { season: 'Winter', year: year + 1 };
}

function prevSeason({ season, year }: SeasonEntry): SeasonEntry {
  if (season === 'Spring') return { season: 'Winter', year };
  if (season === 'Summer') return { season: 'Spring', year };
  return { season: 'Summer', year: year - 1 };
}

/** Returns current and previous 2 Salesforce release seasons. */
export function getRecentSeasons(now = new Date()): SfReleaseSeason[] {
  const seasons: SfReleaseSeason[] = [];
  let entry = currentSeasonEntry(now);
  for (let i = 0; i < 3; i++) {
    seasons.push({ name: `${entry.season} '${String(entry.year).slice(-2)}`, year: entry.year, season: entry.season });
    entry = prevSeason(entry);
  }
  return seasons;
}

/** Build a Salesforce release notes URL for a given season. */
export function releaseNotesUrl(season: SfReleaseSeason): string {
  const short = `${season.season.toLowerCase()}${season.year}`;
  return `https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&release=${short}`;
}
