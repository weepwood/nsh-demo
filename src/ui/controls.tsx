import { Text, View, type JSX } from "nsh";
import { Button, Input, Checkbox, Switch, Slider, Progress, Select, Tabs, Tab, Dialog } from "nsh/base";

export type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type Size = "sm" | "md" | "lg";

export function Action(p: { label: string; onPress: () => void; variant?: Variant; size?: Size; disabled?: boolean; selected?: boolean }) {
  return <Button disabled={p.disabled} selected={p.selected} onPress={p.onPress}
    class="self-start items-center justify-center rounded-md border border-transparent transition-colors duration-150 motion-reduce:transition-none active:opacity-70 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring"
    classList={{"bg-primary":!p.variant||p.variant==="primary","bg-secondary":p.variant==="secondary","border-border":p.variant==="outline","hover:bg-accent":p.variant==="outline"||p.variant==="ghost"||p.variant==="secondary","bg-destructive":p.variant==="danger","bg-accent":!!p.selected,"h-7 px-2":p.size==="sm","h-8 px-3":!p.size||p.size==="md","h-10 px-4":p.size==="lg"}}>
    <Text class={p.variant==="danger"?"text-sm font-medium text-destructive-foreground":!p.variant||p.variant==="primary"?"text-sm font-medium text-primary-foreground":"text-sm font-medium text-foreground"}>{p.label}</Text>
  </Button>;
}
export function NavItem(p:{label:string; selected:boolean; onPress:()=>void}) {
  return <Button onPress={p.onPress} selected={p.selected} class="h-8 flex-row items-center rounded-md px-3 hover:bg-accent active:opacity-70 focus-visible:ring-2 focus-visible:ring-ring"
    classList={{"bg-accent":p.selected}}>
    <Text class={p.selected?"text-sm font-medium text-accent-foreground":"text-sm text-foreground"}>{p.label}</Text>
  </Button>;
}
export function Field(p:{value:string; onChange:(v:string)=>void; placeholder:string; onSubmit?:()=>void; multiline?:boolean}) {
  return <Input value={p.value} onChange={({value})=>p.onChange(value)} onSubmit={p.onSubmit}
    placeholder={p.placeholder} multiline={p.multiline}
    class="rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring"
    style={{minHeight:p.multiline?92:32}}/>;
}
export function Check(p:{label:string;checked:boolean;onChange:(v:boolean)=>void;disabled?:boolean}) {
  return <Checkbox checked={p.checked} disabled={p.disabled} onChange={({checked})=>p.onChange(checked)}
    class="flex-row items-center gap-2 py-1 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring"
    indicatorClass="size-5 items-center justify-center rounded-sm border border-input transition-colors checked:border-primary checked:bg-primary motion-reduce:transition-none"
    indicator={<Text class="text-primary-foreground">{p.checked?"✓":""}</Text>}>
    <Text class="text-sm text-foreground">{p.label}</Text>
  </Checkbox>;
}
export function Toggle(p:{label:string;checked:boolean;onChange:(v:boolean)=>void;disabled?:boolean}) {
  return <Switch checked={p.checked} disabled={p.disabled} onChange={({checked})=>p.onChange(checked)}
    class="flex-row items-center gap-2 py-1 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring"
    trackClass="w-11 rounded-full bg-muted p-0.5 transition-colors checked:bg-primary motion-reduce:transition-none"
    thumbClass="size-5 rounded-full border border-input bg-card transition-transform checked:translate-x-5 motion-reduce:transition-none">
    <Text class="text-sm text-foreground">{p.label}</Text>
  </Switch>;
}
export function Range(p:{label:string;value:number;onChange:(v:number)=>void;min?:number;max?:number;step?:number}) {
  return <Slider value={p.value} min={p.min??0} max={p.max??100} step={p.step??1}
    onChange={({value})=>p.onChange(value as number)} accessibilityLabel={p.label} class="flex-row items-center gap-3"
    trackClass="h-2 flex-1 rounded-full bg-muted" indicatorClass="h-full" rangeClass="rounded-full bg-primary"
    thumbClass="size-4 rounded-full border border-input bg-card focus-visible:ring-2 focus-visible:ring-ring">
    <Text class="w-12 text-right text-xs text-muted-foreground">{String(p.value)}</Text>
  </Slider>;
}
export function Meter(p:{value:number;label:string}) {
  return <Progress value={p.value} accessibilityLabel={p.label} class="gap-2" trackClass="h-2 overflow-hidden rounded-full bg-muted"
    indicatorClass="h-full rounded-full bg-primary transition-all motion-reduce:transition-none">
    <Text class="text-xs text-muted-foreground">{p.label} · {p.value}%</Text>
  </Progress>;
}
export function Choice(p:{label:string;items:{value:string;title:string}[];value:string;onChange:(v:string)=>void}) {
  return <Select items={p.items} value={p.value} onChange={({value})=>{if(value!==null)p.onChange(value);}}
    accessibilityLabel={p.label} offset={4} popupClass="rounded-md border border-border bg-popover p-1"
    backdropClass="bg-background/50" itemClass="rounded-sm px-2 py-2 text-sm focus:bg-accent"
    trigger={<View class="h-9 flex-row items-center justify-between gap-3 rounded-md border border-input bg-card px-3 hover:bg-accent">
      <Text class="text-sm text-foreground">{p.items.find(i=>i.value===p.value)?.title??p.label}</Text>
      <Text class="text-muted-foreground">⌄</Text>
    </View>}/>;
}
export function Segments(p:{items:string[];value:string;onChange:(v:string)=>void}) {
  return <Tabs class="flex-row self-start gap-1 rounded-md bg-muted p-1" indicatorClass="inset-y-1 rounded-sm bg-card">
    <Each of={p.items}>{item=><Tab selected={p.value===item()} onPress={()=>p.onChange(item())} class="group rounded-sm px-3 py-2">
      <Text class="text-sm text-muted-foreground group-selected:text-foreground">{item()}</Text>
    </Tab>}</Each>
  </Tabs>;
}
export function Panel(p:{children?:JSX.Element}) {
  return <View class="gap-4 rounded-lg border border-border bg-card p-4">{p.children}</View>;
}
export function Section(p:{title:string;description?:string;children?:JSX.Element}) {
  return <View class="gap-3"><Text class="text-base font-semibold text-foreground">{p.title}</Text>
    <If when={!!p.description}><Text class="text-sm text-muted-foreground">{p.description}</Text></If>{p.children}</View>;
}
export function Heading(p:{eyebrow:string;title:string;description:string}) {
  return <View class="gap-2 pb-2"><Text class="text-xs text-muted-foreground">{p.eyebrow}</Text>
    <Text class="text-2xl font-semibold text-foreground">{p.title}</Text><Text class="text-sm text-muted-foreground">{p.description}</Text></View>;
}
export function Badge(p:{label:string}) {return <View class="self-start rounded-sm bg-accent px-2 py-1"><Text class="text-xs text-accent-foreground">{p.label}</Text></View>;}
export function Separator(){return <View class="h-px bg-border"/>;}
export function Modal(p:{open:boolean;title:string;onClose:()=>void;children?:JSX.Element}) {
  return <Dialog open={p.open} onOpenChange={e=>{if(!e.open)p.onClose();}} animation="fade" presentation="formSheet"
    class="flex-1 items-center justify-center bg-background/70 p-6">
    <View class="w-full max-w-[420px] gap-4 rounded-lg border border-border bg-card p-5">
      <Text class="text-lg font-semibold text-foreground">{p.title}</Text>{p.children}<Action label="Close" variant="outline" onPress={p.onClose}/>
    </View>
  </Dialog>;
}

