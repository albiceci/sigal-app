import { Reveal } from "../../../../util/reveal";
import { ContentContainer } from "../../../containers/contentContainer";

import infoImage from "./infoImage.svg";

export default function InfoSection1() {
  return (
    <article className="flex items-center justify-center py-16">
      <ContentContainer>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-10 sm:flex-row justify-center items-center">
            <div className="w-full sm:w-[35%]">
              <Reveal width="100%">
                <div className="flex flex-col gap-5 text-center sm:text-left">
                  <h2 className="h2 text-primary">Sigurimi i përgjegjësisë nga fqinjit</h2>
                  <div className="flex flex-col gap-4">
                    <p className="text-presetgray text-justify text-lg">
                      Me sigurimin e përgjegjësisë mund të qëndroni i qetë nëse si pasojë e një zjarri apo përmbytje në
                      pronën tuaj, dëmtohet edhe prona e fqinjit. Të gjitha përgjegjësitë ligjore dhe financiare do tju
                      mbulohen nga SIGAL pasi sigurimi juaj do të shërbejë për riparimin e dëmeve të shkaktuara në
                      pronën e fqinjit.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="w-full sm:w-[45%]">
              <Reveal type={"x"} width="100%">
                <div className="h-auto">
                  <img src={infoImage} alt="infoImage" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </ContentContainer>
    </article>
  );
}
