import React from "react";
import { cn } from "@/lib/utils";

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    label: string;
    value: number;
    percentage: number;
  }[];
  className?: string;
}

export function Chart({ data, className, ...props }: ChartProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {data.map((item, index) => (
        <div key={index} className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-gray-700">
                {item.label} ({item.percentage}%)
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${item.percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
