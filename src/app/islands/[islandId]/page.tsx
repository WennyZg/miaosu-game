import { notFound } from "next/navigation";
import { islands } from "@/data/islands";
import IslandCardClient from "./IslandCardClient";

export function generateStaticParams() {
  return islands.map((island) => ({
    islandId: island.id,
  }));
}

export default function IslandCardPage({
  params,
}: {
  params: { islandId: string };
}) {
  const island = islands.find((item) => item.id === params.islandId);

  if (!island) {
    notFound();
  }

  return <IslandCardClient island={island} />;
}
