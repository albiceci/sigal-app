import life from "../../../assets/sigal/product/life.svg";
import retirement from "../../../assets/sigal/product/retirement.svg";
import ProductTypesSection from "../../common/productTypes/productTypesSection";

function ProductListSection() {
  return (
    <>
      <ProductTypesSection
        title="Sigurimet e Jetes"
        productTypes={[
          {
            title: "Sigurimi Jetës",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin në Shqipërisë",
            link: "https://sigallife.al/sigurimi-i-jetes/",
            image: <img className="h-full w-auto" src={life} alt="" />,
            redirect: true,
          },
          {
            title: "Sigurimi i jetës me kursim",
            subTitle: "Sigurimi për automjetet me targa të huaja që lëvizin brenda Shqipërisë",
            link: "https://sigallife.al/sigurimi-i-jetes-me-kursim-2/",
            image: <img className="h-full w-auto" src={life} alt="" />,
            redirect: true,
          },
          {
            title: "Pension Privat",
            subTitle: "Sigurimi për automjetet me targa shqiptare që lëvizin jashtë Shqipërisë",
            link: "https://fondisigal.com.al/",
            image: <img className="h-full w-auto" src={retirement} alt="" />,
            redirect: true,
          },
        ]}
      />
    </>
  );
}

export default ProductListSection;
