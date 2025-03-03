import { AddressRepository } from "./address.repository";
import type { AddressDTO, CreateAddressSchema } from "./address.types";

export class AddressService {
  public static getOne = async (input: CreateAddressSchema) => {
    return await AddressRepository.findOne(input);
  };

  public static create = async (
    input: CreateAddressSchema,
  ): Promise<AddressDTO> => {
    return await AddressRepository.create(input);
  };

  public static getOrCreate = async (
    input: CreateAddressSchema,
  ): Promise<AddressDTO> => {
    const address = await this.getOne(input);
    if (address) return address;

    const newAddress = await this.create(input);
    return newAddress;
  };
}
