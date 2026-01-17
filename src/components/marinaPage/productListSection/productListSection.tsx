import mvl from "../../../assets/sigal/product/mvl.svg";
import ProductTypesSection from "../../common/productTypes/productTypesSection";

function ProductListSection() {
  return (
    <>
      <ProductTypesSection
        title="Sigurimet e Marines"
        productTypes={[
          {
            title: "Mjetet e vogla lundruese",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={mvl} alt="" />,
          },
          {
            title: "Sigurimi Kasko / HULL",
            subTitle: "Sigurimi për automjetet me targa të huaja që lëvizin brenda Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={mvl} alt="" />,
          },
          {
            title: "Sigurimi i mallit në transport",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin jashtë Shqipërisë",
            link: "/",
            image: <img className="h-full w-auto" src={mvl} alt="" />,
          },
          {
            title: "Sigurimi i pergjegjesise transportuesit (CMR)",
            subTitle:
              "Mbron makinën tuaj nga dëmet e pjesshme ose të plota që mund t'i ndodhin për shkaqe të ndryshme.",
            link: "/",
            image: <img className="h-full w-auto" src={mvl} alt="" />,
          },
          {
            title: "Sigurimi P&I",
            subTitle:
              "Mbulon demet aksidentale të përplasjes mjet me mjet në rrugë, me vlerë dëmshperblimi deri në 1,000,000 lekë.",
            link: "/",
            image: <img className="h-full w-auto" src={mvl} alt="" />,
          },
        ]}
      />
    </>
  );
}

export default ProductListSection;
