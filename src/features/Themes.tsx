import { Clipboard, signal, Text, View } from "nsh";
import { appearance, chooseAppearance, choosePreset, effectiveAppearance, makeTheme, preset, presets, themeError, type Appearance } from "../theme/presets";
import { Action, Check, Field, Heading, Panel, Section, Segments, Toggle } from "../ui/controls";
export function Themes(){
  const value=signal(""),on=signal(true),message=signal("");
  return <View class="gap-5"><Heading eyebrow="Workspace / Themes" title="Appearance" description="Change the live application theme, without replacing component behavior."/>
    <Section title="Color scheme"><Segments items={["system","light","dark"]} value={appearance()} onChange={v=>chooseAppearance(v as Appearance)}/><Text class="text-sm text-muted-foreground">Effective appearance: {effectiveAppearance()}</Text></Section>
    <Section title="Theme presets"><View class="flex-row flex-wrap gap-2"><Each of={[...presets]}>{item=><Action label={item()} variant="outline" selected={preset()===item()} onPress={()=>choosePreset(item())}/>}</Each></View></Section>
    <Panel><Text class="text-base font-semibold text-foreground">Live component preview</Text><View class="flex-row flex-wrap gap-2"><Action label="Primary" onPress={()=>message.set("Primary action")}/><Action label="Secondary" variant="secondary" onPress={()=>message.set("Secondary action")}/><Action label="Destructive" variant="danger" onPress={()=>message.set("Destructive preview")}/></View>
      <Field value={value()} onChange={v=>value.set(v)} placeholder="Text field"/><Check label="Selected" checked={on()} onChange={v=>on.set(v)}/><Toggle label="Enabled" checked={on()} onChange={v=>on.set(v)}/>
    </Panel>
    <Action label="Copy theme JSON" variant="outline" onPress={async()=>{try{await Clipboard.writeText(JSON.stringify(makeTheme(preset()),null,2));message.set("Theme copied.");}catch(e){message.set(String(e));}}}/>
    <Text class="text-sm text-muted-foreground">{themeError()||message()}</Text>
  </View>;
}
