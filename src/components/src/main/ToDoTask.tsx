import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "./ToDoDashboad";

export default function ToDoTask({ task }: { task: Task }) {
  return (
    <div className="flex justify-between items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:bg-accent has-[[aria-checked=true]]:text-muted-foreground dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{task.title}</p>
      </div>
      <Checkbox
        id={task.id}
        className="data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
    </div>
  );
}
