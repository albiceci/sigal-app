import NavBar from "../ui/navBar/navBar";

export const LoadingWithNavBar = () => {
  return (
    <div>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy",
        }}
      />
    </div>
  );
};
