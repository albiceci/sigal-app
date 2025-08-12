import "./menuIcon.css";

export const MenuIcon = ({
  onClick,
  sideBarActive,
  theme,
}: {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarActive: boolean;
  theme: "primary" | "white";
}) => {
  return (
    <div
      className={`menuIcon ${sideBarActive ? "active" : ""} ${theme}`}
      onClick={
        sideBarActive
          ? () => {
              onClick(false);
            }
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
