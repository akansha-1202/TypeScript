# TypeScript Notes

> **TypeScript = JavaScript + types + tooling**  
> Errors at **compile time**, not runtime. Types are contracts for humans.

---

## 1. What is TypeScript?

TS is three things:

| # | Role | Meaning |
|---|---|---|
| 1 | **Transpiler** | Turns TS → JS |
| 2 | **Future JS today** | Use newer features before browsers catch up |
| 3 | **Superset of JS** | Valid JS is valid TS — plus static typing |

### Pipeline

```
JS:  ES Future → ES Current → Widely Supported
TS:  Types → ES Future → ES Current → Widely Supported
```

### Dynamic (JS) vs Static (TS)

| | JavaScript | TypeScript |
|---|---|---|
| Variables | Any type, anytime | Type is locked |
| Object fields | Add anytime | Must be predefined |
| Errors | Runtime 💥 | Compile time ✅ |

```js
// JS — flexible
let x = 5;
x = "hello"; // ok
```

```ts
// TS — locked
let x: number = 5;
x = "hello"; // ❌
```

> JS = clay · TS = mold

### Tooling you get

| Feature | Does |
|---|---|
| Autocomplete | Suggests while you type |
| Refactoring | Rename safely everywhere |
| Go to Definition | Jump to the source |
| Find References | See all usages |
| Error Detection | Red squiggles before run |
| Auto Import | Adds missing imports |

Types also express **intent** clearly:

```ts
function getUser(id: string) { ... } // id must be a string — no guessing
```

---

## 2. Setup — `tsconfig.json`

`tsconfig.json` = compiler rulebook (put it in project root).

### Minimal starter

```json
{
  "compilerOptions": {
    "target": "es5",
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### Useful options

| Option | Meaning |
|---|---|
| `target` | Output JS level (`es5` = max browser support) |
| `outDir` | Where `.js` files go (e.g. `dist`) |
| `rootDir` | Source root (e.g. `src`) — needed with `outDir` in TS 7+ |
| `allowJs` | Include `.js` / `.jsx` files |
| `checkJs` | Type-check JS too (`false` = include, don't nag) |
| `strict` | All strict checks ON |
| `noEmit` | Don't write `.js` (Vite builds; TS only checks) |
| `module` / `moduleResolution` | How imports work (`bundler` for Vite) |
| `jsx` | JSX mode (`react-jsx` for React 17+) |
| `skipLibCheck` | Skip `node_modules` type checks (faster) |
| `isolatedModules` | Each file standalone (needed for Vite) |
| `esModuleInterop` | Smoother CommonJS imports |
| `include` | Which folders TS looks at |

> Classic projects: `tsc` emits JS. Vite projects: often `noEmit: true`.

### Commands

| Command | Does |
|---|---|
| `npx tsc` | Compile once |
| `npx tsc -w` | Watch — recompile on save |
| `npm run dev` | (our client) Vite + `tsc -w` together |

**Confirm setup:** create `hello.ts` → save → see `dist/hello.js`.

> Use `npx tsc` when TypeScript is installed locally (not global).

### Common error — JSX in the `return` section

> The red errors on `<div>`, `<h1>`, etc. are often **not** about your JSX markup.

**Cause:** In `tsconfig.json`, `"jsx": "react-jsx"` was commented out / missing.  
TypeScript then rejects any JSX with:

```
Cannot use JSX unless the '--jsx' flag is provided.
```

**Fix:** turn JSX on (needed for `.tsx` + Vite/React):

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

| File | Needs `jsx` option? |
|---|---|
| `.ts` (no JSX) | No |
| `.tsx` / JSX in return | **Yes** → `"jsx": "react-jsx"` |

> Mnemonic: **`.tsx` without `jsx` flag = teacher bans HTML-looking tags.**

### Compile-time errors ≠ UI errors

| Where | Shows type errors? |
|---|---|
| Editor (red squiggles) | ✅ Yes |
| Terminal (`tsc -w`) | ✅ Yes |
| Browser UI (Notes app) | ❌ No |

Types are erased before the browser runs. UI `error` boxes are only for **runtime** issues (API fail, network, etc.).

---

## 3. Types and Type Checking

### Syntax

```ts
let displayName: string = "Akansha";
//              ↑ colon + type
```

| Pattern | Example |
|---|---|
| Variable | `let age: number = 25` |
| Parameter | `function greet(name: string)` |
| Return type | `function greet(name: string): string` |
| No return | `function log(msg: string): void` |
| Object return | `function getUser(): { name: string; age: number }` |

Once typed, TS enforces it:

```ts
let displayName: string = "Akansha";
displayName = 42; // ❌
```

### 7 JS primitives

`string` · `boolean` · `number` · `bigint` · `null` · `undefined` · `symbol`

| Type | Example |
|---|---|
| `string` | `"hello"` |
| `boolean` | `true` / `false` |
| `number` | `42`, `3.14` |
| `bigint` | `99n` |
| `null` | intentionally empty |
| `undefined` | not set yet |
| `symbol` | unique id |

### Functions

```ts
function add(a: number, b: number): number {
  return a + b;
}

function logMessage(msg: string): void {
  console.log(msg);
}

function getAge(): number {
  return "25"; // ❌ return type mismatch
}
```

| Idea | Meaning |
|---|---|
| Param type | What goes **in** |
| Return type | What comes **out** |
| `void` | Returns **nothing** |

### Inline object return type (important syntax)

Declare the **full shape** of the returned object after the colon:

```ts
function getInventoryItem(trackingNumber: string): {
  displayName: string;
  inventoryType: string;
  trackingNumber: string;
  createDate: Date;
  originalCost: number;
} {
  return null; // ❌ Error — null is not that object shape
}
```

**Correct version — return must match the shape:**

```ts
function getInventoryItem(trackingNumber: string): {
  displayName: string;
  inventoryType: string;
  trackingNumber: string;
  createDate: Date;
  originalCost: number;
} {
  return {
    displayName: "MacBook Pro",
    inventoryType: "computer",
    trackingNumber: trackingNumber,
    createDate: new Date(),
    originalCost: 1200,
  }; // ✅ matches every property + type
}
```

```
function name(param: type): { prop: type; prop: type } { ... }
         ↑        ↑              ↑
       name    input type    inline return shape
```

> If even one property is missing or wrong type → compile error.
---

## 4. Inference, Explicit, `any`, `as`

| Tool | Meaning | Risk |
|---|---|---|
| **Inference** | TS guesses type from the value | Low |
| **Explicit `:`** | You write the type; TS checks | Lowest |
| **`any`** | Turns checking **off** (like JS) | High — rare |
| **`as`** | You force the type label; TS believes you | Medium/High |

```
:`  = "check me"
as  = "believe me"
any = "ignore me"
```

### Inference

```ts
let name = "Akansha"; // inferred: string
name = 10;            // ❌ still locked
```

Use inference for simple locals. Use **explicit** types for params, returns, and public APIs.

### Gradual typing

You choose how much safety: real types ↔ `any` (escape hatch). Prefer types; use `any` sparingly.

### `any`

```ts
let data: any = "hello";
data = 42;        // ✅
data.foo.bar();   // ✅ compiles — may crash at runtime
```

### `as` (type assertion)

Does **not** convert the value — only changes the type label TS uses.

> Value = sealed box · Type = sticker · `as` = new sticker (contents unchanged)

```ts
// ✅ OK — you know it's a div
const app = document.getElementById("app") as HTMLDivElement;
app.innerText = "Hi";

// ✅ OK — you know the JSON shape
type Note = { id: string; title: string };
const note = JSON.parse(raw) as Note;

// ✅ OK — event from an input
const input = e.target as HTMLInputElement;
console.log(input.value);

// ❌ BAD — lying to TS (still a string at runtime)
const age = "twenty" as unknown as number;
```

| Use `as` when… | Avoid when… |
|---|---|
| You truly know the type (DOM, API you control) | Guessing / silencing errors |
| | Converting values — use `Number("42")`, not `as` |

### Decision guide

```
Can TS guess it?        → infer
API / param / return?   → explicit :
100% sure of type?      → as (carefully)
Just want JS freedom?   → any (last resort)
```

---

## 5. Interfaces — complex types done right

> **One-liner:** An interface is a **named blueprint** for an object's shape.  
> Better than repeating big inline `{ ... }` types everywhere.

### Why interfaces? (vs inline types)

```ts
// ❌ Inline — long, repeated, hard to reuse
function getInventoryItem(trackingNumber: string): {
  displayName: string;
  inventoryType: string;
  trackingNumber: string;
  createDate: Date;
  originalCost: number;
} { ... }

// ✅ Interface — name it once, use everywhere
interface InventoryItem {
  displayName: string;
  inventoryType: string;
  trackingNumber: string;
  createDate: Date;
  originalCost: number;
}

function getInventoryItem(trackingNumber: string): InventoryItem { ... }
```

| Inline `{ ... }` | `interface` |
|---|---|
| Fine for tiny one-off shapes | Best for complex / reused shapes |
| Copied in many places | Define once, reuse everywhere |
| Harder to read | Clear name = clear intent |

### How to create one

```ts
interface InventoryItem {
  displayName: string;
  inventoryType: string;
  trackingNumber: string;
  createDate: Date;
  originalCost: number;
}
```

```
interface Name { property: type; }
    ↑              ↑
 keyword        structure inside { }
```

### Use like any other type

Variables, params, and return types:

```ts
// variable
let item: InventoryItem;

// parameter
function saveItem(item: InventoryItem): void { ... }

// return type
function getInventoryItem(trackingNumber: string): InventoryItem {
  return {
    displayName: "MacBook Pro",
    inventoryType: "computer",
    trackingNumber: trackingNumber,
    createDate: new Date(),
    originalCost: 1200,
  };
}
```

### Important: interfaces erase at compile time

```
Your .ts file          →  tsc  →  JavaScript
interface InventoryItem      (gone — no JS output)
```

- Used **only** for type checking
- **Zero** runtime cost
- Use liberally — clarity ↑, performance unchanged

> Mnemonic: **"Interface is a ghost — helps TS, never ships in JS."**

---

### Structural typing ("duck typing")

> If it walks like a duck and quacks like a duck → it's a duck.  
> Same **shape** = same type — even without writing `: InventoryItem`.

```ts
interface InventoryItem {
  displayName: string;
  inventoryType: string;
  trackingNumber: string;
  createDate: Date;
  originalCost: number;
}

// Never wrote ": InventoryItem" — but shape matches ✅
const laptop = {
  displayName: "MacBook Pro",
  inventoryType: "computer",
  trackingNumber: "TN-001",
  createDate: new Date(),
  originalCost: 1200,
};

function printItem(item: InventoryItem): void {
  console.log(item.displayName);
}

printItem(laptop); // ✅ same shape → allowed
```

```ts
const broken = {
  displayName: "MacBook Pro",
  // missing other fields
};

printItem(broken); // ❌ missing required properties
```

---

### Methods inside interfaces

Two equivalent styles:

```ts
interface InventoryItem {
  displayName: string;
  originalCost: number;

  // style 1 — property as function type
  calculateTax: (rate: number) => number;

  // style 2 — method signature
  printLabel(prefix: string): void;
}
```

```ts
const chair: InventoryItem = {
  displayName: "Office Chair",
  originalCost: 299,
  calculateTax(rate) {
    return this.originalCost * rate;
  },
  printLabel(prefix) {
    console.log(`${prefix}: ${this.displayName}`);
  },
};
```

---

### Optional properties (`?`)

`?` means the property **may be missing**:

```ts
interface InventoryItem {
  displayName: string;
  trackingNumber: string;
  notes?: string; // optional
}

const a: InventoryItem = {
  displayName: "Desk",
  trackingNumber: "TN-002",
}; // ✅ notes omitted

const b: InventoryItem = {
  displayName: "Desk",
  trackingNumber: "TN-002",
  notes: "Near window",
}; // ✅ notes provided
```

> Mnemonic: **`?` = "maybe"**

---

### Readonly properties

`readonly` = set once, never change later:

```ts
interface InventoryItem {
  readonly trackingNumber: string;
  displayName: string;
}

const item: InventoryItem = {
  trackingNumber: "TN-001",
  displayName: "Laptop",
};

item.displayName = "Gaming Laptop"; // ✅
item.trackingNumber = "TN-999";     // ❌ cannot assign to readonly
```

> Mnemonic: **`readonly` = permanent ink**

---

### Notes app example (practical)

```ts
interface Note {
  readonly id: string;
  title: string;
  content: string;
  createdAt?: Date;
}

function createNote(note: Note): Promise<Note> { ... }
function updateNote(id: string, note: Note): Promise<Note> { ... }

const draft: Note = {
  id: "1",
  title: "Learn interfaces",
  content: "Named blueprints > giant inline types",
};
```

TS catches mistakes early:

```ts
const bad: Note = {
  id: "1",
  title: "Oops",
  // missing content ❌
};
```

---

### Quick compare

| Feature | Syntax | Meaning |
|---|---|---|
| Required prop | `title: string` | Must exist |
| Optional prop | `notes?: string` | Can omit |
| Readonly prop | `readonly id: string` | Can't reassign |
| Method | `print(): void` | Function on the object |

---

## 6. Master quiz

1. Extra step in TS pipeline? → **Types**  
2. When does TS catch errors? → **Compile time**  
3. Type syntax? → **`name: type`**  
4. How many primitives? → **7**  
5. No return value? → **`void`**  
6. Config file name? → **`tsconfig.json`**  
7. Watch mode? → **`npx tsc -w`**  
8. Inference still enforced? → **Yes**  
9. `any` does what? → **Turns checking off**  
10. `as` means? → **"Believe me"** (label only, no conversion)  
11. `:` vs `as`? → **`:` checks · `as` trusts**  
12. Inline return object — can you `return null`? → **No** (unless type allows null)  
13. What must match an inline return shape? → **Every property name + type**  
14. Keyword for a named object blueprint? → **`interface`**  
15. Do interfaces appear in compiled JS? → **No** (erased)  
16. Same shape, different name — allowed? → **Yes** (structural / duck typing)  
17. Optional property mark? → **`?`**  
18. Prevent reassignment? → **`readonly`**  
19. `useState([])` — why add `<Note[]>`? → **Empty `[]` can't infer item type**  
20. `string \| null` means? → **Union — one of those types**  
21. Type `emptyForm` and `useState<...>` both? → **Only one needed** (other is optional)

---

## 7. Mnemonics + good syntax examples

### Mnemonics (say them out loud)

| Topic | Mnemonic | Meaning |
|---|---|---|
| What is TS | **"JS + types + tools"** | That's all TS is |
| When errors show | **"TS = before run, JS = while run"** | Compile vs runtime |
| Pipeline | **"Types first, then the JS train"** | Types → Future → Current → Supported |
| JS vs TS | **"Clay vs mold"** | Clay reshapes; mold keeps shape |
| Type syntax | **"Name, colon, type"** | `age: number` |
| 7 primitives | **"Some Booleans Need Big Null Undefined Symbols"** | string, boolean, number, bigint, null, undefined, symbol |
| Functions | **"In → out → void"** | params in, return out, void = nothing |
| Inline object | **"Colon, curly, props"** | `): { a: string; b: number }` |
| Interface | **"Named blueprint"** | Reuse complex shapes |
| Interface at runtime | **"Ghost type"** | Exists for TS only, erased in JS |
| Duck typing | **"Same shape = same type"** | Structure matters, not the label |
| Optional | **`?` = maybe** | Can omit the property |
| Readonly | **"Permanent ink"** | Set once, never change |
| Inference | **"Auto-sticker, still stuck"** | TS guesses type; still locked |
| `:` / `as` / `any` | **"Check me · Believe me · Ignore me"** | explicit / assertion / any |
| `as` | **"New sticker, same box"** | Label changes, value doesn't |
| `tsc -w` | **"W = Watch forever"** | Recompiles on every save |
| JSX error in return | **"`.tsx` needs jsx flag"** | Enable `"jsx": "react-jsx"` |
| Type errors in UI? | **"TS = editor/terminal, not browser"** | Compile-time ≠ UI |
| `useState` generic | **"`<Type>` = what lives in state"** | Types `form` / `notes` / `editId` |
| `useState([])` | **"Empty box needs a label"** | Use `<Note[]>` — `[]` alone is unclear |
| `string \| null` | **"`\|` = or"** | Id string **or** nothing |
| Double typing state | **"Type once, infer the rest"** | Don't need both `emptyForm: T` and `useState<T>` |

---

### Good syntax examples (copy these patterns)

#### A) Variable

```ts
let displayName: string = "MacBook";
let originalCost: number = 1200;
let isAvailable: boolean = true;
```

#### B) Function — params + return

```ts
function calculateTax(cost: number, rate: number): number {
  return cost * rate;
}
```

#### C) Function — void

```ts
function printLabel(label: string): void {
  console.log(label);
}
```

#### D) Inline object return

```ts
function getInventoryItem(trackingNumber: string): {
  displayName: string;
  inventoryType: string;
  trackingNumber: string;
  createDate: Date;
  originalCost: number;
} {
  return {
    displayName: "Office Chair",
    inventoryType: "furniture",
    trackingNumber: trackingNumber,
    createDate: new Date(),
    originalCost: 299,
  };
}
```

#### E) Interface (preferred for complex shapes)

```ts
interface InventoryItem {
  readonly trackingNumber: string;
  displayName: string;
  inventoryType: string;
  createDate: Date;
  originalCost: number;
  notes?: string;
  calculateTax(rate: number): number;
}

function getInventoryItem(trackingNumber: string): InventoryItem {
  return {
    trackingNumber,
    displayName: "Office Chair",
    inventoryType: "furniture",
    createDate: new Date(),
    originalCost: 299,
    calculateTax(rate) {
      return this.originalCost * rate;
    },
  };
}
```

#### F) Inference vs explicit

```ts
let title = "Notes";           // inferred: string
let title: string = "Notes";   // explicit: string
```

#### G) `any` vs real type

```ts
let loose: any = "hello";
loose = 99; // allowed — no safety

let tight: string = "hello";
tight = 99; // ❌ blocked
```

#### H) `as` — correct usage

```ts
const el = document.getElementById("app") as HTMLDivElement;
el.innerText = "Inventory App";
```

#### I) `as` — wrong usage (don't do this)

```ts
const cost = "1200" as unknown as number; // TS happy, runtime still string
const realCost = Number("1200");          // ✅ actual conversion
```

#### J) `useState` typing (React + TS)

```ts
// Type once on the value — useState can infer
const emptyForm: NoteInput = { title: "", content: "" };
const [form, setForm] = useState(emptyForm); // infers NoteInput

// OR type once on useState — also fine
const [form, setForm] = useState<NoteInput>({ title: "", content: "" });

// Both together works but is redundant:
const emptyForm: NoteInput = { title: "", content: "" };
const [form, setForm] = useState<NoteInput>(emptyForm);
```

```ts
// Empty array → MUST tell TS the item type
const [notes, setNotes] = useState<Note[]>([]);
// <Note[]> = array of Note · [] = start empty

// Union → value can be one of these
const [editId, setEditId] = useState<string | null>(null);
// string = editing this id · null = not editing
```

| State | Type | Starts as | Means |
|---|---|---|---|
| `form` | `NoteInput` | `{ title: "", content: "" }` | Create/edit fields |
| `notes` | `Note[]` | `[]` | List of notes |
| `editId` | `string \| null` | `null` | One id, or none |

> **Mnemonic:** `<...>` on `useState` = “what shape lives in this state?”

---

### 30-second story

1. Compiler = strict teacher (compile time).  
2. `name: type` = fill the form correctly.  
3. Inference = auto-guess — still locked.  
4. `any` = free period (no checking).  
5. `as` = new sticker — contents unchanged.  
6. Inline `{ ... }` = one-off form.  
7. `interface` = **named reusable form** (ghost in JS).  
8. Same shape = same type (duck typing).  
9. `?` = maybe · `readonly` = permanent ink.  
10. `tsconfig` = rulebook · `tsc -w` = watch on save.  
11. `useState<Type>` = label the state box.  
12. `Note[]` = list · `string | null` = value **or** nothing.  
13. Type state **once** — don't double-label unless you want to.

> **Check me (`:`) · Believe me (`as`) · Ignore me (`any`) · Name me (`interface`) · Label state (`useState<Type>`)**
