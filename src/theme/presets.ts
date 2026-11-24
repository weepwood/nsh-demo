import { colorScheme, setColorScheme, setTheme, signal, Storage } from "nsh";
import base from "../../theme.json";

export type Appearance = "system" | "light" | "dark";
export const presets = ["Neutral", "Nordic", "Paper", "Olive", "Graphite"] as const;
export type Preset = typeof presets[number];
export const appearance = signal<Appearance>("system");
export const preset = signal<Preset>("Neutral");
export const themeError = signal("");
const overrides: Record<Preset, {light: Record<string,string>; dark: Record<string,string>}> = {
  Neutral: {light:{},dark:{}},
  Nordic: {light:{background:"#edf1f5",sidebar:"#e0e7ee",card:"#f9fbfd",primary:"#426b91",accent:"#dce6f0","accent-foreground":"#284e73"},dark:{background:"#18222e",sidebar:"#141c25",card:"#202d3b",primary:"#8bb6de",accent:"#2c4155","accent-foreground":"#c3ddf6"}},
  Paper: {light:{background:"#f4f0e8",sidebar:"#ebe5d9",card:"#fdfbf6",primary:"#80583c",accent:"#e9ddca","accent-foreground":"#69432c"},dark:{background:"#26221e",sidebar:"#211c18",card:"#302923",primary:"#e0ac82",accent:"#49392e","accent-foreground":"#f2d4bd"}},
  Olive: {light:{background:"#eff1eb",sidebar:"#e1e6da",card:"#fafbf7",primary:"#4c683d",accent:"#dce7d2","accent-foreground":"#3a512d"},dark:{background:"#20251e",sidebar:"#1a2019",card:"#2b3328",primary:"#a6c68c",accent:"#36472e","accent-foreground":"#d1e6bd"}},
  Graphite: {light:{background:"#f2f2f2",sidebar:"#e7e7e7",card:"#ffffff",primary:"#424242",accent:"#dedede","accent-foreground":"#303030"},dark:{background:"#262626",sidebar:"#1c1c1c",card:"#303030",primary:"#dddddd",accent:"#424242","accent-foreground":"#eeeeee"}}
};
export function makeTheme(name: Preset) {
  return { cssVars: { theme: base.cssVars.theme, light: {...base.cssVars.light,...overrides[name].light}, dark: {...base.cssVars.dark,...overrides[name].dark} } };
}
let revision = 0;
let pending = Promise.resolve();
function save() {
  const value = JSON.stringify({appearance:appearance(),preset:preset()});
  pending = pending.catch(()=>{}).then(()=>Storage.setItem("studio.theme.v1",value)).catch(e=>{themeError.set(String(e));});
}
export function chooseAppearance(value: Appearance) {
  revision++; setColorScheme(value); appearance.set(value); save();
}
export function choosePreset(value: Preset) {
  try { setTheme(makeTheme(value)); preset.set(value); revision++; themeError.set(""); save(); }
  catch(e) { themeError.set(String(e)); }
}
export async function restoreTheme() {
  const before=revision;
  try {
    const raw=await Storage.getItem("studio.theme.v1");
    if(!raw || revision!==before) return;
    const data=JSON.parse(raw);
    if(presets.includes(data.preset)) {setTheme(makeTheme(data.preset));preset.set(data.preset);}
    if(["system","light","dark"].includes(data.appearance)) {setColorScheme(data.appearance);appearance.set(data.appearance);}
  } catch(e) { themeError.set(String(e)); }
}
export const effectiveAppearance = colorScheme;

