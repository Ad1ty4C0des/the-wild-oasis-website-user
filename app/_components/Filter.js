"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="bg-surface-container/40 backdrop-blur-md border border-outline-variant/30 rounded-full p-1.5 flex items-center gap-1">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </FilterButton>
      <FilterButton
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </FilterButton>
      <FilterButton
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </FilterButton>
      <FilterButton
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;10 guests
      </FilterButton>
    </div>
  );
}

function FilterButton({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-4 py-2 rounded-full font-body text-label-md transition-all duration-300 ${
        filter === activeFilter
          ? "bg-surface-container-high text-on-surface border border-outline-variant"
          : "text-on-surface-variant hover:text-on-surface border border-transparent"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
