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

---

## 🏷️ Types and Type Checking

> 🎯 **One-liner:** Name → **colon** → type. Once set, TS locks it.

### The syntax (burn this in)

```ts
let displayName: string = "Akansha";
//              ↑
//         colon + type
```

| Pattern | Example |
|---|---|
| Variable | `let age: number = 25` |
| Parameter | `function greet(name: string)` |
| Return type | `function greet(name: string): string` |
| No return | `function log(msg: string): void` |

> 🧩 **Mnemonic:** `name: type` — label first, type after the colon.

### Once typed, TS enforces it

```ts
let displayName: string = "Akansha";
displayName = 42; // ❌ Error — string only, forever
```

**Sticky phrase:** *Assign a type → break the contract → red squiggle.*

---

### 7️⃣ Seven JavaScript primitives

```
string · boolean · number · bigint · null · undefined · symbol
```

| Type | Example | Remember as |
|---|---|---|
| `string` | `"hello"` | Text |
| `boolean` | `true` / `false` | Yes/No switch |
| `number` | `42`, `3.14` | All numbers (int + float) |
| `bigint` | `9007199254740991n` | Huge integers |
| `null` | `null` | Intentionally empty |
| `undefined` | `undefined` | Not set yet |
| `symbol` | `Symbol("id")` | Unique ID token |

> 💡 **Mnemonic:** *SBN BNUS* → **S**tring, **B**oolean, **N**umber, **B**igint, **N**ull, **U**ndefined, **S**ymbol  
> Or: *"Some Booleans Need Big Null Undefined Symbols"*

---

### Functions — params + return type

```ts
// params typed + return typed
function add(a: number, b: number): number {
  return a + b;
}

// no return value → void
function logMessage(msg: string): void {
  console.log(msg);
}
```

| Idea | Meaning |
|---|---|
| Param type | What goes **in** |
| Return type | What comes **out** |
| `void` | Comes out with **nothing** |

**TS catches mismatches:**

```ts
function getAge(): number {
  return "25"; // ❌ declared number, returned string
}
```

> 🧩 **Remember:** Return type = a promise to the caller. Break it → compile error.

---

### Inline object return shape

Define the returned object's structure right on the function:

```ts
function getUser(): { name: string; age: number } {
  return {
    name: "Akansha",
    age: 25,
  };
}

// ❌ Error — missing age, or wrong types
function badUser(): { name: string; age: number } {
  return { name: "Akansha" };
}
```

**Sticky visual:**

```
function  →  { prop: type; prop: type }
   ↑                    ↑
  name           blueprint of the return
```

---

### 📌 Types cheat sheet

1. Syntax: `name: type`  
2. Type assigned → enforced forever  
3. 7 primitives: string, boolean, number, bigint, null, undefined, symbol  
4. Type params **and** return value  
5. `void` = returns nothing  
6. Wrong return type → compile error  
7. Inline `{ prop: type }` = object shape

---

## 🔥 Types recall quiz

1. What's the type syntax? → **`name: type`** (colon after the name)  
2. How many JS primitives? → **7**  
3. Function that returns nothing uses? → **`void`**  
4. Can return type differ from what you actually return? → **No — TS errors**  
5. How do you type a returned object inline? → **`: { prop: type; ... }`**

---

## 🔮 Type Inference, `any`, and `as`

> 🎯 **One-liner:** TS often *guesses* your type. `any` says "don't check." `as` says "trust me."

---

### 1) Type Inference — TS guesses for you

You write a value → TS figures out the type. No annotation needed.

```ts
let name = "Akansha";  // TS infers: string
let age = 25;          // TS infers: number
let ok = true;         // TS infers: boolean

name = 10; // ❌ still error — inferred as string, locked
```

| Idea | Sticky phrase |
|---|---|
| Inference | "TS reads the value and picks the type" |
| Cleaner code | Less typing, same safety |
| Still enforced | Inferred ≠ free to change later |

> 🧩 **Remember:** Inference = auto-label. Once labeled, still locked.

---

### 2) Gradual Typing — type only when you want

TS lets you mix checked and unchecked code.

```
Full safety  ←————————→  Full freedom
  string         any          (like JS)
```

- Want safety? Use real types (or let TS infer).
- Need a temporary escape hatch? Use `any`.
- Use `any` **sparingly** — every `any` turns off the alarm.

---

### 3) Why type safety helps

When TS knows the type, you get:

| Benefit | What you feel |
|---|---|
| Compile-time errors | Bugs before you run |
| Autocomplete | "It finishes your sentence" |
| Better warnings | "Hey, that property doesn't exist" |

> 💡 **Sticky:** Types = free bodyguard + free autocomplete.

---

### 4) Explicit Typing — say it yourself

Inference is smart. Explicit is clearer for humans.

```ts
// inferred
let title = "Notes";

// explicit — clearer intent
let title: string = "Notes";

function getId(): number {
  return 1;
}
```

| Prefer explicit when… | Why |
|---|---|
| Function params / returns | Contract is obvious |
| Complex objects | Shape is documented |
| Public APIs | Other people read it |

> 🧩 **Rule:** Inference for simple locals. Explicit for important contracts.

---

### 5) `any` — the "off switch"

`any` disables type checking for that value (behaves like JS).

```ts
let data: any = "hello";
data = 42;        // ✅ allowed
data = true;      // ✅ allowed
data.foo.bar();   // ✅ allowed (dangerous — may crash at runtime)
```

| | Real type | `any` |
|---|---|---|
| Safety | ✅ On | ❌ Off |
| Autocomplete | ✅ Strong | ❌ Weak |
| Feels like | TypeScript | JavaScript |

> ⚠️ **Sticky phrase:** `any` = "I quit TypeScript for this variable."

---

### 6) `as` — "Trust me" (type assertion)

> 🎯 **Simple idea:** TypeScript is unsure. **You** know better.  
> `as` means: *"TS, treat this value as THIS type."*

It does **not** convert the value. It only changes how TS *thinks* about it.

```
Real value stays the same
         ↓
  "42" as number   ❌ still the string "42" at runtime
         ↓
  Only the TYPE LABEL changes in TypeScript's mind
```

> 🧩 **Sticky analogy:**  
> Value = a sealed box.  
> Type = the label on the box.  
> `as` = you slap a new label on — you don't open or change what's inside.

---

#### Example 1 — DOM element (most common)

```ts
// TS knows: getElementById can return HTMLElement | null
const el = document.getElementById("app");

// el.innerText = "Hi";  
// ❌ TS: might be null, and HTMLElement is too generic

// You KNOW this id is a <div> that exists:
const app = document.getElementById("app") as HTMLDivElement;
app.innerText = "Hi"; // ✅ TS trusts you
```

**What you told TS:** *"This is definitely a div."*

---

#### Example 2 — JSON from an API

```ts
type Note = { id: string; title: string };

const raw = '{"id":"1","title":"Learn TS"}';

// JSON.parse returns `any` (or unknown in strict setups)
// You know the shape, so you assert it:
const note = JSON.parse(raw) as Note;

console.log(note.title); // ✅ autocomplete works
```

**What you told TS:** *"This parsed JSON is a Note."*

⚠️ If the JSON is actually `{ "foo": 1 }`, TS won't warn you — runtime can still break.

---

#### Example 3 — Event target

```ts
function onChange(e: Event) {
  // e.target is EventTarget | null — too vague for TS
  const input = e.target as HTMLInputElement;
  console.log(input.value); // ✅ now TS knows it's an <input>
}
```

**What you told TS:** *"This event came from an input."*

---

#### Example 4 — Good vs Bad `as`

```ts
// ✅ GOOD — you are correct about the real value
const box = document.querySelector(".card") as HTMLDivElement;

// ❌ BAD — you lied to TypeScript
const age = "twenty" as unknown as number;
console.log(age + 1); // runs… but result is weird/"twenty1"
// TS is happy. Your app is not.
```

| Situation | Use `as`? |
|---|---|
| You truly know the type (DOM id, API shape you control) | ✅ OK |
| You're guessing / silencing an error | ❌ Avoid |
| You want to *convert* `"42"` → `42` | ❌ Use `Number("42")`, not `as` |

---

#### `as` vs `:` (don't mix them up)

```ts
// Explicit type (declaration) — value MUST match
let title: string = "Notes";
let title: string = 123; // ❌ Error

// Assertion (as) — you FORCE the label
let data = 123 as string; // TS accepts… even though it's wrong
```

| | `:` explicit | `as` assertion |
|---|---|---|
| Who decides? | You declare, TS **checks** | You declare, TS **believes** |
| Wrong value? | ❌ Compile error | ✅ Compiles (danger) |
| Changes runtime value? | No | No |

> ⚠️ **Final sticky:**  
> `:` = "check me"  
> `as` = "believe me"  
> `any` = "ignore me"

---

### 📌 Instant cheat sheet

| Tool | Meaning | Risk |
|---|---|---|
| **Inference** | TS auto-detects type | Low — still safe |
| **Explicit `:`** | You write the type | Lowest — clearest |
| **`any`** | Turn checking off | High — use rarely |
| **`as`** | Override TS's opinion | Medium/High — only when sure |

**Tiny decision guide:**

```
Can TS guess it?     → let it infer
Is it an API/param?  → type it explicitly
Stuck with unknown?  → prefer unknown + narrow, not any
100% sure of type?   → as (carefully)
Just want JS back?   → any (last resort)
```

---

## 🔥 Inference / any / as quiz

1. What is type inference? → **TS auto-detects the type from the value**  
2. Does inferred type still get enforced? → **Yes**  
3. What does `any` do? → **Turns off type checking**  
4. When should you use `any`? → **Sparingly / last resort**  
5. What does `as` mean? → **"Trust me, this is that type"**  
6. Explicit vs inferred — which is clearer for APIs? → **Explicit**
