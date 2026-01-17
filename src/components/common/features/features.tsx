import { Reveal } from "../../../util/reveal";
import { WindowDimensions } from "../../../util/windowDimensions";
import { ContentContainer } from "../../containers/contentContainer";

type featureItemType = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const FeatureItem = ({ itemData }: { itemData: featureItemType }) => {
  return (
    <div className="bg-primary p-5 h-full rounded-md shadow-md text-white flex flex-col gap-5 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center">
        <div className="w-[70px]">{itemData.icon}</div>
      </div>
      <div className="flex flex-col gap-2 items-center text-center">
        <div className="text-xl font-bold">{itemData.title}</div>
        <div className="">{itemData.description}</div>
      </div>
    </div>
  );
};

export function Features({ featureItems }: { featureItems: featureItemType[] }) {
  var windowDimensions = WindowDimensions();
  return (
    <div className="flex items-center justify-center py-6 h-fit">
      <ContentContainer>
        <div className="flex gap-4 bg-gray-100 px-7 py-5 flex-col rounded-md lg:flex-row h-full">
          {featureItems.map((feature, index) => {
            return (
              <div className="min-h-full">
                <Reveal width="100%" height="100%" delay={windowDimensions.width >= 1024 ? 0.25 * index : 0}>
                  <FeatureItem itemData={feature} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </ContentContainer>
    </div>
  );
}
