import { ChangePassword } from "./changePassword/changePassword";

const SectionContainer = ({ children }: { children: JSX.Element }) => {
  return <div className="bg-white rounded-lg px-5 sm:px-7 py-5">{children}</div>;
};

export function Settings() {
  return (
    <>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex flex-col gap-4 flex-grow">
          <SectionContainer>
            <ChangePassword />
          </SectionContainer>
        </div>
        {/* <div>
          <SectionContainer>
            <ProfilePicture />
          </SectionContainer>
        </div> */}
      </div>
    </>
  );
}
