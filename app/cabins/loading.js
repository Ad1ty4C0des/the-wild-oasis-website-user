import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center pt-32">
      <Spinner />
      <p className="text-on-surface-variant text-body-lg">
        Loading cabin data...
      </p>
    </div>
  );
}
