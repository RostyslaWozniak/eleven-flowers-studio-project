-- DropForeignKey
ALTER TABLE "DeliveryDetails" DROP CONSTRAINT "DeliveryDetails_orderId_fkey";

-- AddForeignKey
ALTER TABLE "DeliveryDetails" ADD CONSTRAINT "DeliveryDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
