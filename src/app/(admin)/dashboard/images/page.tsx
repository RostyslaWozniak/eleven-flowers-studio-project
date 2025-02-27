import { H1 } from "@/components/ui/typography";
import { UploadImages } from "./_components/upload-images";
import { ImageGallery } from "./_components/image-gallery";

export default async function Images() {
  return (
    <div className="w-full">
      <H1>Images</H1>
      <UploadImages />
      <ImageGallery />
    </div>
  );
}
