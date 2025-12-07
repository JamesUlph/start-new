import { extractS3Info } from '@/lib/s3Utils';
import { LucidePlus } from 'lucide-react';

export default function ThumbImage({
  src,
  onClick,
}: {
  src: string;
  onClick?: () => void;
}) {
  return (
    <div className="relative">
      <div className="h-full w-full justify-center align-middle">
        <img
          key={src}
          className="aspect-square h-full w-full  object-cover"
          src={src}
        />
        <div
          className="flex transition-opacity absolute text-white font-semibold  text-lg inset-0 justify-center items-center opacity-0 bg-black/50 hover:opacity-100"
          onClick={() => {
            onClick && onClick();
          }}
        >
          <LucidePlus /> Add
        </div>
      </div>
    </div>
  );
}
