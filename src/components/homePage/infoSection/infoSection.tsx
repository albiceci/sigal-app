import { Reveal } from "../../../util/reveal";
import { ContentContainer } from "../../containers/contentContainer";
import { Button } from "../../ui/button/button";

export default function InfoSection() {
  return (
    <article className="flex items-center justify-center py-10">
      <ContentContainer>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-10 sm:gap-0 sm:flex-row sm:justify-between items-center">
            <Reveal>
              <div className="sm:w-[400px] md:w-[600px] lg:w-[700px] flex flex-col gap-5 text-center sm:text-left">
                <div className="h2 text-presetgray">Siguroni pa hezituar mirëqënien tuaj shëndetësore</div>
                <div className="flex flex-col gap-4">
                  <div className="h3 text-primary ">Thjesht! Gjithmonë! Kudo!</div>
                  <div className="">
                    Një risi inovatore për të qenë pranë klientëve në çdo moment dhe për t’ju dhënë shërbimin e duhur
                    shëndetësor. Mundësuar nga SIGAL IG përmes teknologjisë më të fundit, Teleshëndet u lejon klientëve
                    të konsultohen me mjekë të kualifikuar nga komoditeti i shtëpisë së tyre. Klientët mund të
                    rezervojnë takime, të marrin receta dhe të ndjekin udhëzimet mjekësore në mënyrë të thjeshtë dhe të
                    shpejtë, duke kontribuar kështu në përmirësimin e shëndetit dhe mirëqenies së tyre të përgjithshme.
                  </div>
                  <div className="flex items-center justify-center sm:justify-start mt-3">
                    <div className="w-fit">
                      <Button buttonType="primary" style={{}}>
                        Sigurohu në SIGAL
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal type={"x"}>
              <div className="w-[350px] h-[410px]">
                <img alt="img" className="" src={require("./../../../assets/sigal/homePage/dc5fea11-350x410.webp")} />
              </div>
            </Reveal>
          </div>
          <div className="flex flex-col gap-10 sm:gap-0 sm:flex-row-reverse sm:justify-between items-center">
            <Reveal>
              <div className="sm:w-[400px] md:w-[600px] lg:w-[700px] flex flex-col gap-5 text-center sm:text-left">
                <div className="h2 text-presetgray">Zgjidhja e duhur për të gjithë!</div>
                <div className="flex flex-col gap-4">
                  <div>
                    Përfitoni mbrojtje financiare të plotë dhe qetësi mendore në rast fatkeqësie. Ky sigurim është
                    dizajnuar për të garantuar që ju dhe familja juaj të jeni të mbrojtur nga pasojat financiare të
                    ngjarjeve të papritura, duke siguruar një mbështetje të besueshme në kohë të vështira. Jo vetëm një
                    mburojë kundër pasojave të mundshme financiare, por gjithashtu një investim në të ardhmen tuaj dhe
                    të dashurve tuaj.
                  </div>
                  <div className="flex items-center justify-center sm:justify-start mt-3">
                    <div className="w-fit">
                      <Button buttonType="primary" style={{}}>
                        Zbulo Paketën
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal type={"x"}>
              <div className="w-[350px] h-[410px]">
                <img alt="img" className="" src={require("./../../../assets/sigal/homePage/31096661.webp")} />
              </div>
            </Reveal>
          </div>
        </div>
      </ContentContainer>
    </article>
  );
}
