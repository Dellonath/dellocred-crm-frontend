interface GetActiveClientsParams {
  page: number;
}

export function getActiveClients({ page: _page }: GetActiveClientsParams) {
  const states = [
    "sp",
    "rj",
    "mg",
    "es",
    "rs",
    "sc",
    "pr",
    "df",
    "go",
    "mt",
    "ms",
    "ba",
    "ce",
    "am"
  ];

  // @ts-expect-error: Mock data may not match full Client type in development
  const items: Client[] = Array.from({ length: 15 }, (_, i) => ({
    id: i.toString(),
    govId: `000.000.000-0${i + 1}`.padStart(14, "0"),
    firstName: `Cliente ${i + 1}`,
    lastName: `Sobrenome ${i + 1}`,
    email: `cliente${i + 1}@exemplo.com`,
    phone: `(11) 90000-00${(i + 1).toString().padStart(2, "0")}`,
    gender: i % 2 === 0 ? "m" : "f",
    city: `Cidade ${i + 1}`,
    state: states[i % states.length],
    isActive: i % 3 === 0,
    maritalStatus: ["single", "married", "divorced", "windowed"][i % 4],
    educationLevel: [
      "primary",
      "secondary",
      "high_school",
      "bachelor",
      "master",
      "doctorate"
    ][i % 6],
    sector: i % 2 === 0 ? "private" : "public",
    utmSource: ["google", "facebook", "instagram", "email", "direct"][i % 5],
    utmMedium: ["cpc", "organic", "social", "email", "referral"][i % 5]
  }));

  return {
    clients: items
  };
}
