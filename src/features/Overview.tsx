import { colorScheme, platform, pixelRatio, Text, View, windowSize } from "nsh";
import { Action, Badge, Heading, Panel, Section } from "../ui/controls";
import { navigate } from "../stores/navigation";
export function Overview(){
  return <View class="gap-5"><Heading eyebrow="Workspace / Overview" title="Native Shell Studio" description="A native component workshop, design system and platform playground."/>
    <Panel><Badge label="NSH 0.6.1 · target version"/><Text class="text-lg font-semibold text-foreground">Explore native UI.</Text><Text class="text-sm text-muted-foreground">One TSX source, native platform backends and a browser target. No React, Vue or desktop WebView shell.</Text>
      <View class="flex-row flex-wrap gap-2"><Action label="Browse components" onPress={()=>navigate("Components")}/><Action label="Open task example" variant="outline" onPress={()=>navigate("Tasks")}/></View>
    </Panel>
    <Section title="Runtime environment"><Panel>
      <Each of={[{label:"Platform",value:()=>platform.os},{label:"OS version",value:()=>platform.version},{label:"Device idiom",value:()=>platform.idiom},{label:"Surface",value:()=>Math.round(windowSize().width)+" × "+Math.round(windowSize().height)+" pt"},{label:"Pixel ratio",value:()=>String(pixelRatio())},{label:"Appearance",value:()=>colorScheme()}]}>
        {item=><View class="flex-row items-center justify-between border-b border-border py-2"><Text class="text-sm text-muted-foreground">{item().label}</Text><Text class="text-sm font-medium text-foreground">{item().value()}</Text></View>}
      </Each>
    </Panel></Section>
    <Section title="Explore"><Panel><Action label="Explore themes" variant="ghost" onPress={()=>navigate("Themes")}/><Action label="Explore motion" variant="ghost" onPress={()=>navigate("Motion")}/><Action label="Explore native APIs" variant="ghost" onPress={()=>navigate("Native APIs")}/></Panel></Section>
  </View>;
}
