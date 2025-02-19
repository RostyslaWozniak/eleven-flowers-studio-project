import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { type TRPCError } from "@trpc/server";
import { UploadImages } from "./upload-images";

export default async function Dashboard() {
  const images = await api.admin.uploadFiles.getAllImages();
  return (
    <div className="w-full">
      <H1>Images</H1>
      <UploadImages />
      <div className="grid grid-cols-4 gap-4">
        {images.map(({ id, name, url }) => (
          <div key={id} className="flex flex-col items-center">
            <img src={url} alt={name} className="aspect-[4/5] object-cover" />
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
