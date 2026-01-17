import { SelectOption } from "./selectOption/selectOption";
import { Reveal } from "../../../util/reveal";
import { PRODUCT_INFO_TYPE } from "../productConstants";
import { CATEGORY_INFO_TYPE } from "../categoryConstants";
import { useTranslation } from "react-i18next";

type SelectTypeProps = {
  products: PRODUCT_INFO_TYPE[] | CATEGORY_INFO_TYPE[];
  message: string;
  type?: "bundle" | "product" | "category";
  bundleProduct?: string;
  showMessage?: boolean;
};

export function SelectType({ products, message, type, bundleProduct, showMessage = false }: SelectTypeProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`max-w-full flex flex-grow flex-col items-center justify-center ${
        type === "bundle" ? "my-[10px]" : "my-[50px]"
      }`}
    >
      {showMessage ? (
        <div
          className={`max-w-[80%] text-center text-primary font-normal ${
            type === "bundle" ? "h3 mb-[50px]" : "h2 mb-[50px]"
          }`}
        >
          {t(message)}
        </div>
      ) : (
        ""
      )}
      <Reveal delay={0.2} width="100%">
        <div className={`max-w-[100%] flex justify-center flex-wrap px-[20px] sm:px-[50px]`}>
          {products.map((option, index) => {
            return <SelectOption key={index} optionData={option} bundleProduct={bundleProduct} type={type} />;
          })}
        </div>
      </Reveal>
    </div>
  );
}
