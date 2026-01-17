import { SelectType } from "../selectType/selectType";
import { NavBarBuy } from "../navBarBuy/navBarBuy";
import { PRODUCT_INFO, PRODUCT_SITE_ID } from "../productConstants";

export function WealthType() {
  function getProductInfo() {
    return (Object.keys(PRODUCT_INFO) as PRODUCT_SITE_ID[])
      .map((productId) => PRODUCT_INFO[productId])
      .filter((product) => product.categoryId === "wealth");
  }
  return (
    <div className="w-full">
      <div className="h-full flex flex-col">
        <NavBarBuy activeKey={"wealth"} />
        <SelectType products={getProductInfo()} message="buy.product.title" showMessage={true} type="product" />
      </div>
    </div>
  );
}
