import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

type Props = {
  timeStamp: Date;
  className?: string;
};

const TimeStamp = ({ timeStamp, className }: Props) => {
  return (
    <time dateTime={timeStamp.toString()} className={cn("text-gray-700 text-sm", className)}>
      {format(timeStamp, "EE, dd MMM yyyy hh:mm aa")}
    </time>
  );
};

export default TimeStamp;
