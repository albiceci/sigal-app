import { bottomBarValues } from "./bottomBarData";
import { BottomRowMenu } from "./rowMenu/rowMenu";

type bottomBarProps = {
  activeKey?: string | null;
};
function BottomBar({ activeKey }: bottomBarProps) {
  return (
    <>
      <div className="h-[50px] bg-white bottom-0 w-full fixed z-40 border-t lg:hidden flex items-center justify-center">
        <BottomRowMenu
          menuItems={bottomBarValues.items}
          activeKey={activeKey}
        />
      </div>
    </>
  );
}

export default BottomBar;
