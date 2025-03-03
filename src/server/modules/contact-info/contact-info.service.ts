import { TRPCError } from "@trpc/server";
import { ContactInfoRepository } from "./contact-info.repository";
import type {
  ContactInfoDTO,
  CreateContactInfoSchema,
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

  public static create = async (
    input: CreateContactInfoSchema,
  ): Promise<ContactInfoDTO> => {
    return await ContactInfoRepository.create(input);
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
