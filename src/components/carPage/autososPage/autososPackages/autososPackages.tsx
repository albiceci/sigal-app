import { InfoNotes } from "../../../common/infoNotes/infoNotes";
import { Packages1 } from "../../../common/packages1/packages1";

const packageData = [
  {
    name: "AutoSOS në Shqipëri",
    coverages: [
      "Qendra e kontaktit 24/7 - (E pakufizuar)",
      "Riparim në vend - (2 ngjarje / vit 100€ për ngjarje)",
      "Karroatrec - (2 ngjarje / vit 100€ për ngjarje)",
    ],
    link: "/buy?type=form&subtype=autosos",
    isBest: false,
  },
  {
    name: "AutoSOS në Europë",
    coverages: [
      "Qendra e kontaktit 24/7 - (E pakufizuar)",
      "Riparim në vend - (2 ngjarje / vit, 200 € për ngjarje)",
      "Karroatrec - (2 ngjarje / vit, 250 € për ngjarje)",
      "Zëvendësim i automjetit në rast aksidenti* - (1 ngjarje / vit, 2 ditë, maksimumi 50 € / dita)",
      "Akomodimi në hotel* - (1 ngjarje / vit, 3 ditë, maksimumi 50 € / natë)",
      "Transport Alternativ me tren, avion ose taxi* - (1 ngjarje / vit, 230 € / ngjarje)",
    ],
    link: "/buy?type=form&subtype=autosos",
    isBest: true,
  },
];

export function AutoSOSPackages() {
  return (
    <div>
      <Packages1 packageData={packageData} />
      <div className="w-full flex items-center justify-center">
        <div className="w-[95%] md:w-[700px] mb-10">
          <InfoNotes
            text={
              "Shenim: Në një ngjarje, klienti mund të përzgjedhë vetëm njërin prej këtyre shërbimeve: zëvendësim të mjetit ose akomodim në hotel ose vazhdim të udhëtimit"
            }
          />
        </div>
      </div>
    </div>
  );
}
