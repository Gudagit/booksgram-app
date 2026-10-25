# Knjigoljubac

A social network for book lovers: find your next read, share short reviews, and keep your shelves in one place. The name is Serbian for "book lover".

**Live demo:** <https://booksgram-app.pages.dev>

**Status: work in progress.** Book search uses real book data and sign-up creates real accounts, but people, posts and reviews in the feed are **fictional**, and your shelves and profile edits are still kept in your own browser. Storing them per account is the next step.

## What it does

- **Profile as the home page**: shelves (read, reading, to read), favorite books, series, ratings, short reviews, genre tags and a "reading taste" panel. Avatar and banner colors can be chosen.
- **Search real books** as you type. Titles and authors come from two open sources, Wikidata and Open Library, merged into one list with duplicates, box sets and bad records filtered out. A grey suggestion shows how the title or author could continue; Tab or a tap accepts it.
- **Shelves**: add a book from search to a shelf, move it or remove it. Choosing "I have read it" opens a short review form with rating, tags and a spoiler switch.
- **Reader notes** on a book: tags and short notes written by readers, shown when you open a book.
- **Accounts**: email and password sign-up, sign-in and sign-out (Supabase Auth), with quick icons in the top corner.
- **Home feed** with *Following* and *For You* tabs, and **Reels as a book**: an open antique book where each page spread is one reel.
- **Book covers drawn in code**: leather bindings in eight realistic tones, built from CSS layers and a CC0 leather scan, so no publisher's cover art is used.
- **Responsive, mobile first**, with a bottom navigation bar, client-side routing and a 404 page.

## Tech stack and why

| Area | Used | Why |
| --- | --- | --- |
| UI | [React](https://react.dev) 19, TypeScript | Components keep the screens reusable, and types catch mistakes before the app runs. |
| Styling | Plain CSS with variables | One palette and one set of tokens for the whole site, no framework to learn or ship. |
| Routing | [React Router](https://reactrouter.com) | Separate addresses for profile, search, feed and sign-in, with a 404 page. |
| Build | [Vite](https://vite.dev), npm | Fast dev server and a small production build. |
| Quality | ESLint with typescript-eslint | Consistent code and early warnings. |
| Accounts | [Supabase](https://supabase.com) Auth | Real sign-up and sign-in without running my own server; free tier. |
| Book data | [Wikidata](https://www.wikidata.org) (CC0) and [Open Library](https://openlibrary.org) public APIs | Real titles and authors without keeping my own catalog; Open Library adds newer books. |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) | Free, deploys from GitHub on every push, works with client-side routing. |
| Everyday tools | Visual Studio Code, Git and GitHub, Chrome DevTools | Editing, version history, and checking the layout and network calls. |

## What the project covers

- Reusable window ("sheet") component and a step-by-step form for reviews and profile editing.
- A search hook that waits while you type, cancels outdated requests, queries two APIs in parallel and merges their answers, with loading and error states.
- Cleaning of third-party data: exact title and author required, sets and non-book items removed, duplicates detected by a normalized key.
- Shelves that persist in `localStorage` through one shared hook, ready to move to a database.
- Sign-up and sign-in flow against a real backend, with environment variables kept out of Git.
- Accessible details: labels, roles, focus styles, `aria-live` status messages.
- Design system in CSS variables: one cream-and-ochre palette for the whole site, and book covers painted with gradients, grain and a leather texture.
- Deployment: GitHub, Cloudflare Pages, SPA fallback for client-side routes.

## Known limitations

- Fictional feed, reels and followers; shelves and profile are not yet stored per account.
- Open Library answers slowly (several seconds) and its records are uneven, so its results appear after the faster Wikidata ones.
- English only for now.
- The source licence of Open Library data is not confirmed; it is used for this demo and will be reviewed before real users.

## Run it locally

Requires [Node.js](https://nodejs.org) 20.19 or newer (or 22.12+).

```bash
npm install
npm run dev
```

Open the address printed in the terminal. To try it on a phone on the same network, use `npm run dev -- --host`.

Accounts need a Supabase project. Create `app/.env` with:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

Without it the app still runs as a demo and the sign-in page says accounts are not set up.

Other scripts:

```bash
npm run lint      # check the code style
npm run build     # type-check and build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  auth/     sign-in page, account icons, auth hook
  books/    shelves, book cards, review and series sheets, search, covers
  lib/      Supabase client
  social/   feed, posts, reels
  users/    profile page and profile editing
  layout/   shared pieces: sheet window, bottom navigation, form rows, credits
```

## Data and content

- The app does not keep its own catalog of books and does not contain the text of any book.
- Book titles and authors are facts. Reviews and notes are written by users in their own words.
- Book covers from outside sources are intentionally not shown; covers are drawn by the app.

## Credits and licenses

The source code of this project is proprietary, all rights reserved (see [LICENSE](LICENSE)). The third-party material below remains under its own license.

### Images

| Material | Source | License |
| --- | --- | --- |
| Leather texture (reels book), "Leather 014" | [ambientCG](https://ambientcg.com/view?id=Leather014) | CC0 1.0 |
| Leather grain (book covers), "Leather 030" | [ambientCG](https://ambientcg.com/view?id=Leather030) | CC0 1.0 |
| Paper texture (pages and windows), "Paper 006" | [ambientCG](https://ambientcg.com/view?id=Paper006) | CC0 1.0 |

The paper texture is the original color map recolored to a warm cream tone, and the leather grain is a grayscale version of the original displacement map. License terms: <https://docs.ambientcg.com/license/>.

### Data

| Material | Source | License |
| --- | --- | --- |
| Book titles and authors in search | [Wikidata](https://www.wikidata.org) | CC0 1.0 |
| Book titles and authors in search | [Open Library](https://openlibrary.org) public search API | Terms of use apply; data licence not confirmed (demo only) |

### Fonts

| Font | Copyright | License |
| --- | --- | --- |
| [Inter](https://github.com/rsms/inter) (via `@fontsource-variable/inter`) | 2016 The Inter Project Authors | SIL Open Font License 1.1 |
| [Lora](https://github.com/cyrealtype/Lora-Cyrillic) (via `@fontsource-variable/lora`) | 2011 The Lora Project Authors | SIL Open Font License 1.1 |

### Libraries

Runtime dependencies and their licenses, checked on 2026-10-23:

| Package | License |
| --- | --- |
| react, react-dom, scheduler | MIT |
| react-router, @remix-run/route-pattern, cookie-es | MIT |
| @supabase/* (supabase-js and its sub-packages), iceberg-js | MIT |
| csstype | MIT |
| tslib | 0BSD |

Development tools (Vite, ESLint, TypeScript and plugins) are used only to build the project and are not shipped in the app.

The full list can be reproduced with `npx license-checker-rseidelsohn --production`.

### Illustrations

The reel scenes are drawn in code (SVG). The favicon is an original drawing. Names, posts and reviews in the feed are invented for the demo; real book titles that appear on shelves are used only as titles and authors.

## Author

Made by Ivana as a learning and portfolio project. The project was built while learning, with an AI assistant as a tutor. Not affiliated with any book platform.
