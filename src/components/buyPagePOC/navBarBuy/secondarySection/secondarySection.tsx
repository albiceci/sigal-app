import { RowMenu } from "../mainMenu/rowMenu/rowMenu";

type secondarySectionProps = {
  secondaryMenuItems: {
    name: string;
    link: string | null;
    icons: {
      primary: JSX.Element;
      secondary: JSX.Element;
    };
    key: string;
    subCategories:
      | {
          name: string;
          link: string;
          key: string;
        }[]
      | null;
  }[];
  activeKey?: string | null;
};

export const SecondarySection = ({
  secondaryMenuItems,
  activeKey,
}: secondarySectionProps) => {
  return (
    <div className="flex h-[70px] items-center">
      <RowMenu menuItems={secondaryMenuItems} activeKey={activeKey} />
    </div>
  );
};
