import Cabin from "@/app/_components/Cabin";
import { getCabin, getCabins } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="pt-28 pb-section-padding px-gutter max-w-container-max mx-auto">
      <Cabin cabin={cabin} />
    </div>
  );
}
