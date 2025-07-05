"use client"
import { useEffect, useRef, useState } from "react";
import { CustomCategory } from "../types";
import { CategoryDropDown } from "./category-dropdown";

interface Props {
  data: CustomCategory[];
};

export const Categories = ({
  data,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const activeCategory = "all";
  const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1; 

  useEffect(() => {
    const calculateVisible = () => {
      if(!containerRef.current || !measureRef.current || !viewAllRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const avaliableWidth = containerWidth - viewAllWidth;
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropDown 
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
        </div>
      ))}
      </div>
    </div>
  )
};