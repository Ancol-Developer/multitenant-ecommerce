import { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategogriesGetManyOutput } from "@/modules/categories/type";


interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSideBar = ({
  isOpen,
  onOpenChange,
  // data
}: Props)  => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const router = useRouter();

  const [parentCategories, setParentCategories] = useState<CategogriesGetManyOutput | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<CategogriesGetManyOutput[1] | null>(null);

  // If we have parent categories, show those, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open : boolean) => {
    setSelectedCategories(null);
    setParentCategories(null);
    onOpenChange(open);
  }

  const handleCategoriesClick = (category : CategogriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0 ){
      setParentCategories(category.subcategories as CategogriesGetManyOutput);
      setSelectedCategories(category);
    } else {
      // this is a leaf category (no subcategories)
      if(parentCategories && selectedCategories){
        // This is a subcategory - navigate to /category/subcategory
        router.push(`/${selectedCategories.slug}/${category.slug}`);
      }
      else{
        // This is a main category - navigate to category
        if(category.slug === "all"){
          router.push("/");
        }
        else{
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  }

  const handleBackClick = () => {
    if(parentCategories){
      setParentCategories(null);
      setSelectedCategories(null);
    }
  }

  const backgroundColor = selectedCategories?.color || "white";

  return(
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{backgroundColor:backgroundColor}}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          { parentCategories && (
            <button 
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2"/>
              Back  
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoriesClick(category)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4 mr-2"/>
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}