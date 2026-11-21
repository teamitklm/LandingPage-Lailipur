# Lailipur

A responsive, five-page implementation of the Lailipur section of the supplied Figma file. Laili Brand and Layali are shown only within the Karya & Bisnis page; their separate websites are outside this implementation.

## Run locally

From this folder:

```powershell
python -m http.server 4173 --directory dist
```

Open http://localhost:4173. No package installation or build is needed.

## Pages and behavior

- Home: profile, credentials, program previews, horizontal story list on mobile.
- About Me: introduction, photo gallery, beliefs, and a message from Miss Laili.
- Kelas & Coaching: four programs, benefits, program details, and inquiry messages.
- Karya & Bisnis: two brands and two production galleries.
- Aktivitas: activity cards and social contact controls.

Navigation uses hash routes, supports browser history, and works on static hosting. Dialogs support keyboard focus and Escape. Mobile carousels use native horizontal scrolling and scroll snapping. The mobile bottom navigation floats above the screen edge while scrolling, with reserved space below the content.

## Assets and typography

The image and SVG assets were downloaded from the high-fidelity Figma design context. Byte-identical duplicates share one local file. Original image crops and SVG aspect ratios are retained. There are no temporary Figma asset URLs or runtime font-CDN dependencies.

Montserrat and Cormorant Garamond are bundled from Google Fonts. Apple Garamond was named by the design but no licensed font file was supplied. Headings use Apple Garamond when installed, then Garamond, followed by bundled Cormorant Garamond. This can produce small typographic differences across systems.

## Contact configuration

Official WhatsApp, Facebook, Instagram, YouTube, and TikTok destinations are configured in `dist/app.js` using the links supplied by the site owner. Social links open in a new tab. Class and brand inquiry buttons open WhatsApp with the relevant inquiry prefilled.

## Design reference

[Figma source](https://www.figma.com/design/qxtxokmFowVKcoGkR9hY46/Landing-Page-UI-Kit-Fix?node-id=134-4)

Desktop frames: 137:323, 137:11, 137:87, 137:176, 137:240.
Mobile frames: 134:6, 140:641, 145:2, 145:153, 145:262.

## Verification

Checked the five pages at desktop and mobile breakpoints, local image loading, page overflow, program dialogs, inquiry dialogs, photo-gallery controls, and navigation. The original design was translated into CSS grid/flex layouts; decorative artwork retains its intrinsic dimensions and scales uniformly.
