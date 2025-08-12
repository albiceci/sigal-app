import { Suspense, useState } from "react";
import { ContentContainer } from "../../containers/contentContainer";
import React from "react";
import { Reveal } from "../../../util/reveal";
import { Button } from "../../ui/button/button";

const FaLink = React.lazy(() =>
  import("react-icons/fa6").then((module) => ({
    default: module.FaLink,
  }))
);

const FaCheck = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaCheck,
  }))
);

type offerType = {
  header: string;
  subHeader1: string;
  list: string[];
  subHeader2: string;
  buttonText: string;
  buttonLink: string;
};

const offersData: offerType[] = [
  {
    header: "TPL e shoqëruar me bonus për Pension Privat",
    subHeader1: "",
    list: [
      "1,500 Lekë (nëse mjeti është autoveturë)",
      "2,500 Lekë (nëse mjeti është Furgon ose Kamionçinë)",
      "5,000 Lekë (nëse mjeti është Autobus)",
    ],
    subHeader2:
      "Kjo shumë kalon në Fondin Privat të Pensioneve SIGAL. Nese ju nuk jeni akoma anëtar i këtij Fondi, ne ju anëtarësojmë pas plotësimit të formularit përkatës.",
    buttonText: `Mëso më shumë rreth "Pension Vullnetar"`,
    buttonLink: "/",
  },
  {
    header: "TPL e shoqëruar me Shërbimin e Asistencës Rrugore, “SIGAL UNIQA AutoSOS“",
    subHeader1:
      "Bashkë me Sigurimin TPL ju mund të zgjidhni të blini edhe asistencë rrugore “SIGAL UNIQA Autosos“ në Shqiperi për një periudhë 1 vjeçare, e cila mbulon:",
    list: [
      "Qendër kontakti në shqip, 24 orë të ditës në 7 ditë të javës",
      "Riparim ne vend i mjetit (kur riparimi eshte i mundur teknikisht)",
      "Shërbim karrotreci",
    ],
    subHeader2: "",
    buttonText: `Mëso më shumë rreth "AutoSOS"`,
    buttonLink: "/",
  },
  {
    header: "TPL e shoqëruar me sigurimin nga Aksidentet Personale për drejtuesin e mjetit",
    subHeader1: "Dëmshpërblen drejtuesin e mjetit me 1.000.000 Lekë, në rast aksidenti me humbje të jetës.",
    list: [],
    subHeader2: "",
    buttonText: `Mëso më shumë rreth "Aksidente Personale"`,
    buttonLink: "/",
  },
  {
    header: "TPL e shoqëruar me Mini-Kasko",
    subHeader1:
      "Mbulon dëmet aksidentale të vetë mjetit me një shumë sigurimi deri në 1.000.000 Lekë, nga perplasja me një mjet tjetër nëse drejtuesi i mjetit është fajtor, deri në masën 75% të dëmit.",
    list: [],
    subHeader2: "",
    buttonText: `Mëso më shumë rreth "Minikasko"`,
    buttonLink: "/",
  },
  {
    header: "TPL e shoqëruar me kartën TELESHËNDET",
    subHeader1:
      "Për të gjithë periudhën e vlefshmërisë së policës tuaj TPL, ju do të keni mundësinë të konsultoheni me një mjek online kudo që të ndodheni, 24 orë të ditës në 7 ditë të javës.",
    list: [],
    subHeader2: "",
    buttonText: `Mëso më shumë rreth "Teleshëndet"`,
    buttonLink: "/",
  },
];

const OfferContainer = ({ offerData }: { offerData: offerType }) => {
  return (
    <Reveal width="100%">
      <div className="w-full border rounded-md p-6">
        <div>
          <div className="h4 font-bold pb-6 text-presetgray">{offerData.header}</div>
          <hr className="h-[2px]" />
        </div>
        <div className="flex flex-col gap-6 pt-6">
          {offerData.subHeader1 ? <div className="text-presetgray font-semibold">{offerData.subHeader1}</div> : ""}
          {offerData.list.length ? (
            <div className="text-presetgray font-semibold flex flex-col gap-2">
              {offerData.list.map((listItem) => {
                return (
                  <div className="flex gap-2 items-center">
                    <div className="bg-green-500 rounded-full p-2 text-white">
                      <Suspense fallback={<div style={{ height: "10px", width: "10px" }}></div>}>
                        <FaCheck size={10} />
                      </Suspense>
                    </div>
                    <div>{listItem}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {offerData.subHeader2 ? <div className="text-presetgray">{offerData.subHeader2}</div> : ""}
          <div className="w-fit">
            <Button
              buttonType="secondary"
              style={{
                paddingLeft: 14,
                paddingRight: 14,
                fontSize: 15,
                paddingTop: 6,
                paddingBottom: 6,
              }}
            >
              <div className="flex gap-2 items-center">
                <Suspense fallback={<div style={{ height: "16px", width: "16px" }}></div>}>
                  <FaLink size={16} />
                </Suspense>{" "}
                {offerData.buttonText}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default function ProductOffers() {
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionTitleRef = React.useRef(null);

  const scrollToStart = () => {
    if (sectionTitleRef !== null) {
      //@ts-ignore
      sectionTitleRef.current.scrollIntoView();
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-20">
      <ContentContainer>
        <Reveal width="100%">
          <div className="flex flex-col gap-5">
            <div>
              <div ref={sectionTitleRef} className="h1 text-presetgray">
                Ofertat e SIGAL IG:
              </div>
            </div>
            <div className={`flex flex-col gap-4 ${isExpanded ? "h-fit" : "h-[800px] overflow-hidden seeMoreBlur"}`}>
              {offersData.map((offer) => {
                return <OfferContainer offerData={offer} />;
              })}
            </div>
            <div>
              <div className={`flex items-center justify-center ${!isExpanded ? "-translate-y-9" : "translate-y-0"}`}>
                <hr className="flex-grow" />
                <div>
                  {!isExpanded ? (
                    <div>
                      <Button
                        buttonType="secondaryAlt"
                        style={{
                          paddingLeft: 14,
                          paddingRight: 14,
                          fontSize: 16,
                          paddingTop: 6,
                          paddingBottom: 6,
                        }}
                        onClick={() => {
                          setIsExpanded(true);
                        }}
                      >
                        Shfaq te Gjitha
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        buttonType="secondary"
                        style={{
                          paddingLeft: 14,
                          paddingRight: 14,
                          fontSize: 16,
                          paddingTop: 6,
                          paddingBottom: 6,
                        }}
                        onClick={() => {
                          setIsExpanded(false);
                          scrollToStart();
                        }}
                      >
                        Shfaq me Pak
                      </Button>
                    </div>
                  )}
                </div>
                <hr className="flex-grow" />
              </div>
            </div>
          </div>
        </Reveal>
      </ContentContainer>
    </div>
  );
}
