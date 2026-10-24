# Knjigoljubac

A social network for book lovers: discover your next read through people with a similar taste, share short reviews, and keep your shelves in one place.

**Status: work in progress.** This is a demo of the first phase. All users, posts, books on the shelves and reviews are **fictional**. Nothing is stored on a server yet; your profile edits stay in your own browser.

## What works now

- **Home feed** with *Following* and *For You* tabs, post cards with likes.
- **Reels as a book**: an open antique book where each page spread is one reel; tap a page to turn it.
- **Profile** with shelves (read, reading, to read), favorite books, series, ratings, short reviews and genre tags.
- **Edit profile** and **Write a review** as a step-by-step list of fields.
- **Responsive layout**, mobile first, with a bottom navigation bar.
- Client-side routing with a 404 page.

## Planned

Sign-in, following people, a real feed, book search (Open Library), moderation tools and privacy options. Book clubs and video reels are considered for a later phase.

## Tech stack

- [React](https://react.dev) 19 and TypeScript
- [Vite](https://vite.dev) for the dev server and build
- [React Router](https://reactrouter.com) for routing
- ESLint with typescript-eslint
- [Supabase](https://supabase.com) is installed for the upcoming backend (not connected yet)

## Run it locally

Requires [Node.js](https://nodejs.org) 20.19 or newer (or 22.12+).

```bash
npm install
npm run dev
```

Open the address printed in the terminal. To try it on a phone on the same network, use `npm run dev -- --host`.

Other scripts:

```bash
npm run lint      # check the code style
npm run build     # type-check and build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  books/    shelves, book cards, review and series sheets, search
  social/   feed, posts, reels
  users/    profile page and profile editing
  layout/   shared pieces: sheet window, bottom navigation, form rows
```

## Data and content

- The app does not keep its own catalog of books and does not contain the text of any book.
- Book titles and authors are facts. Reviews are written by users in their own words.
- Book covers from outside sources are intentionally not shown; covers are drawn by the app.

## Credits and licenses

The source code of this project is proprietary, all rights reserved (see [LICENSE](LICENSE)). The third-party material below remains under its own license.

### Images

| Material | Source | License |
| --- | --- | --- |
| Leather texture (book covers), "Leather 014" | [ambientCG](https://ambientcg.com/view?id=Leather014) | CC0 1.0 |
| Paper texture (pages and windows), "Paper 006" | [ambientCG](https://ambientcg.com/view?id=Paper006) | CC0 1.0 |

The paper texture is the original color map recolored to a warm cream tone. License terms: <https://docs.ambientcg.com/license/>.

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

### Illustrations and data

The reel scenes are drawn in code (SVG). The favicon is an original drawing. Names, posts and reviews are invented for the demo; real book titles that appear on shelves are used only as titles and authors.

## Author

Made by Ivana as a learning and portfolio project. Not affiliated with any book platform.
