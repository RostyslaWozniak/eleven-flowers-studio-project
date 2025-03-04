import { OrderRepository } from "./order.repository";
import { TRPCError } from "@trpc/server";
import {
  CART_COOKIE_NAME,
  deleteCookieValue,
  getCookieValue,
  getLocaleFromCookie,
  ORDER_COOKIE_NAME,
  setCookieValue,
} from "@/lib/utils/cookies";
import { CartItemService } from "../cart-item/cart-item.service";
import { ContactInfoService } from "../contact-info/contact-info.service";
import { AddressService } from "../address/address.service";
import { DeliveryDetailsService } from "../delivery-details/delivery-details.service";
import { z } from "zod";
import { ORDER_METHODS } from "@/lib/utils/delivery";
import type { CartItemDTO } from "../cart-item/cart-items.typs";
import { type NextRequest } from "next/server";
import type {
  CreateOrderWithDetailsSchema,
  OrderDTO,
  OrderFromDb,
} from "./order.types";

export class OrderService {
  public static createWithDetails = async (
    req: NextRequest,
    resHeaders: Headers,
    input: CreateOrderWithDetailsSchema,
  ) => {
    //1. get cart items and check if cart is empty
    const cartId = getCookieValue(req, CART_COOKIE_NAME);
    const locale = getLocaleFromCookie(req);

    if (!cartId)
      throw new TRPCError({ code: "BAD_REQUEST", message: "missing_cart_id" });

    const cartItems = await CartItemService.getAllByCartId(cartId, locale);

    if (cartItems.length === 0)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "cart_is_empty",
      });
    // 2. check if contact info exists, if not create
    const contactInfo = await ContactInfoService.getByEmailOrCreate(
      input.orderingFormData.email,
      {
        name: input.orderingFormData.name,
        email: input.orderingFormData.email,
        phone: input.orderingFormData.phone,
      },
    );
    // 3. check if address exists, if not create
    const address = await AddressService.getOrCreate({
      city: input.recipientFormData.city,
      street: input.recipientFormData.address,
      postCode: input.recipientFormData.postalCode,
    });
    // 4. calculate total price and delivery price
    const totalPrice = this.calculateTotalPrice(cartItems);

    const deliveryPriceInCents = DeliveryDetailsService.getDeliveryPriceInCents(
      totalPrice,
      address.postCode,
    );
    // 5. create delivery details variable
    const deliveryDetails = {
      name: input.recipientFormData.name,
      phone: input.recipientFormData.phone,
      deliveryDate: input.orderingFormData.date,
      deliveryTime: input.orderingFormData.time,
      description: input.orderingFormData.description,
      flowerMessage: input.recipientFormData.flowerMessage,
      method: z.enum(ORDER_METHODS).Enum.delivery,
    };

    // 6. create order
    // const locale = await getLocale().then(validateLang);
    const order = await OrderRepository.create({
      locale,
      contactInfoId: contactInfo.id,
      addressId: address.id,
      totalPrice,
      deliveryPrice: deliveryPriceInCents,
      cartItems,
      deliveryDetails,
    });

    await CartItemService.removeAllByCartId(cartId);

    //7. set order id to cookie
    setCookieValue(resHeaders, ORDER_COOKIE_NAME, order.id);
    return { orderId: order.id, message: "order_created" };
  };

  public static getById = async (orderId: string) => {
    return await OrderRepository.getById(orderId);
  };

  public static getOrThrow = async (req: NextRequest) => {
    const orderId = getCookieValue(req, ORDER_COOKIE_NAME);
    if (!orderId)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "order_id_is_missing",
      });

    const order = await this.getById(orderId);
    if (!order)
      throw new TRPCError({ code: "NOT_FOUND", message: "order_not_found" });

    return this.mapToDTO(order);
  };

  public static async remove(req: NextRequest, resHeaders: Headers) {
    const orderId = getCookieValue(req, ORDER_COOKIE_NAME);

    if (!orderId) return null;

    deleteCookieValue(resHeaders, ORDER_COOKIE_NAME);

    return await OrderRepository.remove(orderId);
  }

  private static async mapToDTO(order: OrderFromDb): Promise<OrderDTO> {
    return {
      id: order.id,
      contactInfoId: order.contactInfoId,
      paymentStatus: order.paymentStatus,
      totalPrice: order.totalPrice,
      deliveryPrice: order.deliveryPrice,
      orderItems: order.orderItems.map((item) => ({
        id: item.id,
        productName: item.productName,
        slug: item.slug,
        price: item.price,
        imageUrl: item.imageUrl,
        size: item.size,
        quantity: item.quantity,
      })),
    };
  }

  private static calculateTotalPrice = (cartItems: CartItemDTO[]) => {
    return cartItems.reduce((total, item) => {
      if (item.price == null || item.price <= 0) {
        throw new Error(`Invalid price for item: ${item.productName}`);
      }
      return total + item.price * item.quantity;
    }, 0);
  };
}
