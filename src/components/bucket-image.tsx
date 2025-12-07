import { orpc } from '@/orpc/client';
import { useQuery } from '@tanstack/react-query';
import { LucideLoader2 } from 'lucide-react';

export default function BucketImage({
  bucket,
  fileKey,
}: {
  bucket: string;
  fileKey: string;
}) {
  const { data, isLoading } = useQuery(
    orpc.amazon.getBucketImage.queryOptions({
      input: { bucket, fileKey },
      staleTime: 1000 * 60 * 1,
    })
  );

  return (
    <div className=" h-32 w-32  justify-center align-middle">
      {isLoading ? (
        <div className="h-full w-full bg-black/50 text-white font-semibold flex items-center justify-center">
          <LucideLoader2 className="animate-spin" size={96} />
        </div>
      ) : (
        <img
          src={data?.url}
          className=" aspect-square h-full w-full object-cover"
          alt="Bucket Image"
        />
      )}
    </div>
  );
}
