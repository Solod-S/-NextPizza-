"use client";

import React, { useEffect, useState } from "react";
import { useSet } from "react-use";

import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  className?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  onClickCheckbox?: (id: string) => void;
  selectedIds?: Set<string>;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items = [],
  defaultItems = [],
  limit = 5,
  loading,
  searchInputPlaceholder = "Search...",
  className,
  onChange,
  selectedIds,
  onClickCheckbox,
  defaultValue,
}) => {
  const [list, setList] = useState<FilterCheckboxProps[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selected, { add, toggle }] = useSet<string>(new Set([]));
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (showAll) {
      const filteredItems = items.filter(item =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      );
      setList(filteredItems);
    } else {
      const limitedItems = (defaultItems || items).slice(0, limit);
      console.log(`list`, limitedItems);
      setList(limitedItems);
    }
  }, [showAll, items, searchValue, defaultItems, limit]);

  const onCheckedChange = (value: string) => {
    toggle(value);
  };

  const onSearchInput = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (defaultValue) {
      defaultValue.forEach(add);
    }
  }, [defaultValue?.length]);

  useEffect(() => {
    onChange?.(Array.from(selected));
  }, [selected]);

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-6 mb-4 rounded-[8px]" />
          ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={e => onSearchInput(e.target.value)}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map(item => (
          <FilterCheckbox
            onCheckedChange={() => onCheckedChange(item.value)}
            checked={selected.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => {
              setShowAll(!showAll);
              setSearchValue("");
            }}
            className="text-primary mt-3"
          >
            {showAll ? "Hide" : "+ Show all"}
          </button>
        </div>
      )}
    </div>
  );
};
