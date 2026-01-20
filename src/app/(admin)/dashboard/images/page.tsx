import { H1 } from "@/components/ui/typography";
import { ImageGallery } from "./_components/image-gallery";
import { db } from "@/server/db";
import { ImageUploader } from "./_components/image-uploader";

export const dynamic = "force-dynamic";

const IMAGES_PER_PAGE = 12;

export default async function Images() {
  const imagesCount = await db.images.count();

  const pages = Math.ceil(imagesCount / IMAGES_PER_PAGE);

  return (
    <div className="w-full">
      <H1>Images ({imagesCount})</H1>
      <ImageUploader maxSizeMB={2} maxWidthOrHeight={2048} />
      <ImageGallery pages={pages} />
    </div>
  );
}
