import tpl from "../../../assets/sigal/product/tpl.svg";
import greencard from "../../../assets/sigal/product/greencard.svg";
import autosos from "../../../assets/sigal/product/autosos.svg";
import border from "../../../assets/sigal/product/border.svg";
import minicasco from "../../../assets/sigal/product/minicasco.svg";
import casco from "../../../assets/sigal/product/casco.svg";
import ProductTypesSection from "../../common/productTypes/productTypesSection";

function ProductListSection() {
  return (
    <>
      <ProductTypesSection
        bgColor="#c4d9ed"
        title="Sigurimet e Automjetit"
        productTypes={[
          {
            title: "TPL",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
            link: "/car/tpl",
            image: <img className="h-full w-auto" src={tpl} alt="" />,
          },
          {
            title: "KUFITAR",
            subTitle: "Sigurimi për automjetet me targa të huaja që lëvizin brenda Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={border} alt="" />,
          },
          {
            title: "KARTON JESHIL",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin jashtë Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={greencard} alt="" />,
          },
          {
            title: "KASKO",
            subTitle:
              "Mbron makinën tuaj nga dëmet e pjesshme ose të plota që mund t'i ndodhin për shkaqe të ndryshme.",
            link: "/",
            image: <img className="h-full w-auto" src={casco} alt="" />,
          },
          {
            title: "Minikasko",
            subTitle:
              "Mbulon demet aksidentale të përplasjes mjet me mjet në rrugë, me vlerë dëmshperblimi deri në 1,000,000 lekë.",
            link: "/",
            image: <img className="h-full w-auto" src={minicasco} alt="" />,
          },
          {
            title: "AutoSOS",
            subTitle:
              "Më shërbimin e asistencës rrugore me SIGAL ju udhëtoni pa shqetësime pothuajse në të gjithë Europën.",
            link: "/car/autosos",
            image: <img className="h-full w-auto" src={autosos} alt="" />,
          },
        ]}
      />
    </>
  );
}

export default ProductListSection;
