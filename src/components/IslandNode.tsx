import Link from "next/link";
import Image from "next/image";
import { publicPath } from "@/lib/public-path";
import { Island } from "@/types";

export default function IslandNode({
  island,
  delay = 0,
}: {
  island: Island;
  delay?: number;
}) {
  return (
    <Link href={`/islands/${island.id}`} className="block group">
      <div className="relative flex flex-col items-center">
        {/* Island image */}
        <div
          className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 island-glow animate-float cursor-pointer"
          style={{
            animationDelay: `${delay}s`,
            filter: `drop-shadow(0 0 15px ${island.color.glow})`,
          }}
        >
          <Image
            src={publicPath(`/islands/${island.id}.png`)}
            alt={`${island.name}岛`}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 192px"
          />
        </div>
      </div>
    </Link>
  );
}
