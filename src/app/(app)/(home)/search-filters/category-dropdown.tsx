import { Category } from "@/payload-types"
import { Button } from "@/components/ui/button";

interface Props {
  category: Category;
  isActive: boolean;
  isNavigationHovered: boolean;
}

export const CategoryDropDown = ({
  category,
  isActive,
  isNavigationHovered
}: Props) => {
  return(
    <Button  variant="elevated">
      {category.name}
    </Button>
  );
}