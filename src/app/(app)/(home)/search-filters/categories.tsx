import { Category } from "@/payload-types"
import { CategoryDropDown } from "./category-dropdown";
interface Props {
  data: any;
};

export const Categories = ({
  data,
}: Props) => {
  return (
    <div>
      {data.map((category : Category) => (
        <div key={category.id}>
          <CategoryDropDown 
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
    </div>
  )
};