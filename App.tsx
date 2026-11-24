import { mount } from "nsh";
import { Shell } from "./src/app/Shell";
import { restoreTheme } from "./src/theme/presets";
import { restoreTasks } from "./src/features/tasks/store";

void restoreTheme();
void restoreTasks();

// NSH creates the main window before the entry runs.
// Mount into its existing surface; Window.open is for additional windows only.
mount(Shell);
