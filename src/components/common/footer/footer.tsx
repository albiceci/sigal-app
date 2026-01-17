import logo from "../../../assets/sigal/logo/logoSigalWhite.svg";
import facebook from "../../../assets/sigal/footer/facebook.svg";
import instagram from "../../../assets/sigal/footer/instagram.svg";
import x from "../../../assets/sigal/footer/x.svg";
import linkedin from "../../../assets/sigal/footer/linkedin.svg";
import tiktok from "../../../assets/sigal/footer/tiktok.svg";
import youtube from "../../../assets/sigal/footer/youtube.svg";
import { Button } from "../../ui/button/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className=" flex overflow-hidden pb-[400px] lg:pb-0 relative bg-[#ecf6ff] text-presetblack">
      <div className="flex-grow px-6 lg:px-20 py-12 flex flex-col gap-8 items-center justify-center lg:pr-[400px]">
        <div className="flex gap-14 sm:gap-20 md:gap-20 lg:gap-32 xl:gap-52 text-lg">
          <div className="flex flex-col gap-3">
            <Link to="/#insurance-types" className="font-bold">
              {t("nav.type.insurance")}
            </Link>
            <Link to="/life">{t("category.life.name")}</Link>
            <Link to="/health">{t("category.health.name")}</Link>
            <Link to="/wealth">{t("category.wealth.name")}</Link>
            <Link to="/car">{t("category.car.name")}</Link>
            <Link to="/marina">{t("category.marina.name")}</Link>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">{t("nav.type.information")}</div>
            <div>{t("nav.page.about")}</div>
            <div>{t("nav.page.responsibility")}</div>
            <div>{t("nav.page.career")}</div>
            <div>{t("nav.page.media")}</div>
            <div>{t("nav.page.Innovation")}</div>
          </div>
        </div>
        <div className="flex items-center gap-6 justify-center font-bold flex-col xl:flex-row">
          <div className="h-[40px] flex gap-2 w-fit">
            <div className="h-full">
              <img className="h-full" src={facebook} alt="" />
            </div>
            <div className="h-full">
              <img className="h-full" src={instagram} alt="" />
            </div>
            <div className="h-full">
              <img className="h-full" src={x} alt="" />
            </div>
            <div className="h-full">
              <img className="h-full" src={linkedin} alt="" />
            </div>
            <div className="h-full">
              <img className="h-full" src={tiktok} alt="" />
            </div>
            <div className="h-full">
              <img className="h-full" src={youtube} alt="" />
            </div>
          </div>
          <div className="flex flex-row gap-6 flex-wrap items-center justify-center">
            <div>{t("footer.items.privacy")}</div>
            <div>{t("footer.items.complaints")}</div>
            <div>{t("footer.items.cookies")}</div>
            <div>©SIGAL IG</div>
          </div>
        </div>
      </div>
      <div className="bg-primary pt-20 lg:pl-20 rounded-full lg:p-52 absolute w-[1200px] h-[1200px] lg:w-[800px] lg:h-[800px] bottom-0 lg:bottom-auto right-0 lg:m-0 translate-y-[800px] lg:-translate-y-[200px] translate-x-[500px] lg:translate-x-[400px] ">
        <div className="flex flex-col gap-8 absolute w-fit left-[400px] lg:left-auto lg:top-[270px] text-white">
          <img src={logo} alt="" />
          <div className="flex flex-col gap-1 text-base font-bold">
            <div>SIGAL Bussiness Center,</div>
            <div>Blv. "Zogu I", Nr.1, 1001</div>
            <div>Tirane, Shqiperi</div>
          </div>
          <div>
            <Button
              buttonType="secondary"
              padding="px-7 py-2"
              fontStyle="font-regularFamily font-black text-base tracking-wide"
              onClick={() => {}}
            >
              {t("footer.contact.button.submit")}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
