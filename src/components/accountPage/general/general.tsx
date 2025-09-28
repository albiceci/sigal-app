import { GoogleOAuthProvider } from "@react-oauth/google";
import { LinkAccount } from "./linkAccount/linkAccount";
import { PersonalInfo } from "./personalInfo/personalInfo";
import { ProfilePicture } from "./profilePicture/profilePicture";

const SectionContainer = ({ children }: { children: JSX.Element }) => {
  return <div className="bg-white rounded-lg px-5 sm:px-7 py-5">{children}</div>;
};

export function General() {
  return (
    <>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex flex-col gap-4 flex-grow">
          <SectionContainer>
            <PersonalInfo />
          </SectionContainer>
          <SectionContainer>
            <LinkAccount />
          </SectionContainer>
        </div>
        <div>
          <SectionContainer>
            <ProfilePicture />
          </SectionContainer>
        </div>
      </div>
    </>
  );
}
