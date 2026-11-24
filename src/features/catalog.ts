export const catalog = [
  {name:"Button",group:"Controls",description:"Variants, sizing, disabled state and press feedback."},
  {name:"Input",group:"Controls",description:"Controlled native text input."},
  {name:"Textarea",group:"Controls",description:"Multiline input and text editing."},
  {name:"Checkbox",group:"Controls",description:"Accessible binary selection."},
  {name:"Switch",group:"Controls",description:"A native toggle with animated track."},
  {name:"Slider",group:"Controls",description:"Pointer and keyboard controlled range."},
  {name:"Select",group:"Controls",description:"Select a value from a popup."},
  {name:"Tabs",group:"Navigation",description:"Selection and animated indicator."},
  {name:"Progress",group:"Feedback",description:"An accessible progress indicator."},
  {name:"Badge",group:"Feedback",description:"A reusable semantic label."},
  {name:"Dialog",group:"Feedback",description:"Native dialog presentation."},
  {name:"Alert",group:"Feedback",description:"A system confirmation alert."},
  {name:"Panel",group:"Layout",description:"A bordered surface for related content."},
  {name:"Separator",group:"Layout",description:"A subtle visual boundary."},
  {name:"List",group:"Layout",description:"A virtualized list of 10,000 rows."}
] as const;
export type DemoName=typeof catalog[number]["name"];

