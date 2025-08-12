import { SelectType } from "../selectType/selectType";
import { NavBarBuy } from "../navBarBuy/navBarBuy";
import { CATEGORY_INFO, CATEGORY_SITE_ID } from "../categoryConstants";

export function PrimaryPage() {
  function transformCategoryInfo(categoryInfo: typeof CATEGORY_INFO) {
    return (Object.keys(categoryInfo) as CATEGORY_SITE_ID[]).map(
      (categoryId) => categoryInfo[categoryId]
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div>
        <NavBarBuy />
      </div>
      <SelectType
        products={transformCategoryInfo(CATEGORY_INFO)}
        message="Cfare lloje sigurimi po kerkoni?"
        showMessage={false}
      />
    </div>
  );
}
