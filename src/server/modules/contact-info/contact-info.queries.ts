import { Prisma } from "@prisma/client";

export class ContactInfoQueries {
  public static selectFields = () =>
    Prisma.validator<Prisma.ContactInfoSelect>()({
      id: true,
      email: true,
      name: true,
      phone: true,
      wantsMarketingEmails: true,
    });
}
