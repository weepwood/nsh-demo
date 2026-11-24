import { Clipboard, List, signal, Text, View } from "nsh";
import { AlertDialog } from "nsh/base";
import { Action, Badge, Check, Choice, Field, Heading, Meter, Modal, Panel, Range, Section, Segments, Separator, Toggle, type Size, type Variant } from "../ui/controls";
import { component } from "../stores/navigation";
import { catalog } from "./catalog";
const variants:Variant[]=["primary","secondary","outline","ghost","danger"];
const sizes:Size[]=["sm","md","lg"];
const variant=signal<Variant>("primary"), size=signal<Size>("md"), disabled=signal(false);
const pressed=signal(0), checked=signal(false), input=signal(""), amount=signal(42), choice=signal("Option A"), tab=signal("Preview"), opened=signal(false), result=signal("");
const data=Array.from({length:10000},(_,i)=>({id:String(i),title:"Virtual row "+(i+1)}));
const options=["Option A","Option B","Option C"].map(value=>({value,title:value}));
export function source(){
  switch(component()){
    case "Button": return '<Action label="Continue" variant="'+variant()+'" size="'+size()+'"'+(disabled()?' disabled':'')+' onPress={handlePress} />';
    case "Input":return '<Field value={value()} onChange={value.set} placeholder="Type something" />';
    case "Textarea":return '<Field multiline value={value()} onChange={value.set} placeholder="Write a note" />';
    case "Checkbox":return '<Check label="Enable option" checked={checked()} onChange={checked.set} />';
    case "Switch":return '<Toggle label="Enable option" checked={checked()} onChange={checked.set} />';
    case "Slider":return '<Range label="Value" value={amount()} onChange={amount.set} />';
    case "Select":return '<Choice label="Option" items={options} value={choice()} onChange={choice.set} />';
    case "Tabs":return '<Segments items={["Preview", "Details"]} value={tab()} onChange={tab.set} />';
    case "Progress":return '<Meter label="Progress" value={amount()} />';
    case "Badge":return '<Badge label="Native" />';
    case "Dialog":return '<Modal open={opened()} title="Preview dialog" onClose={close}>...</Modal>';
    case "Alert":return 'await AlertDialog.show({ title, actions });';
    case "Panel":return '<Panel>...</Panel>';
    case "Separator":return '<Separator />';
    case "List":return '<List each={data} keyExtractor={item => item.id} estimatedItemSize={36}>...</List>';
  }
}
async function copy(){try{await Clipboard.writeText(source());result.set("Copied source.");}catch(e){result.set("Clipboard unavailable: "+String(e));}}
export function ComponentInspector(){
  return <View class="gap-4 p-4"><Text class="text-base font-semibold text-foreground">Inspector</Text>
    <Text class="text-xs text-muted-foreground">{component()} properties</Text>
    <If when={component()==="Button"}>
      <Section title="Variant"><Choice label="Variant" items={variants.map(value=>({value,title:value}))} value={variant()} onChange={v=>variant.set(v as Variant)}/></Section>
      <Section title="Size"><Choice label="Size" items={sizes.map(value=>({value,title:value}))} value={size()} onChange={v=>size.set(v as Size)}/></Section>
    </If>
    <If when={["Button","Checkbox","Switch"].includes(component())}><Toggle label="Disabled" checked={disabled()} onChange={v=>disabled.set(v)}/></If>
    <If when={["Slider","Progress"].includes(component())}><Range label="Value" value={amount()} onChange={v=>amount.set(v)}/></If>
    <Action label="Reset" variant="outline" onPress={()=>{variant.set("primary");size.set("md");disabled.set(false);pressed.set(0);checked.set(false);input.set("");amount.set(42);choice.set("Option A");tab.set("Preview");result.set("");}}/>
    <Separator/><Text class="text-xs text-muted-foreground">Studio controls wrap NSH base behavior with semantic styling.</Text>
  </View>;
}
export function Components(){
  return <View class="gap-5">
    <Heading eyebrow="Workspace / Components" title={component()} description={catalog.find(item=>item.name===component())?.description??""}/>
    <Panel><Text class="text-xs font-medium text-muted-foreground">LIVE PREVIEW</Text>
      <View class="min-h-[150px] justify-center gap-4 rounded-md bg-background p-5">
        <If when={component()==="Button"}><Action label="Continue" variant={variant()} size={size()} disabled={disabled()} onPress={()=>pressed.update(n=>n+1)}/><Text class="text-sm text-muted-foreground">Pressed {pressed()} times</Text></If>
        <If when={component()==="Input"}><Field value={input()} onChange={v=>input.set(v)} placeholder="Type something"/><Text class="text-sm text-muted-foreground">{input()}</Text></If>
        <If when={component()==="Textarea"}><Field multiline value={input()} onChange={v=>input.set(v)} placeholder="Write a note"/></If>
        <If when={component()==="Checkbox"}><Check label="Enable option" checked={checked()} disabled={disabled()} onChange={v=>checked.set(v)}/></If>
        <If when={component()==="Switch"}><Toggle label="Enable option" checked={checked()} disabled={disabled()} onChange={v=>checked.set(v)}/></If>
        <If when={component()==="Slider"}><Range label="Value" value={amount()} onChange={v=>amount.set(v)}/></If>
        <If when={component()==="Select"}><Choice label="Option" items={options} value={choice()} onChange={v=>choice.set(v)}/></If>
        <If when={component()==="Tabs"}><Segments items={["Preview","Details"]} value={tab()} onChange={v=>tab.set(v)}/><Text class="text-sm text-foreground">{tab()}</Text></If>
        <If when={component()==="Progress"}><Meter label="Progress" value={amount()}/><Range label="Progress value" value={amount()} onChange={v=>amount.set(v)}/></If>
        <If when={component()==="Badge"}><Badge label="Native"/></If>
        <If when={component()==="Dialog"}><Action label="Open dialog" onPress={()=>opened.set(true)}/><Modal open={opened()} title="Preview dialog" onClose={()=>opened.set(false)}><Text class="text-sm text-foreground">A real NSH dialog with dismiss behavior.</Text></Modal></If>
        <If when={component()==="Alert"}><Action label="Show alert" variant="outline" onPress={async()=>{try{const {action}=await AlertDialog.show({title:"Continue?",description:"A native confirmation example.",actions:[{id:"cancel",label:"Cancel",role:"cancel"},{id:"ok",label:"Continue"}]});result.set("Result: "+action);}catch(e){result.set(String(e));}}}/></If>
        <If when={component()==="Panel"}><Panel><Text class="font-medium text-foreground">Panel title</Text><Text class="text-sm text-muted-foreground">Related information belongs together.</Text></Panel></If>
        <If when={component()==="Separator"}><Text class="text-sm text-foreground">Above</Text><Separator/><Text class="text-sm text-foreground">Below</Text></If>
        <If when={component()==="List"}><View class="h-[240px]"><List each={data} keyExtractor={item=>item.id} estimatedItemSize={36} class="flex-1">{item=><View class="h-9 justify-center border-b border-border px-2"><Text class="text-sm text-foreground">{item().title}</Text></View>}</List></View></If>
      </View>
    </Panel>
    <Panel><View class="flex-row items-center justify-between"><Text class="text-sm font-semibold text-foreground">Usage</Text><Action label="Copy source" size="sm" variant="outline" onPress={copy}/></View>
      <Text class="rounded-md bg-muted p-3 font-mono text-xs text-foreground select-text">{source()}</Text>
      <Text class="text-xs text-muted-foreground">Snippet uses the Studio UI layer; import from src/ui/controls.</Text>
      <If when={!!result()}><Text class="text-sm text-foreground">{result()}</Text></If>
    </Panel>
  </View>;
}
