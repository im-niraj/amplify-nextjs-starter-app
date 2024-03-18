import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { MultiSelectProps } from "@/types/options";

function MultiSelect({ options, selected, onChange, className, ...props }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const handleUnselect = (id: string) => {
    let x = selected.filter((el) => el.value !== id);
    if (onChange) onChange(x);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} role="combobox" aria-expanded={open} className={`w-full bg-transparent justify-between ${selected.length > 1 && "h-fit"}`} onClick={() => setOpen(!open)}>
          <div className="flex flex-wrap gap-2">
            {selected?.map((item) => (
              <Badge key={item.value} className="h-5 rounded-sm text-xs cursor-default">
                {item.label}
                <X onClick={() => handleUnselect(item.value)} className="h-5 w-5 ms-3 cursor-pointer" />
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 PopoverContent">
        <ul>
          {options?.map((option) => (
            <li
              onClick={() => {
                let findIdx = selected.findIndex((el) => el.value === option.value);
                if (onChange) onChange(findIdx === -1 ? [...selected, option] : selected.filter((item) => item.value !== option.value));
                setOpen(true);
              }}
              key={option.value}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-black/5"
            >
              <Check className={cn("mr-2 h-4 w-4", selected.findIndex((el) => el.value === option.value) !== -1 ? "opacity-100" : "opacity-0")} />
              {option.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
