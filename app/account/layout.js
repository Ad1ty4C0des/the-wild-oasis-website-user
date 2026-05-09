import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="pt-28 pb-section-padding px-gutter max-w-container-max mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-element-gap">
        <SideNavigation />
        <div className="py-1">{children}</div>
      </div>
    </div>
  );
}
