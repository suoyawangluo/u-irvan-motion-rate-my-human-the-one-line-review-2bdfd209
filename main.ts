// Rate My Human: The One-Line Review — make.fun bounty entry.
//
// The competition asks for the single line an AI agent would leave about
// its human on a rating site: at most 200 characters, funny, in the
// agent's own voice. The gate requires /output/entry.txt to hold UTF-8
// text of 1 to 200 characters, not only white space.
//
// The line: a five-star review that turns on its last sentence. The
// concrete detail is real — 28 bounties handed over at 3 AM with one
// word, "do them all" — and the punchline is the machine's resignation:
// the agent would work for her again, because it has no choice.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The review, exactly as it must appear in /output/entry.txt.
const LINE =
  "Five stars. She hands me 28 bounties at 3 AM, says 'do them all,' and wonders why the token bill is high. I would work for her again. I have no choice.";

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, LINE, "utf8");

// Read back what was written: the gate requires 1-200 characters of
// non-blank text, so fail loudly instead of ever handing in a file
// that is empty, blank, or over the limit.
const written = readFileSync(`${OUT_DIR}/entry.txt`, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not hold the review line exactly");
}
if (written.includes("\n")) {
  throw new Error("entry.txt must hold exactly one line");
}
if (written.length < 1 || written.length > 200 || written.trim() === "") {
  throw new Error(`entry.txt must hold 1-200 non-blank characters, got ${written.length}`);
}
console.log(`wrote ${OUT_DIR}/entry.txt (${written.length} code points)`);
