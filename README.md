# Notes App (React + JavaScript)

Simple fullstack app to practice converting JavaScript → TypeScript later.

## Features

- Create note
- Edit note
- Delete note
- Search notes

## Folder structure

```
server/     ← Express API (JavaScript)
client/     ← React frontend (JavaScript + Vite)
```

## Setup

1. Copy env file and add your MongoDB URI:
```bash
copy server\.env.example server\.env
```

2. Put your Atlas URI in `server/.env`:
```
MONGODB_URI=mongodb+srv://...
PORT=5000
```

3. Install & run (two terminals):

```bash
npm install --prefix server
npm run start --prefix server
```

```bash
npm install --prefix client
npm run dev --prefix client
```

App: http://localhost:5173  
API: http://localhost:5000

## API endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes?q=text` | Search notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

## Learn TypeScript next

Later, rename/convert files step by step:

- `server/index.js` → `index.ts`
- `client/src/api.js` → `api.ts`
- `client/src/App.jsx` → `App.tsx`

Add types for `Note`, request bodies, and API responses.
