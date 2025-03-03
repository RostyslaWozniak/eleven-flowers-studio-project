import { db } from "@/server/db";
import { ContactInfoQueries } from "./contact-info.queries";
import type { CreateContactInfoSchema } from "./contact-info.types";

export class ContactInfoRepository {
  public static findByEmail = async (email: string) => {
    return await db.contactInfo.findUnique({
      where: {
        email,
      },
      select: ContactInfoQueries.selectFields(),
    });
  };

  public static findById = async (id: string) => {
    return await db.contactInfo.findUnique({
      where: {
        id,
      },
      select: ContactInfoQueries.selectFields(),
    });
  };
  public static create = async (input: CreateContactInfoSchema) => {
    return await db.contactInfo.create({
      data: input,
    });
  };
}
