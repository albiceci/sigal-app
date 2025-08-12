import "./menuIcon.css";

export const MenuIcon = ({
  onClick,
  sideBarActive,
}: {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarActive: boolean;
}) => {
  return (
    <div
      className={`menuIconBuy ${sideBarActive ? "active" : ""}`}
      onClick={
        sideBarActive
          ? () => {}
          : () => {
              onClick(true);
            }
      }
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
