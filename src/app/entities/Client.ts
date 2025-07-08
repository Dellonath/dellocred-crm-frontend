type ChannelType = "online" | "offline";

type Gender = "m" | "f";

type MaritialStatus = "single" | "married" | "divorced" | "windowed";

type EducationLevel =
  | "primary"
  | "secondary"
  | "high_school"
  | "bachelor"
  | "master"
  | "doctorate";

type ClientSector = "private" | "public";

type UtmSource = "google" | "facebook" | "instagram" | "email" | "direct";

type UtmMedium = "cpc" | "organic" | "social" | "email" | "referral";

type State =
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
