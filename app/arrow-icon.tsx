type Direction = "up-right" | "right" | "left" | "down" | "up" | "chevron-down";

/** Vector paths avoid platform-dependent emoji substitution, including iOS Safari. */
export function ArrowIcon({ direction = "up-right" }: { direction?: Direction }) {
  const paths: Record<Direction, string> = {
    "up-right": "M5 19 19 5M5 5h14v14",
    right: "M4 12h16m-7-7 7 7-7 7",
    left: "M20 12H4m7-7-7 7 7 7",
    down: "M12 4v16m-7-7 7 7 7-7",
    up: "M12 20V4m-7 7 7-7 7 7",
    "chevron-down": "m7 10 5 5 5-5",
  };
  return <svg className="arrow-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[direction]} /></svg>;
}
