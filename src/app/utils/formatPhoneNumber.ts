export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^\d]/g, "");
  const hasPlus = phoneNumber.trim().startsWith("+");

  if (cleaned.length < 11) {
    throw new Error("Phone number is too short.");
  }

  const number = cleaned.slice(-11);
  const countryCode = hasPlus
    ? "+" + cleaned.slice(0, cleaned.length - 11)
    : "";

  if (!/^\d{11}$/.test(number)) {
    throw new Error(
      "Phone number must contain exactly 11 digits (excluding country code)."
    );
  }

  const [a, b, c, d] = [
    number.slice(0, 2),
    number.slice(2, 3),
    number.slice(3, 7),
    number.slice(7)
  ];

  return countryCode
    ? `${countryCode} (${a}) ${b} ${c}-${d}`
    : `${a} ${b} ${c}-${d}`;
}
