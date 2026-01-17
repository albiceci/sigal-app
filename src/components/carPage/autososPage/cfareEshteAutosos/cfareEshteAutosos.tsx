import { Reveal } from "../../../../util/reveal";
import { ContentContainer } from "../../../containers/contentContainer";

import checkIcon from "./checkIcon.svg";

const ListItem = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <img className="min-w-5 max-w-5" src={checkIcon} alt="" />
      </div>
      <div className="text-base font-medium">{text}</div>
    </div>
  );
};

export function CfareEshteAutoSOS() {
  return (
    <div className="py-10 flex items-center justify-center h-fit relative">
      <div className="h-[50%] w-full absolute z-[-1] bg-secondary opacity-50"></div>
      <ContentContainer>
        <Reveal marginBottom="-10">
          <div className="flex flex-col md:flex-row gap-5 h-fit items-center bg-white border px-9 py-7 rounded-md shadow-md">
            <div className="min-h-[200px] min-w-[200px]">
              <img
                className="h-full w-auto rounded-md"
                src={require("./../../../../assets/sigal/carPage/autososPage/sigalAutoSOS.webp")}
                alt=""
              />
            </div>
            <div className="flex-grow h-full flex flex-col items-center md:items-start gap-3 md:pr-7">
              <div className="h3 text-primary">Çfarë është SIGAL IG AutoSOS?</div>
              <div className="flex flex-col text-justify gap-2">
                <ListItem
                  text={
                    "SIGAL IG AutoSOS është shërbimi asistencës rrugore që gjendet pranë jush në rast të pamundësie së mjetit për të lëvizur, qoftë për arsye të defekteve të mjetit apo në rast aksidenti."
                  }
                />
                <ListItem
                  text={
                    "Shërbim i dedikuar 24/7 nga një skuadër profesionistësh për zgjidhjen e problemit tuaj, nëpermjet riparimit në vënd, shërbimit karroatrec si dhe shërbime të tjera për vijimin e udhetimit ose akomodimin e drejtureist të mjetit."
                  }
                />
                <ListItem
                  text={
                    "Në rastin e parë që ju do të keni nevojë për shërbimin e AutoSOS, do telefononi qendrën Call-Center SIGAL, e cila do t’ju asistojë përgjatë gjithë procesit të asistencës rrugore."
                  }
                />
                <ListItem
                  text={
                    "Qendra Call-Center SIGAL është e gatshme në çdo orë të ditës dhe të natës për të bërë të mundur asistimin tuaj deri në zgjidhjen e problemit."
                  }
                />
                <ListItem
                  text={
                    "Shërbimi i asistencës rrugore nga SIGAL AutoSOS ofrohet brënda Shqiperisë, në rajon si dhe në të gjitha vëndet e Europës."
                  }
                />
              </div>
            </div>
          </div>
        </Reveal>
      </ContentContainer>
    </div>
  );
}
