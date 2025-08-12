import { SelectType } from "../selectType/selectType";
import { NavBarBuy } from "../navBarBuy/navBarBuy";
import { PRODUCT_INFO, PRODUCT_SITE_ID } from "../productConstants";

export function HealthType() {
  function getProductInfo() {
    return (Object.keys(PRODUCT_INFO) as PRODUCT_SITE_ID[])
      .map((productId) => PRODUCT_INFO[productId])
      .filter((product) => product.categoryId === "health");
  }
  return (
    <div className="w-full">
      <div className="h-full flex flex-col">
        <NavBarBuy activeKey={"health"} />
        <SelectType
          products={getProductInfo()}
          message="Cfare lloje sigurimi po kerkoni?"
          showMessage={false}
          type="product"
        />
      </div>
    </div>
  );
}
