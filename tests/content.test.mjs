import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../src/data/site.ts", import.meta.url), "utf8");

test("preserva os fatos publicados do Instituto", () => {
  assert.match(source, /CRM GO 19862/);
  assert.match(source, /5564981168122/);
  assert.match(source, /Augusto Neto, 11/);
  assert.match(source, /75703-300/);
  assert.match(source, /instagram.com\/drlucasabrahao/);
  assert.match(source, /Universidade de Uberaba/);
  assert.match(source, /Albert Einstein/);
  assert.match(source, /Renata Cassandro/);
  assert.match(source, /89,0 kg/);
  assert.match(source, /58,5 kg/);
  for (const slug of ["obesidade", "performance", "envelhecimento", "reposicao-hormonal"]) {
    assert.match(source, new RegExp(`slug: "${slug}"`));
  }
});
