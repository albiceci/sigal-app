import { useState } from "react";
import { SelectOption } from "./selectOption/selectOption";
import { Reveal } from "../../../util/reveal";
import { PRODUCT_INFO_TYPE } from "../productConstants";
import { CATEGORY_INFO_TYPE } from "../categoryConstants";
import { Button } from "../../ui/button/button";

type SelectTypeProps = {
  products: PRODUCT_INFO_TYPE[] | CATEGORY_INFO_TYPE[];
  message: string;
  type?: "bundle" | "product" | "category";
  bundleProduct?: string;
  showMessage?: boolean;
};

export function SelectType({ products, message, type, bundleProduct, showMessage = false }: SelectTypeProps) {
  const [isMoreInfoExpanded, setIsMoreInfoExpanded] = useState(false);
  return (
    <div
      className={`max-w-full flex flex-grow flex-col items-center justify-center ${
        type === "bundle" ? "my-[10px]" : "my-[50px]"
      }`}
    >
      {showMessage ? (
        <div
          className={`h2 max-w-[100%] text-center text-primary font-normal ${
            type === "bundle" ? "mb-[50px]" : "mb-[100px]"
          }`}
        >
          {message}
        </div>
      ) : (
        ""
      )}
      <Reveal delay={0.2} width="100%">
        <div
          className={` max-w-[100%]  flex justify-center ${
            isMoreInfoExpanded
              ? "flex-col px-[20px] sm:px-[50px] md:px-[100px] lg:px-[150px] xl:px-[200px]"
              : "flex-wrap px-[20px] sm:px-[50px]"
          }`}
        >
          {products.map((option, index) => {
            return (
              <SelectOption
                key={index}
                optionData={option}
                bundleProduct={bundleProduct}
                type={type}
                isMoreInfoExpanded={isMoreInfoExpanded}
              />
            );
          })}
        </div>
        {type === "product" ? (
          <div className="flex items-center justify-center mt-6">
            <div className="w-fit">
              {!isMoreInfoExpanded ? (
                <Button
                  buttonType="secondary"
                  style={{
                    fontSize: 14,
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                  onClick={() => {
                    setIsMoreInfoExpanded((prev) => {
                      return !prev;
                    });
                  }}
                >
                  Me shume info
                </Button>
              ) : (
                <Button
                  buttonType="secondaryAlt"
                  style={{
                    fontSize: 14,
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                  onClick={() => {
                    setIsMoreInfoExpanded((prev) => {
                      return !prev;
                    });
                  }}
                >
                  Me pak info
                </Button>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </Reveal>
    </div>
  );
}
