import fire from "../../../assets/sigal/product/fire.svg";
import ProductTypesSection from "../../common/productTypes/productTypesSection";

function ProductListSection() {
  return (
    <>
      <ProductTypesSection
        title="Sigurimet e Pasurise"
        productTypes={[
          {
            title: "Prona",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
            link: "/wealth/property",
            image: <img className="h-full w-auto" src={fire} alt="" />,
          },
          {
            title: "Pergjegjesia",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
            link: "/wealth/liability",
            image: <img className="h-full w-auto" src={fire} alt="" />,
          },
          {
            title: "Garancia",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
            link: "/wealth/guaranty",
            image: <img className="h-full w-auto" src={fire} alt="" />,
          },
        ]}
      />
    </>
  );
}

export default ProductListSection;
