// packages/webapp/src/utils/displayFormatters.ts
import React from "react";

export const displayValue = (
  value: string | number | boolean | Date | null | undefined,
  suffix = "",
  trueVal = "Yes",
  falseVal = "No"
): string | React.ReactNode => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  )
    return "-";
  if (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Date).toLocaleDateString === "function"
  ) {
    return (value as Date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  if (typeof value === "boolean") return value ? trueVal : falseVal;
  if (typeof value === "number") return `${value.toLocaleString()}${suffix}`;
  return `${value}${suffix}`;
};
