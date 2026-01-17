import ProductTypes from "../../../common/productTypes/productTypes";
import { ContentContainer } from "../../../containers/contentContainer";

import fire from "../../../../assets/sigal/product/fire.svg";

function ProductListSection() {
  return (
    <article className="w-[100vw] flex relative overflow-hidden m-0 bg-[#e6ecf7]">
      <div className="w-full flex justify-center">
        <ContentContainer>
          <div className="flex flex-col py-[150px] gap-10">
            <div className="w-full flex flex-col gap-3 items-center justify-center z-[5]">
              <h1 className="max-w-[80%] h2 mb-0 text-presetblack text-center sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] drop-shadow-lg">
                Sigurimet e Pergjegjesise
              </h1>
            </div>
            <div className="">
              <ProductTypes
                productTypes={[
                  {
                    title: "Pergjegjesi Ndertuesi",
                    subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
                    link: "/wealth/liability",
                    image: <img className="h-full w-auto" src={fire} alt="" />,
                  },
                  {
                    title: "Pergjegjesi Profesionale",
                    subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
                    link: "/wealth/liability",
                    image: <img className="h-full w-auto" src={fire} alt="" />,
                  },
                  {
                    title: "Pergjegjesi Publike",
                    subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
                    link: "/wealth/liability",
                    image: <img className="h-full w-auto" src={fire} alt="" />,
                  },
                ]}
              />
            </div>
          </div>
        </ContentContainer>
      </div>
    </article>
  );
}

export default ProductListSection;
