import {signal} from "nsh";
import type {DemoName} from "../features/catalog";
export const pages=["Overview","Components","Themes","Motion","Native APIs","Tasks","Settings"] as const;
export type Page=typeof pages[number];
export const page=signal<Page>("Overview");
export const component=signal<DemoName>("Button");
export const search=signal("");
export const sidebar=signal(true);
export const inspector=signal(true);
export function navigate(next:Page){page.set(next);}
