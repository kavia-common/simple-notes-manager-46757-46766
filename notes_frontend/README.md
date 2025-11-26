# Notes Manager (Remotion Frontend)

This container hosts a single-page Notes Manager built with React and Remotion Studio. It runs as a Remotion composition for a live SPA-like preview.

## Features
- Create, edit, delete notes (title, content)
- LocalStorage persistence (no backend)
- Responsive, modern UI with Ocean Professional theme
- Timestamps for created/updated
- Runs on Remotion preview at port 3000

## Commands

Install dependencies
```console
npm i
```

Start preview (Remotion Studio)
```console
npm run dev
```
The app is available at / (port 3000). Select the "NotesManager" composition if the sidebar is open.

(Optional) Render video (not necessary for this SPA usage)
```console
npx remotion render
```

## Notes
- No external backend or REMOTION_* env vars are required.
- Data persists across reloads using localStorage.
