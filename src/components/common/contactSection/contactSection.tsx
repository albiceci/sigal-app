import { useState } from "react";
import { Reveal } from "../../../util/reveal";
import { ContentContainer } from "../../containers/contentContainer";
import { FormBody } from "../../ui/form/formContainers/formBody";
import { FormRow } from "../../ui/form/formContainers/formRow";
import { TextInput } from "../../ui/form/inputs/textInput/textInput";
import { FormInputs, InputField } from "../../ui/form/types";
import { FormDisclaimer } from "../../ui/form/formContainers/formDisclaimer";
import { Button } from "../../ui/button/button";

export const formFields: FormInputs<{
  nameSurname: InputField<"text">;
  email: InputField<"text">;
  phone: InputField<"text">;
}> = {
  nameSurname: {
    name: "nameSurname",
    placeholder: "Emer Mbiemer",
    type: "text",
    value: "",
  },
  email: {
    name: "email",
    placeholder: "Addresa e Email",
    type: "text",
    value: "",
  },
  phone: {
    name: "phone",
    placeholder: "Numri i Telefonit",
    type: "text",
    value: "",
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState(formFields);
  return (
    <div className="bg-primary flex justify-center items-center py-24 lg:bg-gradient-to-r from-primary via-primary to-sapphire">
      <Reveal>
        <ContentContainer>
          <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row items-center">
            <div className="text-white w-full lg:w-2/3">
              <h2 className="h1">
                Dëshironi të dini më shumë{<br className="hidden md:block" />} për produktet tona?
                <p className="text-sapphire">Na kontaktoni!</p>
              </h2>
              <p className="mt-10 text-muted text-lg">Ekipi ynë i specialistëve do t'ju ndihmojë të:</p>
              <ul className="mt-4 flex gap-3 flex-col">
                {[
                  "Mësoni për paketat dhe përfitimet e produkteve tona",
                  "Merrni një ofertë individuale",
                  "Planifikoni një takim personal",
                  "Zgjidhni shërbimin e duhur për ju",
                ].map((item, index) => {
                  return (
                    <li key={index} className="flex items-center gap-2">
                      <div className="rounded-full p-1 text-white bg-transparent border">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      </div>
                      <p className="font-semibold text-base">{item}</p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-10">
                <p className="h4 font-bold">Na Kontaktoni:</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-fit h-fit">
                    <Button
                      buttonType="secondaryAlt"
                      style={{ paddingTop: "8px", paddingBottom: "8px" }}
                      icon={{
                        type: "lottie",
                        animationData: require("../../../assets/lottie/icons/phoneIconPrimary.json"),
                        style: { height: 23, width: 23 },
                        placement: "before",
                      }}
                    >
                      <span>0800 31 31</span>
                    </Button>
                  </div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sapphire text-background font-normal hover:bg-sapphire/80">
                    Pa Kosto (FALAS)
                  </div>
                </div>
                <div className="mt-5">
                  <p className="font-subheader font-medium text-base">Metoda te tjera kontakti:</p>
                  <div className="flex items-center flex-wrap gap-2 mt-3">
                    <div className="w-fit h-fit">
                      <Button
                        buttonType="secondary"
                        style={{
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          paddingRight: "8px",
                          paddingLeft: "8px",
                          fontSize: "13px",
                        }}
                        icon={{
                          type: "lottie",
                          animationData: require("../../../assets/lottie/icons/phoneIconWhite.json"),
                          style: { height: 16, width: 16 },
                          placement: "before",
                        }}
                      >
                        <span>+355 4 22 333 08</span>
                      </Button>
                    </div>
                    <div className="w-fit h-fit">
                      <Button
                        buttonType="secondary"
                        style={{
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          paddingRight: "8px",
                          paddingLeft: "8px",
                          fontSize: "13px",
                        }}
                        icon={{
                          type: "lottie",
                          animationData: require("../../../assets/lottie/icons/phoneIconWhite.json"),
                          style: { height: 16, width: 16 },
                          placement: "before",
                        }}
                      >
                        <span>+355 68 606 2829</span>
                      </Button>
                    </div>
                    <div className="w-fit h-fit">
                      <Button
                        buttonType="secondary"
                        style={{
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          paddingRight: "8px",
                          paddingLeft: "8px",
                          fontSize: "13px",
                        }}
                        icon={{
                          type: "lottie",
                          animationData: require("../../../assets/lottie/icons/globeIconWhite.json"),
                          style: { height: 16, width: 16 },
                          placement: "before",
                        }}
                      >
                        <span>Zyrat SIGAL UNIQA</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 h-fit bg-white px-6 py-4 rounded-md">
              <FormBody>
                <FormRow>
                  <TextInput
                    name={formFields.nameSurname.name}
                    value={formData.nameSurname.value}
                    placeholder={formData.nameSurname.placeholder as string}
                    isValid={false}
                    onChange={(e) => {
                      //
                    }}
                    errors={[]}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    name={formFields.email.name}
                    value={formData.email.value}
                    placeholder={formData.email.placeholder as string}
                    isValid={false}
                    onChange={(e) => {
                      //
                    }}
                    errors={[]}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    name={formFields.phone.name}
                    value={formData.phone.value}
                    placeholder={formData.phone.placeholder as string}
                    isValid={false}
                    onChange={(e) => {
                      //
                    }}
                    errors={[]}
                  />
                </FormRow>
                <FormRow
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <Button
                      buttonType="secondary"
                      icon={{
                        type: "lottie",
                        animationData: require("../../../assets/lottie/icons/paperplaneIconWhite.json"),
                        style: { height: 25, width: 25 },
                        placement: "before",
                      }}
                    >
                      Me Kontakto
                    </Button>
                  </div>
                </FormRow>
                <FormRow>
                  <FormDisclaimer>
                    Të dhënat tuaja personale do të përdoren vetëm për qëllimin e ofrimit të informacionit shtesë rreth
                    produkteve të SIGAL UNIQA
                  </FormDisclaimer>
                </FormRow>
              </FormBody>
            </div>
          </div>
        </ContentContainer>
      </Reveal>
    </div>
  );
}
