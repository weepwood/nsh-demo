import { reduceMotion, signal, Text, View } from "nsh";
import { Action, Heading, Panel, Range, Section, Toggle } from "../ui/controls";
export function Motion(){
  const active=signal(false), amount=signal(32), enabled=signal(true);
  return <View class="gap-5"><Heading eyebrow="Workspace / Motion" title="Motion laboratory" description="Native transitions, selection and reduced-motion behavior."/>
    <Panel><Section title="Position and color"><View class="h-24 justify-center overflow-hidden rounded-md bg-muted p-3">
      <View class="size-10 rounded-md transition-all duration-200 motion-reduce:transition-none" classList={{"bg-primary":!active(),"bg-success":active()}} style={{marginLeft:active()?amount():0}}/>
      </View><Range label="Travel distance" value={amount()} min={0} max={180} onChange={v=>amount.set(v)}/><Action label="Toggle transition" onPress={()=>active.update(v=>!v)}/></Section>
    </Panel><Panel><Toggle label="Animated switch" checked={enabled()} onChange={v=>enabled.set(v)}/><Text class="text-sm text-muted-foreground">System reduced motion: {reduceMotion()?"on":"off"}</Text></Panel>
    <Text class="text-sm text-muted-foreground">Spring, gestures and shader experiments are planned for the next milestone.</Text>
  </View>;
}
