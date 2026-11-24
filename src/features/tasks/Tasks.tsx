import { List, signal, Text, View } from "nsh";
import { AlertDialog } from "nsh/base";
import { Action, Check, Choice, Field, Heading, Meter, Panel, Segments } from "../../ui/controls";
import { addTask, editTask, loaded, removeTask, storageError, tasks, toggleTask, type Priority } from "./store";
const priorities=["Low","Normal","High"].map(value=>({value,title:value}));
export function Tasks(){
  const draft=signal(""),priority=signal<Priority>("Normal"),filter=signal("All"),editing=signal<string|null>(null),query=signal("");
  const filtered=()=>tasks().filter(t=>(filter()==="All"||(filter()==="Open"?!t.done:t.done))&&t.title.toLowerCase().includes(query().toLowerCase()));
  const submit=()=>{if(!draft().trim()||!loaded())return;const id=editing();if(id)editTask(id,draft(),priority());else addTask(draft(),priority());draft.set("");editing.set(null);};
  const completed=()=>tasks().filter(t=>t.done).length;
  return <View class="gap-4"><Heading eyebrow="Examples / Tasks" title="Task manager" description="A working local-first example of NSH controls, state, lists and persistence."/>
    <Panel><Meter label={completed()+" of "+tasks().length+" completed"} value={tasks().length?Math.round(100*completed()/tasks().length):0}/>
      <Field value={draft()} onChange={v=>draft.set(v)} onSubmit={submit} placeholder="New task"/>
      <View class="flex-row flex-wrap items-center gap-2"><Choice label="Priority" items={priorities} value={priority()} onChange={v=>priority.set(v as Priority)}/><Action label={editing()?"Save edit":"Add task"} disabled={!loaded()||!draft().trim()} onPress={submit}/><If when={editing()!==null}><Action label="Cancel edit" variant="ghost" onPress={()=>{editing.set(null);draft.set("");}}/></If></View>
    </Panel>
    <Segments items={["All","Open","Done"]} value={filter()} onChange={v=>filter.set(v)}/><Field value={query()} onChange={v=>query.set(v)} placeholder="Search tasks"/>
    <If when={!loaded()}><Text class="text-sm text-muted-foreground">Loading local tasks…</Text></If>
    <If when={!!storageError()}><Text class="text-sm text-destructive">Storage: {storageError()}</Text></If>
    <If when={loaded()&&filtered().length===0}><Panel><Text class="text-sm text-muted-foreground">No matching tasks.</Text></Panel></If>
    <View class="h-[300px] rounded-lg border border-border bg-card"><List each={filtered()} keyExtractor={t=>t.id} estimatedItemSize={60} class="flex-1">
      {task=><View class="flex-row items-center gap-2 border-b border-border px-3 py-2"><View class="flex-1 gap-1"><Check label={task().title} checked={task().done} disabled={!loaded()} onChange={v=>toggleTask(task().id,v)}/><Text class="text-xs text-muted-foreground">{task().priority}</Text></View>
        <Action label="Edit" variant="ghost" size="sm" onPress={()=>{const t=task();editing.set(t.id);draft.set(t.title);priority.set(t.priority);}}/>
        <Action label="Delete" variant="outline" size="sm" onPress={async()=>{const id=task().id;const {action}=await AlertDialog.show({title:"Delete task?",actions:[{id:"cancel",label:"Cancel",role:"cancel"},{id:"delete",label:"Delete",role:"destructive"}]});if(action==="delete")removeTask(id);}}/>
      </View>}
    </List></View>
  </View>;
}
