export function formatGovId(govId: string): string {
  if (!/^\d{11}$/.test(govId)) {
    throw new Error(
      "Invalid govId. It must contain exactly 11 numeric digits."
    );
  }

  return `${govId.slice(0, 3)}.${govId.slice(3, 6)}.${govId.slice(6, 9)}-${govId.slice(9)}`;
}
