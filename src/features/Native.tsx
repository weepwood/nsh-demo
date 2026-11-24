import { Clipboard, platform, signal, Storage, Text, View } from "nsh";
import { currentWindow, isAvailable, Menu, Window } from "nsh/desktop";
import { Action, Field, Heading, Panel, Section } from "../ui/controls";
export function Native(){
  const value=signal("Hello from Native Shell"),result=signal("Ready");
  const win=isAvailable?currentWindow():null;
  async function attempt(fn:()=>Promise<string>){try{result.set(await fn());}catch(e){result.set("Error: "+String(e));}}
  return <View class="gap-5"><Heading eyebrow="Workspace / Native APIs" title="Platform laboratory" description="Run genuine platform operations with explicit error feedback."/>
    <Panel><Section title="Clipboard"><Field value={value()} placeholder="Clipboard text" onChange={v=>value.set(v)}/><View class="flex-row flex-wrap gap-2"><Action label="Copy" onPress={()=>attempt(async()=>{await Clipboard.writeText(value());return "Copied to clipboard.";})}/><Action label="Read" variant="outline" onPress={()=>attempt(async()=>{const text=await Clipboard.readText();value.set(text);return "Read clipboard.";})}/></View></Section></Panel>
    <Panel><Section title="Storage"><View class="flex-row flex-wrap gap-2"><Action label="Save sample" onPress={()=>attempt(async()=>{await Storage.setItem("studio.api.sample",value());return "Sample saved.";})}/><Action label="Load sample" variant="outline" onPress={()=>attempt(async()=>{const saved=await Storage.getItem("studio.api.sample");if(saved!==null)value.set(saved);return saved===null?"No saved sample.":"Sample loaded.";})}/><Action label="Remove sample" variant="ghost" onPress={()=>attempt(async()=>{await Storage.removeItem("studio.api.sample");return "Sample removed.";})}/></View></Section></Panel>
    <Panel><Section title="Desktop window & menu" description={isAvailable?"Available on this desktop backend.":"Unavailable in this environment."}>
      <View class="flex-row flex-wrap gap-2">
        <Action label="Resize window" disabled={!isAvailable} onPress={()=>{try{win?.setBounds({size:{width:1100,height:720}});result.set("Resize requested.");}catch(e){result.set(String(e));}}}/>
        <Action label="Open window" disabled={!isAvailable} variant="outline" onPress={()=>{try{Window.open(()=> <View class="flex-1 items-center justify-center bg-background p-5"><Text class="text-foreground">Native child window</Text></View>,{id:"studio-preview",title:"Native preview",defaultSize:{width:420,height:280}});result.set("Window requested.");}catch(e){result.set(String(e));}}}/>
        <Action label="Open menu" disabled={!isAvailable} variant="outline" onPress={()=>{try{void Menu.popup([{label:"Example action",onSelect:()=>result.set("Menu action selected.")}]).catch(e=>result.set(String(e)));}catch(e){result.set(String(e));}}}/>
      </View>
    </Section></Panel>
    <Panel><Text class="text-xs text-muted-foreground">RESULT · {platform.os}</Text><Text class="text-sm text-foreground">{result()}</Text></Panel>
  </View>;
}
