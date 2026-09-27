# Photography

Real Serafin Drones photos, resized for the web (EXIF and GPS data removed).
Originals are in `OneDrive\Documents\Drones\Drone Pictures`.

To swap a photo, overwrite the file with the same name, or change the constant
at the top of the component listed. No layout code needs to change. A missing
file shows a branded placeholder labelled with the expected path.

| File | Source | Used in |
| --- | --- | --- |
| `hero-drone-field.jpg` | IMG_2765 | Homepage hero, gallery (large tile), social share image |
| `drone-spraying.jpg` | IMG_2735 | Services: Chemical Spraying card, gallery |
| `drone-fertilizer.jpg` | IMG_2698 | Services: Fertilizer Spreading card, gallery |
| `team-photo.jpg` | IMG_2793 | About section, gallery, contact sidebar |
| `field-briefing.jpg` | IMG_2635 | About section inset, gallery |
| `fleet-sprayer.jpg` | IMG_2620 | Technology: Spraying setup tab, gallery |
| `fleet-spreader.jpg` | IMG_2696 | Technology: Spreading setup tab |
| `estate-walk.jpg` | IMG_2757 | CTA banner background, gallery |
| `office-map.jpg` | *(not yet supplied)* | Contact sidebar static map (see `components/contact/Sidebar.tsx`) |

Portrait photos are framed with an `object-[center_NN%]` class (for example
`imagePosition` in `components/home/Services.tsx` or `position` in
`components/home/Gallery.tsx`). Adjust the percentage if a subject is cropped.
