interface SelectOption {
  label: string;
  value: string;
}

export const STATES_OPTIONS: SelectOption[] = [
  { label: "Acre", value: "ac" },
  { label: "Amapá", value: "ap" },
  { label: "Amazonas", value: "am" },
  { label: "Pará", value: "pa" },
  { label: "Rondônia", value: "ro" },
  { label: "Roraima", value: "rr" },
  { label: "Tocantins", value: "to" },
  { label: "Alagoas", value: "al" },
  { label: "Bahia", value: "ba" },
  { label: "Ceará", value: "ce" },
  { label: "Maranhão", value: "ma" },
  { label: "Paraíba", value: "pb" },
  { label: "Pernambuco", value: "pe" },
  { label: "Piauí", value: "pi" },
  { label: "Rio Grande do Norte", value: "rn" },
  { label: "Sergipe", value: "se" },
  { label: "Distrito Federal", value: "df" },
  { label: "Goiás", value: "go" },
  { label: "Mato Grosso", value: "mt" },
  { label: "Mato Grosso do Sul", value: "ms" },
  { label: "Espírito Santo", value: "es" },
  { label: "Minas Gerais", value: "mg" },
  { label: "Rio de Janeiro", value: "rj" },
  { label: "São Paulo", value: "sp" },
  { label: "Paraná", value: "pr" },
  { label: "Rio Grande do Sul", value: "rs" },
  { label: "Santa Catarina", value: "sc" }
];

export const GENDER_OPTIONS: SelectOption[] = [
  { label: "Masculino", value: "m" },
  { label: "Feminino", value: "f" },
  { label: "Outro", value: "other" }
];

export const MARTIAL_STATUS_OPTIONS: SelectOption[] = [
  { label: "Casado", value: "married" },
  { label: "Divorciado", value: "divorced" },
  { label: "Solteiro", value: "single" },
  { label: "Viúvo", value: "widowed" }
];

export const EDUCATION_LEVEL_OPTIONS: SelectOption[] = [
  { label: "Bacharelado", value: "bachelor" },
  { label: "Doutorado", value: "doctorate" },
  { label: "Ensino Médio", value: "high_school" },
  { label: "Mestrado", value: "master" },
  { label: "Ensino Fundamental", value: "primary" },
  { label: "Ensino Secundário", value: "secondary" }
];

export const CLIENT_SECTOR_OPTIONS: SelectOption[] = [
  { label: "Público", value: "public" },
  { label: "Privado", value: "private" }
];

export const UTM_SOURCE_OPTIONS: SelectOption[] = [
  { label: "Direct", value: "direct" },
  { label: "Email", value: "email" },
  { label: "Facebook", value: "facebook" },
  { label: "Google", value: "google" },
  { label: "Importado", value: "imported" },
  { label: "Instagram", value: "instagram" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Newsletter", value: "newsletter" },
  { label: "Orgânico", value: "organic" },
  { label: "Outro", value: "other" },
  { label: "Referência", value: "referral" },
  { label: "TikTok", value: "tiktok" },
  { label: "Twitter", value: "twitter" },
  { label: "Website", value: "website" },
  { label: "WhatsApp", value: "whatsapp" }
];

export const UTM_MEDIUM_OPTIONS: SelectOption[] = [
  { label: "CPC", value: "cpc" },
  { label: "Direto", value: "direct" },
  { label: "Display", value: "display" },
  { label: "Email", value: "email" },
  { label: "Influenciador", value: "influencer" },
  { label: "Orgânico", value: "organic" },
  { label: "Outro", value: "other" },
  { label: "Social Pago", value: "paid_social" },
  { label: "Push", value: "push" },
  { label: "Referência", value: "referral" },
  { label: "Social", value: "social" }
];
