import { Reveal } from "../../../../util/reveal";
import { InfoNotes } from "../../../common/infoNotes/infoNotes";
import { Packages1 } from "../../../common/packages1/packages1";
import { ContentContainer } from "../../../containers/contentContainer";

const packageData = [
  {
    name: "Paketa Standard",
    coverages: [
      "Zjarri",
      "Rrufe",
      "Eksplozion",
      "Përplasjes ose rënies së një avioni, pjesëve ose ngarkesës së tij",
      "Përpjekjeve për shuarjen e zjarrit, prishjeve ose lëvizjeve në lidhje me cdo njerën prej ngjarjeve të mësipërme në përputhje me kufirin e përcaktuar në Policë.",
    ],
    link: "/buy?type=form&subtype=property",
    isBest: false,
  },
  {
    name: "Paketa Silver",
    coverages: [
      "Zjarri",
      "Rrufe",
      "Eksplozion",
      "Përplasjes ose rënies së një avioni, pjesëve ose ngarkesës së tij",
      "Përpjekjeve për shuarjen e zjarrit, prishjeve ose lëvizjeve në lidhje me cdo njerën prej ngjarjeve të mësipërme në përputhje me kufirin e përcaktuar në Policë.",
      "Tërmeti",
    ],
    link: "/buy?type=form&subtype=property",
    isBest: true,
  },
  {
    name: "Paketa Standard",
    coverages: [
      "Zjarri",
      "Rrufe",
      "Eksplozion",
      "Përplasjes ose rënies së një avioni, pjesëve ose ngarkesës së tij",
      "Përpjekjeve për shuarjen e zjarrit, prishjeve ose lëvizjeve në lidhje me cdo njerën prej ngjarjeve të mësipërme në përputhje me kufirin e përcaktuar në Policë.",
    ],
    link: "/buy?type=form&subtype=property",
    isBest: false,
  },
];

export function PackageSection() {
  return (
    <article id="packages" className="bg-[#f3f5fb] flex items-center justify-center flex-col gap-6 pb-10">
      <ContentContainer>
        <Reveal type={"x"}>
          <div className="flex items-center justify-center flex-col gap-4">
            <h2 className="text-primary h2 text-center">Paketat e Sigurimit të Pronës</h2>
            <p className="text-center text-presetgray font-semibold">
              SIGAL ofron edhe shërbimin e asistencës 24 orë, që do t'ju ndihmojë në rastin e një emergjence. Kjo do
              t'ju japë një ndjenjë të sigurisë dhe do të reduktojë stresin në rastin e një situatë emergjente.
            </p>
          </div>
        </Reveal>
        <Packages1 packageData={packageData} />
      </ContentContainer>
    </article>
  );
}
