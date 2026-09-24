/**
 * Malawi's 28 districts, grouped by region for the contact form dropdown.
 *
 * The raw lists below are kept exactly as supplied (the brief listed
 * "Chiradzulu" twice under Southern). `buildDistricts` removes any
 * duplicates — within a region *and* across regions — so each district
 * appears exactly once, and sorts each group alphabetically.
 */

export type Region = "Northern" | "Central" | "Southern";

export interface DistrictGroup {
  region: Region;
  label: string;
  districts: readonly string[];
}

const RAW_DISTRICTS: Record<Region, string[]> = {
  Northern: ["Chitipa", "Karonga", "Likoma", "Mzimba", "Nkhata Bay", "Rumphi"],
  Central: [
    "Dedza", "Dowa", "Kasungu", "Lilongwe", "Mchinji",
    "Nkhotakota", "Ntcheu", "Ntchisi", "Salima",
  ],
  Southern: [
    "Balaka", "Blantyre", "Chikwawa", "Chiradzulu", "Machinga", "Mangochi",
    "Mulanje", "Mwanza", "Neno", "Nsanje", "Phalombe", "Thyolo", "Zomba",
    "Chiradzulu", // duplicate in the source brief — removed by buildDistricts()
  ],
};

function buildDistricts(raw: Record<Region, string[]>): DistrictGroup[] {
  const seen = new Set<string>();
  return (Object.keys(raw) as Region[]).map((region) => {
    const districts = raw[region]
      .map((d) => d.trim())
      .filter((d) => {
        const key = d.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => a.localeCompare(b));
    return { region, label: `${region} Region`, districts };
  });
}

/** Grouped, de-duplicated districts: Northern → Central → Southern. */
export const DISTRICTS: readonly DistrictGroup[] = buildDistricts(RAW_DISTRICTS);

/** Flat list of every valid district name (used for validation). */
export const ALL_DISTRICTS: readonly string[] = DISTRICTS.flatMap((g) => g.districts);
