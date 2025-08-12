const FooterSectionContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-[343px] sm:w-[275px] xl:w-[264px]">{children}</div>;
};

const MarketingLinkTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className="font-semibold text-base">{children}</div>;
};

const MarketingLink = ({ children }: { children: React.ReactNode }) => {
  return <div className="pl-4 sm:pl-0 font-normal text-base">{children}</div>;
};

const MarketingLinkContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

const SocialMediaIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-12 h-12 min-w-12 flex items-center justify-center bg-white shadow-md rounded-full">
      {children}
    </div>
  );
};

const BaseLink = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-[13.33px]">{children}</div>;
};

export default function Footer() {
  return (
    <div className="pt-[80px] sm:pt-[140px] flex flex-col items-center">
      <div className="w-fit">
        <div>
          <div className="flex gap-8 flex-col xl:flex-row">
            <div className="flex gap-8 flex-col sm:flex-row">
              <FooterSectionContainer>
                <div className="flex flex-col gap-8">
                  <div>
                    <img
                      alt="UNIQA Logo"
                      src={require("./../../../assets/sigal/footer/UniqaLogo.png")}
                    />
                  </div>
                  <div className="hidden flex-col gap-4 sm:flex">
                    <div className="flex gap-4">
                      <SocialMediaIcon>
                        <img
                          alt="Facebook Logo"
                          src={require("./../../../assets/sigal/footer/FacebookLogo.png")}
                        />
                      </SocialMediaIcon>
                      <SocialMediaIcon>
                        <img
                          alt="Instagram Logo"
                          src={require("./../../../assets/sigal/footer/InstagramLogo.png")}
                        />
                      </SocialMediaIcon>
                      <SocialMediaIcon>
                        <img
                          alt="Youtube Logo"
                          src={require("./../../../assets/sigal/footer/YoutubeLogo.png")}
                        />
                      </SocialMediaIcon>
                      <SocialMediaIcon>
                        <img
                          alt="Linkedin Logo"
                          src={require("./../../../assets/sigal/footer/LinkedinLogo.png")}
                        />
                      </SocialMediaIcon>
                    </div>
                    <div>
                      <SocialMediaIcon>
                        <img
                          alt="Pinterest Logo"
                          src={require("./../../../assets/sigal/footer/PinterestLogo.png")}
                        />
                      </SocialMediaIcon>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col gap-3">
                    <MarketingLinkTitle>myUNIQA App</MarketingLinkTitle>
                    <div className="flex gap-4">
                      <div>
                        <img
                          alt="AppStore"
                          src={require("./../../../assets/sigal/footer/AppStore.png")}
                        />
                      </div>
                      <div>
                        <img
                          alt="GooglePlay"
                          src={require("./../../../assets/sigal/footer/GooglePlay.png")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FooterSectionContainer>
              <FooterSectionContainer>
                <MarketingLinkContainer>
                  <MarketingLinkTitle>Contact and Services</MarketingLinkTitle>
                  <MarketingLink>Contact</MarketingLink>
                  <MarketingLink>Consultant Request</MarketingLink>
                  <MarketingLink>Location Search</MarketingLink>
                  <MarketingLink>Claims Services</MarketingLink>
                  <MarketingLink>myUNIQA Portal</MarketingLink>
                  <MarketingLink>Newsletter</MarketingLink>
                  <MarketingLink>Online Insurances</MarketingLink>
                </MarketingLinkContainer>
              </FooterSectionContainer>
            </div>
            <div className="flex gap-8 flex-col sm:flex-row">
              <FooterSectionContainer>
                <MarketingLinkContainer>
                  <MarketingLinkTitle>Contentworld</MarketingLinkTitle>
                  <MarketingLink>medUNIQA</MarketingLink>
                  <MarketingLink>CarpeDiem</MarketingLink>
                  <MarketingLink>Podcast</MarketingLink>
                  <MarketingLink>Insurance Encyclopedia</MarketingLink>
                </MarketingLinkContainer>
              </FooterSectionContainer>
              <FooterSectionContainer>
                <MarketingLinkContainer>
                  <MarketingLinkTitle>Company</MarketingLinkTitle>
                  <MarketingLink>About Us</MarketingLink>
                  <MarketingLink>Career</MarketingLink>
                  <MarketingLink>Sustainability</MarketingLink>
                  <MarketingLink>Investor Relations</MarketingLink>
                  <MarketingLink>UNIQA Group</MarketingLink>
                  <MarketingLink>Broker Service</MarketingLink>
                  <MarketingLink>Corporations</MarketingLink>
                </MarketingLinkContainer>
              </FooterSectionContainer>
              <div className="flex sm:hidden flex-col gap-3">
                <MarketingLinkTitle>myUNIQA App</MarketingLinkTitle>
                <div className="flex gap-4">
                  <div>
                    <img
                      alt="AppStore"
                      src={require("./../../../assets/sigal/footer/AppStore.png")}
                    />
                  </div>
                  <div>
                    <img
                      alt="GooglePlay"
                      src={require("./../../../assets/sigal/footer/GooglePlay.png")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:hidden">
                <div className="flex gap-4 justify-between">
                  <SocialMediaIcon>
                    <img
                      alt="Facebook Logo"
                      src={require("./../../../assets/sigal/footer/FacebookLogo.png")}
                    />
                  </SocialMediaIcon>
                  <SocialMediaIcon>
                    <img
                      alt="Instagram Logo"
                      src={require("./../../../assets/sigal/footer/InstagramLogo.png")}
                    />
                  </SocialMediaIcon>
                  <SocialMediaIcon>
                    <img
                      alt="Youtube Logo"
                      src={require("./../../../assets/sigal/footer/YoutubeLogo.png")}
                    />
                  </SocialMediaIcon>
                  <SocialMediaIcon>
                    <img
                      alt="Linkedin Logo"
                      src={require("./../../../assets/sigal/footer/LinkedinLogo.png")}
                    />
                  </SocialMediaIcon>
                  <SocialMediaIcon>
                    <img
                      alt="Pinterest Logo"
                      src={require("./../../../assets/sigal/footer/PinterestLogo.png")}
                    />
                  </SocialMediaIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t pt-4 mt-8 mb-16 sm:mt-16 sm:mb-12 flex flex-col gap-4 items-center sm:items-start">
          <div className="font-normal">© UNIQA 2023</div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <BaseLink>Imprint</BaseLink>
            <BaseLink>Legal Protection</BaseLink>
            <BaseLink>Cookies</BaseLink>
            <BaseLink>Legal Notice</BaseLink>
            <BaseLink>Sitemap</BaseLink>
          </div>
        </div>
      </div>
    </div>
  );
}
