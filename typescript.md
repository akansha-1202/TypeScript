# What is TypeScript?

> 🎯 **One-liner:** TypeScript = JavaScript + types + better tooling  
> Catch bugs at **compile time**, write code for **humans**, not just machines.

---

## 🧠 Memory Hook

```
JS  = flexible, fast to write, errors at RUNTIME 💥
TS  = intentional, safer, errors at COMPILE TIME ✅
```

**TS is 3 things at once:**

| # | What | Remember as |
|---|------|-------------|
| 1 | A **transpiler** | Turns TS → JS (like a translator) |
| 2 | Uses **future JS today** | Tomorrow's features, today |
| 3 | A **superset** of JS | JS + strong & static typing |

> 💡 Every valid JS file is already valid TS. TS just adds more.

---

## 🔄 The Pipeline (stick this visual)

### JavaScript path
```
JS  →  ES Future  →  ES Current  →  Widely Supported
```

### TypeScript path
```
TS  →  Types  →  ES Future  →  ES Current  →  Widely Supported
         ↑
    (extra safety layer)
```

**Mnemonic:** *TS puts Types first, then rides the same JS train.*

---

## ⚡ Dynamic vs Static Typing

| | **Dynamic (JS)** | **Static (TS)** |
|---|---|---|
| Variables | Can be any type, anytime | Assigned a type — **never changes** |
| Object fields | Add by just assigning | Must be **predefined** |
| When errors show | 💥 Runtime (too late) | ✅ Compile time (before you run) |

### Quick mental picture

```js
// JS — shape-shifting 🦎
let x = 5;
x = "hello";     // ok
x = true;        // ok
obj.newField = 1; // ok — added on the fly
```

```ts
// TS — locked shape 🔒
let x: number = 5;
x = "hello";     // ❌ Error at compile time
// fields must be declared on the type first
```

> 🧩 **Remember:** JS = clay. TS = mold. Clay can become anything; mold keeps the shape.

---

## 🛠️ Why TS Feels Magical — Tooling

| Tooling Feature | What it does | Sticky phrase |
|---|---|---|
| **Autocomplete** | Suggests props, methods, variables while typing | "It finishes your sentence" |
| **Refactoring** | Rename / move / reorganize safely | "Change once, update everywhere" |
| **Go to Definition** | Jump to where something is defined | "Teleport to the source" |
| **Find References** | Show every place a symbol is used | "Who uses this?" |
| **Error Detection** | Highlights type errors before you run | "Red squiggles = free QA" |
| **Auto Import** | Adds missing imports automatically | "Don't type the path" |

---

## ✍️ Intent — Write for Humans

> TypeScript lets you **explicitly (clearly) express your intent**.

```ts
// Intent is clear: this MUST be a user id (string), not "whatever"
function getUser(id: string) { ... }
```

**Rule of thumb:**
- Computers can run messy code.
- Humans need clear contracts.
- Types = contracts everyone can read.

---

## 📌 Cheat Sheet (glance before coding)

1. Transpiler  
2. Future JS, today  
3. Superset + static typing  
4. JS pipeline: Future → Current → Supported  
5. TS pipeline: **Types** → Future → Current → Supported  
6. JS = dynamic (anything goes)  
7. TS = static (type locked)  
8. Errors at **compile** time, not runtime  
9. Tooling = autocomplete, refactor, go-to, refs, errors, auto-import  
10. Express intent clearly — code for humans  

---

## 🔥 10-second recall quiz

Ask yourself:

1. What's the one extra step in the TS pipeline? → **Types**  
2. When does TS catch errors? → **Compile time**  
3. Can you add a field to a TS object freely? → **No — must be predefined**  
4. Why bother? → **Safer code + better tooling + clearer intent**

---

## ⚙️ Adding TypeScript to an Existing App — `tsconfig.json`

> 🎯 **One-liner:** `tsconfig.json` = the rulebook that tells the TypeScript compiler *how* to work.

### Step 1 — Create the rulebook

Put `tsconfig.json` in the **project root** (e.g. `client/tsconfig.json`).

Minimal starter:

```json
{
  "compilerOptions": {
    "target": "es5",
    "outDir": "dist"
  }
}
```

| Option | Sticky meaning |
|---|---|
| **`target`** | "How old should the output JS be?" — `es5` = works in almost every browser |
| **`outDir`** | "Where do the `.js` files go after transpile?" — usually `dist` |

### Step 2 — Watch mode (auto-recompile)

```bash
tsc -w
```

| Command | What happens |
|---|---|
| `tsc` | Compile once |
| `tsc -w` | **Watch** — recompiles every time you save |

> 🧩 **Remember:** `-w` = "keep watching my files."

### Step 3 — Prove it works

1. Create a file like `hello.ts`
2. Save it
3. With `tsc -w` running, a `hello.js` appears in `outDir` (`dist`)

```
hello.ts  ──tsc──►  dist/hello.js
   ↑                    ↑
 you write this      browser runs this
```

✅ `.ts` appears → `.js` appears = setup works.

---

## 📖 `compilerOptions` cheat sheet (our Vite client)

| Option | What it does | Sticky phrase |
|---|---|---|
| **`target`** | JS version to compile *down to* | "How old is the output?" |
| **`module`** | How `import` / `export` work | "Module style" |
| **`moduleResolution`** | How TS finds imported files | `"bundler"` for Vite |
| **`jsx`** | How JSX is transformed | `"react-jsx"` = no React import needed |
| **`outDir`** | Folder for compiled JS | "Put output here" |
| **`allowJs`** | Include `.js` / `.jsx` in the project | "JS files count too" |
| **`checkJs`** | Type-check JS files | `false` = include, don't nag yet |
| **`strict`** | All strict type checks ON | "Be picky (good for learning)" |
| **`noEmit`** | Don't write `.js` files | "Vite builds; TS only checks" |
| **`skipLibCheck`** | Skip checking `node_modules` | "Faster compiles" |
| **`isolatedModules`** | Each file must stand alone | "Required by Vite/esbuild" |
| **`esModuleInterop`** | Smoother imports from CommonJS libs | "Play nice with npm packages" |
| **`include`** | Which folders TS looks at | `["src"]` = only source |

> 💡 **Classic `tsc` projects:** use `target` + `outDir`, run `tsc -w`.  
> **Vite projects:** often use `noEmit: true` — Vite emits JS; TS only type-checks.

---

## 🔥 tsconfig recall quiz

1. What file configures the TypeScript compiler? → **`tsconfig.json`**  
2. Which option sets browser JS level? → **`target`** (e.g. `es5`)  
3. Which option sets output folder? → **`outDir`**  
4. How do you auto-recompile on save? → **`tsc -w`**  
5. How do you confirm setup? → Create a `.ts` file → see `.js` in `outDir`
