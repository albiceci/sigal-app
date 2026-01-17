import { useNavigate } from "react-router-dom";
import ProductTypes, { productTypesType } from "../../common/productTypes/productTypes";
import { ContentContainer } from "../../containers/contentContainer";

import life from "../../../assets/sigal/product/life.svg";
import retirement from "../../../assets/sigal/product/retirement.svg";

function ProductTypesSection({
  productTypes,
  title,
  bgColor = "#e6ecf7",
}: {
  productTypes: productTypesType[];
  title: string;
  bgColor?: string;
}) {
  return (
    <div
      id="product-list"
      className={`w-[100vw] flex relative overflow-hidden m-0`}
      style={{ backgroundColor: bgColor || undefined }}
    >
      <div className="w-full flex justify-center">
        <ContentContainer>
          <div className="flex flex-col py-[100px] gap-10">
            <div className="w-full flex flex-col gap-3 items-center justify-center z-[5]">
              <h1 className="max-w-[80%] h2 mb-0 text-presetblack text-center sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] drop-shadow-lg">
                {title}
              </h1>
            </div>
            <div className="">
              <ProductTypes productTypes={productTypes} />
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}

export default ProductTypesSection;
