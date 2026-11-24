import { expect, open, test } from "nsh/test";
test("workspace opens and button playground responds",async()=>{
  const app=await open("./App.tsx");
  await app.waitFor("Native Shell Studio");
  await app.press("Browse components");
  await app.waitFor("LIVE PREVIEW");
  await app.press("Continue");
  await app.waitFor("Pressed 1 times");
});
test("task creation persists in the current store",async()=>{
  const app=await open("./App.tsx");
  await app.press("Open task example");
  await app.waitFor("Task manager");
  await app.type("text:New task","Test native task");
  await app.press("role:button[Add task]");
  await app.waitFor("Test native task");
  expect(app.value("text:New task")).toBe("");
});
test("appearance page switches presets",async()=>{
  const app=await open("./App.tsx");
  await app.press("Themes");
  await app.waitFor("Appearance");
  await app.press("Nordic");
  await app.press("dark");
  await app.waitFor("Effective appearance: dark");
  await app.press("system");
  await app.press("Neutral");
});
