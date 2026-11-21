# Lailipur Website

An Indonesian-language website introducing Laili Purnamasari, her coaching programs, business journey, brands, and activities. The package includes the complete editable static website, with responsive desktop and mobile layouts.

## Design reference

Based on the [Lailipur design in Figma](https://www.figma.com/design/qxtxokmFowVKcoGkR9hY46/Landing-Page-UI-Kit-Fix?node-id=137-323).

Desktop frames: Home `137:323`, About Me `137:11`, Kelas & Coaching `137:87`, Karya & Bisnis `137:176`, and Aktivitas `137:240`.

Mobile frames: Home `134:6`, About Me `140:641`, Kelas & Coaching `145:2`, Karya & Bisnis `145:153`, and Aktivitas `145:262`.

## Features

- Five pages: Home, About Me, Kelas & Coaching, Karya & Bisnis, and Aktivitas.
- Dedicated desktop and mobile compositions based on the Figma design.
- Floating bottom navigation on mobile that stays visible while scrolling.
- Profile, credentials, program previews, and activity stories.
- About Me introduction, photo gallery, beliefs, and personal message.
- Four coaching programs with buttons that scroll to the Konsultasi Kelas button.
- Konsultasi Kelas opens the GabungMitra registration page.
- Laili Brand and Layali introductions with production and team galleries.
- Photo and content dialogs with keyboard focus and Escape closing.
- Native horizontal scrolling and scroll snapping for mobile card lists.
- Official WhatsApp, Facebook, Instagram, YouTube, and TikTok links.
- Local image, SVG, and font assets.
- A separate 390px mobile preview that can be viewed from a desktop browser.

The separate Laili Brand and Layali websites are outside this package.

## Package structure

```text
lailipur/
├── README.md
├── .gitignore
└── dist/                       # Complete editable and publishable website
    ├── index.html              # Website entry page
    ├── mobile-preview.html     # Fixed-width mobile preview
    ├── app.js                  # Page content, navigation, buttons, and dialogs
    ├── styles.css              # Desktop and mobile styling
    ├── fonts.css               # Local font declarations
    ├── assets.js               # Page-to-asset mappings
    ├── design-data.js          # Image crops and artwork dimensions
    └── assets/                 # Website imagery, SVGs, and font files
```

There is no separate React/Vite project or build step. The files in `dist/` are both the editable source and the ready-to-publish website. No dependency installation is required.

## Publish on GitHub Pages

1. Extract `lailipur-source.zip` and open its `lailipur` folder.
2. Create a GitHub repository, or open your existing Lailipur repository.
3. Upload the **contents of `dist/`** into the repository root. The root must contain `index.html`, `app.js`, `styles.css`, and `assets/` directly, rather than inside an extra `dist` or `lailipur` folder.
4. Add this document to the repository root as `README.md`.
5. Commit the files.
6. In the repository's Pages settings, select deployment from a branch, choose the branch containing your files, and select `/(root)` as the publishing folder.
7. Save and open the published URL after deployment finishes.

All website files use relative asset paths and hash navigation. Keep the files together so images, fonts, scripts, and styles continue to load when publishing under a repository name.

These instructions publish the contents of `dist/` at the repository root. If you retain the original package structure instead, your deployment must publish `dist/` through a configured workflow or static hosting service.

### Hidden files

An optional empty `.nojekyll` file can be added to the published repository root to bypass Jekyll processing. It contains no text.

The source package's `.gitignore` excludes local workflow state, ZIP archives, and Python cache files. It is not needed to display the website. Do not ignore the website files you intend to publish.

## Preview locally

From the extracted `lailipur` folder, run:

```sh
python -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. On Windows, `py` can be used instead of `python`. Stop the server with `Ctrl+C`.

If you already copied the contents of `dist/` into your repository root, run this from the repository root instead:

```sh
python -m http.server 8080
```

Use a local web server rather than opening `index.html` directly, because the website loads JavaScript modules.

## Mobile preview

The main website automatically switches to its mobile layout on narrow screens. To view a fixed-width phone preview on desktop, open:

```text
http://localhost:8080/mobile-preview.html
```

You can select a page using the query string:

```text
mobile-preview.html?page=home
mobile-preview.html?page=about
mobile-preview.html?page=classes
mobile-preview.html?page=business
mobile-preview.html?page=activities
```

Use the `.html` filename on GitHub Pages; the extensionless `/mobile-preview` address used by the hosted Site may not resolve on other hosts.

## Links and button behavior

| Button | Destination |
| --- | --- |
| WhatsApp | https://wa.me/+628113221969 |
| Facebook | https://www.facebook.com/LailiWaiteuOfficial/ |
| Instagram | https://www.instagram.com/lailipur/ |
| YouTube | https://www.youtube.com/@lailipur |
| TikTok | https://www.tiktok.com/@lailipurnama_ |
| Konsultasi Kelas | https://link.lailibrand.id/GabungMitra |

The four Kenali program buttons on Kelas & Coaching scroll to Konsultasi Kelas. The consultation button opens GabungMitra in a new tab. Other WhatsApp inquiry controls open the supplied WhatsApp number with the relevant inquiry prefilled.

Social destinations are configured in the `socialLinks` object in `app.js`. The Konsultasi Kelas destination is configured in the `classes()` function in the same file.

## Editing the website

- Edit page copy, contact links, and interactions in `app.js`.
- Edit layouts, colors, spacing, and responsive behavior in `styles.css`.
- Keep asset mappings in `assets.js` consistent when replacing images.
- Preserve crop and dimension settings in `design-data.js` unless intentionally changing the artwork framing.
- After editing JavaScript or CSS, update the corresponding version query in `index.html` so returning visitors load the latest files.

Paths above refer to the website folder: `dist/` in the source ZIP, or the repository root after following the publishing steps.

## Assets and typography

Images and decorative SVGs originate from the supplied Figma design. Duplicate assets share local files, and artwork retains its original aspect ratio and crop settings.

Montserrat and Cormorant Garamond are bundled locally. Headings use Apple Garamond when installed, with Garamond and bundled Cormorant Garamond as fallbacks. Small typography differences can occur across devices because a licensed Apple Garamond font file was not supplied.
