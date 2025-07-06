// Define the enums based on your CreateClientDto structure
export enum ChannelType {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export enum Gender {
  MALE = 'm',
  FEMALE = 'f'
}

export enum MaritialStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'windowed'
}

export enum EducationLevel {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  HIGH_SCHOOL = 'high_school',
  BACHELOR = 'bachelor',
  MASTER = 'master',
  DOCTORATE = 'doctorate'
}

export enum ClientSector {
  PRIVATE = 'private',
  PUBLIC = 'public'
}

export enum State {
  // List of Brazilian states
  // North
  AC = 'ac', AP = 'ap', AM = 'am', PA = 'pa', RO = 'ro', RR = 'rr', TO = 'to',
  // Northeast
  AL = 'al', BA = 'ba', CE = 'ce', MA = 'ma', PB = 'pb', PE = 'pe', PI = 'pi', RN = 'rn', SE = 'se',
  // Central-West
  DF = 'df', GO = 'go', MT = 'mt', MS = 'ms',
  // Southeast
  ES = 'es', MG = 'mg', RJ = 'rj', SP = 'sp',
  // South
  PR = 'pr', RS = 'rs', SC = 'sc'
}


export enum UtmSource {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  EMAIL = 'email',
  DIRECT = 'direct',
  // Add other UTM sources
}

export enum UtmMedium {
  CPC = 'cpc',
  ORGANIC = 'organic',
  SOCIAL = 'social',
  EMAIL = 'email',
  REFERRAL = 'referral',
  // Add other UTM mediums
}

// ClientNote interface as a separate entity
export interface ClientNote {
  uuid: string;
  note: string;
  createdAt: string; // ISO date string
  userUuid: string; // Or a more detailed User interface if needed
}

// Interface for creating a new note
export interface CreateClientNoteDto {
    note: string;
    clientUuid: string;
    userUuid: string; // This would typically come from authenticated user context
}

// Client interface without notes array
export interface Client {
  uuid?: string;
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

export type NewClient = Omit<Client, 'uuid'>;