export type CreateContactInfoSchema = {
  email: string;
  name?: string;
  phone?: string;
  wantsMarketingEmails?: boolean;
};

export type ContactInfoDTO = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  wantsMarketingEmails: boolean;
};
