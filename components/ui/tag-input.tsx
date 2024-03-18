import React, { useRef, useState } from "react";
import { Input } from "./input";
import { Badge } from "./badge";
import { X } from "lucide-react";

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim()) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };
  const removeHandler = (index: number) => {
    setTags((old) => {
      const newTags = old.filter((_, i) => i !== index);
      return newTags;
    });
  };

  return (
    <div className="flex flex-wrap border p-1" onClick={() => inputRef.current?.focus()}>
      <div className=" h-fit flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <Badge key={index} variant={"outline"} className="rounded-none">
            {tag}
            <button className="ms-2" onClick={() => removeHandler(index)}>
              <X className="h-4 w-4" />
            </button>
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          placeholder="Enter a tag and press Enter"
          className="outline-none px-2 h-6 border shadow-none  min-w-fit w-fit focus-visible:ring-0"
        />
      </div>
    </div>
  );
};

export default TagInput;
