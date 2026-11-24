import { signal, Storage } from "nsh";
export type Priority="Low"|"Normal"|"High";
export interface Task {id:string;title:string;done:boolean;priority:Priority}
const initial:Task[]=[{id:"sample-1",title:"Explore native components",done:false,priority:"Normal"},{id:"sample-2",title:"Review the design system",done:true,priority:"Low"}];
export const tasks=signal<Task[]>(initial);
export const loaded=signal(false);
export const storageError=signal("");
let sequence=0;let pending=Promise.resolve();
const key="studio.tasks.v1";
function valid(x:unknown):x is Task {if(!x||typeof x!=="object")return false;const t=x as Task;return typeof t.id==="string"&&typeof t.title==="string"&&typeof t.done==="boolean"&&["Low","Normal","High"].includes(t.priority);}
export async function restoreTasks(){try{const raw=await Storage.getItem(key);if(raw!==null){const data:unknown=JSON.parse(raw);if(!Array.isArray(data)||!data.every(valid)||new Set(data.map(t=>t.id)).size!==data.length)throw Error("Invalid saved tasks");tasks.set(data);}}catch(e){storageError.set(String(e));}finally{loaded.set(true);}}
function save(){const snapshot=JSON.stringify(tasks());pending=pending.catch(()=>{}).then(()=>Storage.setItem(key,snapshot)).then(()=>storageError.set("")).catch(e=>{storageError.set(String(e));});}
export function addTask(title:string,priority:Priority){if(!loaded()||!title.trim())return;tasks.update(list=>[...list,{id:Date.now()+"-"+(++sequence),title:title.trim(),done:false,priority}]);save();}
export function toggleTask(id:string,done:boolean){if(!loaded())return;tasks.update(list=>list.map(t=>t.id===id?{...t,done}:t));save();}
export function editTask(id:string,title:string,priority:Priority){if(!loaded()||!title.trim())return;tasks.update(list=>list.map(t=>t.id===id?{...t,title:title.trim(),priority}:t));save();}
export function removeTask(id:string){if(!loaded())return;tasks.update(list=>list.filter(t=>t.id!==id));save();}

