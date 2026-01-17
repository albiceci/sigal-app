import { Features } from "../../../common/features/features";

import world from "./world.svg";
import customer from "./customer.svg";
import offer from "./offer.svg";

const featuresData = [
  {
    title: "Risi në tregun shqiptar",
    description:
      "SIGAL IG sjell për herë të parë në Shqipëri shërbimin e Asistëncës Rrugore edhe për në Europë, në bashkëpunim me Europassistance",
    icon: <img src={world} alt=""></img>,
  },
  {
    title: "Kohëzgjatje e shërbimit sipas nevojës",
    description: "Ky lloj shërbimi mundësohet për periudha 1 mujore ose 1-vjeçare në varësi të nevojave të klientit.",
    icon: <img src={customer} alt=""></img>,
  },
  {
    title: "Paketa shërbimi fleksibël",
    description:
      "Asistenca rrugoren ofrohet si shërbim më vete ose i kombinuar me: 1. Karton Jeshil   2. Policë Kufitare  3. Sigurimin TPL   4. KASKO",
    icon: <img src={offer} alt=""></img>,
  },
];

export const AutoSOSFeatures = () => {
  return <Features featureItems={featuresData} />;
};
