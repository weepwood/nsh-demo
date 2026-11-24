import { mount } from "nsh";
import { Window } from "nsh/desktop";
import { Shell } from "./src/app/Shell";
import { restoreTheme } from "./src/theme/presets";
import { restoreTasks } from "./src/features/tasks/store";
void restoreTheme();
void restoreTasks();
mount(()=><Window id="main">{Shell}</Window>);
