import { colorScheme, platform, Scroll, Text, View, windowSize } from "nsh";
import { Action, Field, NavItem } from "../ui/controls";
import { catalog } from "../features/catalog";
import { component, inspector, navigate, page, pages, search, sidebar } from "../stores/navigation";
import { Overview } from "../features/Overview";
import { Components, ComponentInspector } from "../features/Components";
import { Themes } from "../features/Themes";
import { Motion } from "../features/Motion";
import { Native } from "../features/Native";
import { Tasks } from "../features/tasks/Tasks";
import { Settings } from "../features/Settings";

function Sidebar(){
  const results=()=>catalog.filter(c=>(c.name+" "+c.group+" "+c.description).toLowerCase().includes(search().trim().toLowerCase()));
  return <View class="w-[220px] shrink-0 gap-2 border-r border-sidebar-border bg-sidebar p-3">
    <Text class="px-3 py-2 text-xs font-semibold text-muted-foreground">WORKSPACE</Text>
    <Each of={[...pages]}>{item=><NavItem label={item()} selected={page()===item()} onPress={()=>navigate(item())}/>}</Each>
    <If when={page()==="Components"}>
      <View class="h-px bg-border"/><Field value={search()} onChange={v=>search.set(v)} placeholder="Find component"/>
      <Scroll class="flex-1"><View class="gap-1">
        <Each of={results()}>{entry=><NavItem label={entry().name} selected={component()===entry().name} onPress={()=>component.set(entry().name)}/>}</Each>
        <If when={results().length===0}><Text class="p-2 text-xs text-muted-foreground">No matching components.</Text></If>
      </View></Scroll>
    </If>
  </View>;
}
function CompactNav(){
  return <View class="gap-2 border-b border-border bg-sidebar p-2"><View class="flex-row flex-wrap gap-1"><Each of={[...pages]}>{item=><Action label={item()} size="sm" variant="ghost" selected={page()===item()} onPress={()=>navigate(item())}/>}</Each></View>
    <If when={page()==="Components"}><Field value={search()} onChange={v=>search.set(v)} placeholder="Find component"/><View class="flex-row flex-wrap gap-1"><Each of={catalog.filter(c=>c.name.toLowerCase().includes(search().toLowerCase()))}>{item=><Action label={item().name} size="sm" variant="outline" selected={component()===item().name} onPress={()=>component.set(item().name)}/>}</Each></View></If>
  </View>;
}
export function Shell(){
  const wide=()=>windowSize().width>=960;
  const showInspector=()=>page()==="Components"&&inspector()&&windowSize().width>=1120;
  return <View class="flex-1 bg-background">
    <View class="h-11 flex-row items-center justify-between gap-2 border-b border-border bg-card px-3">
      <View class="flex-row items-center gap-2"><Action label={sidebar()?"Hide navigation":"Show navigation"} variant="ghost" size="sm" onPress={()=>sidebar.update(v=>!v)}/><Text class="text-sm font-semibold text-foreground">NSH Studio</Text></View>
      <If when={page()==="Components"}><Action label={inspector()?"Hide inspector":"Show inspector"} variant="ghost" size="sm" onPress={()=>inspector.update(v=>!v)}/></If>
    </View>
    <If when={!wide()&&sidebar()}><CompactNav/></If>
    <View class="flex-1 flex-row">
      <If when={wide()&&sidebar()}><Sidebar/></If>
      <Scroll class="flex-1"><View class="gap-4 p-5">
        <If when={page()==="Overview"}><Overview/></If>
        <If when={page()==="Components"}><Components/><If when={inspector()&&!showInspector()}><ComponentInspector/></If></If>
        <If when={page()==="Themes"}><Themes/></If>
        <If when={page()==="Motion"}><Motion/></If>
        <If when={page()==="Native APIs"}><Native/></If>
        <If when={page()==="Tasks"}><Tasks/></If>
        <If when={page()==="Settings"}><Settings/></If>
      </View></Scroll>
      <If when={showInspector()}><Scroll class="w-[264px] shrink-0 border-l border-border bg-sidebar"><ComponentInspector/></Scroll></If>
    </View>
    <View class="h-7 flex-row items-center justify-between border-t border-border bg-sidebar px-3"><Text class="text-xs text-muted-foreground">Ready · {page()}</Text><Text class="text-xs text-muted-foreground">{platform.os} · {colorScheme()} · Studio 0.1.0</Text></View>
  </View>;
}
