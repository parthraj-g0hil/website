export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .filter((v) => typeof v === "string")
    .join(" ");
}
