# Photography

Real Serafin Drones photos, resized for the web (EXIF and GPS data removed).
Originals are in `OneDrive\Documents\Drones\Drone Pictures` and `OneDrive\Pictures\Salima Images\PICTURES` (HEIC, converted to JPEG).

To swap a photo, overwrite the file with the same name, or change the constant
at the top of the component listed. No layout code needs to change. A missing
file shows a branded placeholder labelled with the expected path.

| File | Source | Used in |
| --- | --- | --- |
| `hero-drone-field.jpg` | IMG_2765 | Homepage hero, gallery (large tile), social share image |
| `drone-spraying.jpg` | IMG_2735 | Services: Chemical Spraying card, gallery |
| `drone-fertilizer.jpg` | IMG_2698 | Services: Fertilizer Spreading card, gallery |
| `team-photo.jpg` | IMG_2793 | Gallery, contact sidebar |
| `field-briefing.jpg` | IMG_2635 | Gallery |
| `fleet-sprayer.jpg` | IMG_2620 | Technology: Spraying setup tab, gallery |
| `fleet-spreader.jpg` | IMG_2696 | Technology: Spreading setup tab |
| `estate-walk.jpg` | IMG_2757 | Gallery |
| `salima-rice-fields.jpg` | Salima aerial (wide) | CTA banner background |
| `salima-crew.jpg` | IMG_E2549 | About section inset |
| `salima-aerial.jpg` | Salima aerial (overhead) | Gallery |
| `salima-tank-fill.jpg` | IMG_E2620 | Gallery |
| `salima-preflight.jpg` | IMG_E2640 | Gallery |
| `salima-rice-walk.jpg` | Salima: team member walking through rice field | About section main photo |
| `salima-rice-paddy.jpg` | Salima: flooded rice paddy close-up | Not placed yet (see note below) |
| `office-map.jpg` | *(not yet supplied)* | Contact sidebar static map (see `components/contact/Sidebar.tsx`) |

Portrait photos are framed with an `object-[center_NN%]` class (for example
`imagePosition` in `components/home/Services.tsx` or `position` in
`components/home/Gallery.tsx`). Adjust the percentage if a subject is cropped.

**Unplaced photo:** `salima-rice-paddy.jpg` is in `public/images/` ready to
use, but no page shows it yet. Like `salima-rice-walk.jpg`, it is 1080×810 px,
which suits cards, gallery tiles or the About inset. They are too small for
full-width backgrounds such as the hero or CTA banner, where they would look soft.
To use one, reference it by path, e.g. add an entry to `GALLERY` in
`components/home/Gallery.tsx`.
