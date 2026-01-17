import { SelectType } from "../selectType/selectType";
import { NavBarBuy } from "../navBarBuy/navBarBuy";
import { PRODUCT_INFO, PRODUCT_SITE_ID } from "../productConstants";

export function CarType() {
  function getProductInfo() {
    return (Object.keys(PRODUCT_INFO) as PRODUCT_SITE_ID[])
      .map((productId) => PRODUCT_INFO[productId])
      .filter((product) => product.categoryId === "car");
  }
  return (
    <div className="w-full">
      <div className="h-full flex flex-col">
        <NavBarBuy activeKey={"car"} />
        <SelectType products={getProductInfo()} message="buy.product.title" showMessage={true} type="product" />
      </div>
    </div>
  );
}
