export type ChannelType = "online" | "offline";

export type Gender = "m" | "f";

export type MaritialStatus = "single" | "married" | "divorced" | "windowed";

export type EducationLevel =
  | "primary"
  | "secondary"
  | "high_school"
  | "bachelor"
  | "master"
  | "doctorate";

export type ClientSector = "private" | "public";

export type UtmSource =
  | "google"
  | "facebook"
  | "instagram"
  | "email"
  | "direct";

export type UtmMedium = "cpc" | "organic" | "social" | "email" | "referral";

export type State =
  | "ac"
  | "ap"
  | "am"
  | "pa"
  | "ro"
  | "rr"
  | "to"
  | "al"
  | "ba"
  | "ce"
  | "ma"
  | "pb"
  | "pe"
  | "pi"
  | "rn"
  | "se"
  | "df"
  | "go"
  | "mt"
  | "ms"
  | "es"
  | "mg"
  | "rj"
  | "sp"
  | "pr"
  | "rs"
  | "sc";

export interface Client {
  uuid: string;
  govId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  channelType?: ChannelType;
  birthDate?: string;
  gender?: Gender;
  occupation?: string;
  maritialStatus?: MaritialStatus;
  educationLevel?: EducationLevel;
  wage?: number;
  clientSector?: ClientSector;
  country?: string;
  state?: State;
  city?: string;
  addressNeighborhood?: string;
  addressStreet?: string;
  addressNumber?: number;
  addressComplement?: string;
  postalCode?: string;
  utmSource?: UtmSource;
  utmMedium?: UtmMedium;
  utmCampaign?: string;
  createdByUserUuid?: string;
  isActive?: boolean;
}
