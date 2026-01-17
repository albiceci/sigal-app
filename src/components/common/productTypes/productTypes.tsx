import { ReactNode, Suspense } from "react";
import { ContentContainer } from "../../containers/contentContainer";
import { Reveal } from "../../../util/reveal";
import { WindowDimensions } from "../../../util/windowDimensions";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/button";

const FaLink = React.lazy(() =>
  import("react-icons/fa6").then((module) => ({
    default: module.FaLink,
  }))
);

export type productTypesType = {
  title: string;
  subTitle: string;
  image?: ReactNode;
  link: string;
  redirect?: boolean;
};

const ProductTypesItem = ({ productType }: { productType: productTypesType }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[95%] lg:w-[45%] h-44 sm:h-40 border rounded-md shadow-lg p-4 bg-white flex flex-col hover:scale-105">
      <div className="flex h-full gap-4 flex-grow">
        <div className="h-full w-fit min-w-fit flex items-center justify-center">
          <div className="h-[60%] sm:h-full w-fit min-w-fit">{productType.image}</div>
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <div className="flex flex-col justify-center">
            <div>
              <div
                className="font-bold font-boldFamily text-presetblack text-lg uppercase cursor-pointer"
                onClick={() => {
                  if (productType.redirect) window.location.href = productType.link;
                  else navigate(productType.link);
                }}
              >
                {productType.title}
              </div>
            </div>
            <div>
              <div className="text-presetgray text-sm font-medium text-wrap">{productType.subTitle}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-fit">
              <Button
                buttonType="primary"
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontSize: 14,
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
                onClick={() => {
                  if (productType.redirect) window.location.href = productType.link;
                  else navigate(productType.link);
                }}
              >
                <div className="flex gap-2 justify-center items-center">
                  <Suspense fallback={<div style={{ height: "16px", width: "16px" }}></div>}>
                    <FaLink size={16} />
                  </Suspense>
                  Meso me shume
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductTypes({ productTypes }: { productTypes: productTypesType[] }) {
  return (
    <div className="w-full flex items-center justify-center">
      <ContentContainer>
        <div className="w-full relative">
          <div className="flex justify-center flex-wrap gap-6">
            {productTypes.map((type, index) => {
              return <ProductTypesItem productType={type} key={index} />;
            })}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}
