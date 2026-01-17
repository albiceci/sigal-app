import { SelectType } from "../selectType/selectType";
import { NavBarBuy } from "../navBarBuy/navBarBuy";
import { CATEGORY_INFO } from "../categoryConstants";

export function PrimaryPage() {
  function transformCategoryInfo(categoryInfo: typeof CATEGORY_INFO) {
    return Object.values(categoryInfo);
  }

  return (
    <div className="w-full flex flex-col">
      <div>
        <NavBarBuy />
      </div>
      <SelectType products={transformCategoryInfo(CATEGORY_INFO)} message="buy.category.title" showMessage={true} />
    </div>
  );
}
