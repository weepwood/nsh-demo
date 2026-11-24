import { Text, View } from "nsh";
import { Heading, Panel, Toggle } from "../ui/controls";
import { inspector, sidebar } from "../stores/navigation";
export function Settings(){return <View class="gap-4"><Heading eyebrow="Workspace / Settings" title="Workspace settings" description="Adjust the layout of the Studio."/><Panel><Toggle label="Show sidebar" checked={sidebar()} onChange={v=>sidebar.set(v)}/><Toggle label="Show inspector" checked={inspector()} onChange={v=>inspector.set(v)}/><Text class="text-sm text-muted-foreground">Appearance and theme are saved automatically. Layout preferences last for this session.</Text></Panel></View>;}
