import health from "../../../assets/sigal/product/health.svg";
import accident from "../../../assets/sigal/product/accident.svg";
import telehealth from "../../../assets/sigal/product/telehealth.svg";
import travel from "../../../assets/sigal/product/travel.svg";
import antitumor from "../../../assets/sigal/product/antitumor.svg";
import ProductTypesSection from "../../common/productTypes/productTypesSection";

function ProductListSection() {
  return (
    <>
      <ProductTypesSection
        title="Sigurimet e Shendetit"
        productTypes={[
          {
            title: "Shëndeti në udhëtim",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={travel} alt="" />,
          },
          {
            title: "Shëndeti",
            subTitle: "Sigurimi për automjetet me targa të huaja që lëvizin brenda Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={health} alt="" />,
          },
          {
            title: "Aksident",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin jashtë Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={accident} alt="" />,
          },
          {
            title: "Teleshëndeti",
            subTitle:
              "Mbron makinën tuaj nga dëmet e pjesshme ose të plota që mund t'i ndodhin për shkaqe të ndryshme.",
            link: "/",
            image: <img className="h-full w-auto" src={telehealth} alt="" />,
          },
          {
            title: "AntiTumor",
            subTitle:
              "Mbron makinën tuaj nga dëmet e pjesshme ose të plota që mund t'i ndodhin për shkaqe të ndryshme.",
            link: "/",
            image: <img className="h-full w-auto" src={antitumor} alt="" />,
          },
        ]}
      />
    </>
  );
}

export default ProductListSection;
