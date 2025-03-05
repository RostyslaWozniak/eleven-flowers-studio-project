import { TRPCError } from "@trpc/server";
import { ContactInfoRepository } from "./contact-info.repository";
import type {
  ContactInfoDTO,
  CreateContactInfoSchema,
  UpdateContactInfoSchema,
} from "./contact-info.types";

export class ContactInfoService {
  public static getByEmail = async (
    email: string,
  ): Promise<ContactInfoDTO | null> => {
    return await ContactInfoRepository.findByEmail(email);
  };

  public static getById = async (
    id: string,
  ): Promise<ContactInfoDTO | null> => {
    return await ContactInfoRepository.findById(id);
  };

  public static getByIdOrThrow = async (
    id: string,
  ): Promise<ContactInfoDTO> => {
    const contactInfo = await this.getById(id);
    if (!contactInfo)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "contact_info_not_found",
      });

    return contactInfo;
  };

  public static subscribe = async (input: { email: string }) => {
    const existingContactInfo = await this.getByEmail(input.email);

    if (!existingContactInfo) {
      return await this.create({ wantsMarketingEmails: true, ...input });
    } else if (!existingContactInfo?.wantsMarketingEmails) {
      return await this.update({
        id: existingContactInfo.id,
        wantsMarketingEmails: true,
      });
    }
    if (existingContactInfo?.wantsMarketingEmails) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "already_subscribed",
      });
    }
  };

  public static unsubscribe = async (email: string) => {
    const contactInfo = await this.getByEmail(email);
    if (!contactInfo)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "contact_info_not_found",
      });

    return await this.update({
      id: contactInfo.id,
      wantsMarketingEmails: false,
    });
  };

  public static create = async (
    input: CreateContactInfoSchema,
  ): Promise<ContactInfoDTO> => {
    return await ContactInfoRepository.create(input);
  };

  public static update = async (
    input: UpdateContactInfoSchema,
  ): Promise<ContactInfoDTO> => {
    return await ContactInfoRepository.update(input);
  };

  public static getByEmailOrCreate = async (
    email: string,
    input: CreateContactInfoSchema,
  ): Promise<ContactInfoDTO> => {
    const contactInfo = await this.getByEmail(email);
    if (contactInfo) return contactInfo;

    const newContactInfo = await this.create(input);
    return newContactInfo;
  };
}
