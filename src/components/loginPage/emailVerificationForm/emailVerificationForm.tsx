import { useEffect, useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../ui/form/types";
import { useValidator } from "../../ui/form/validator/useValidator";
import { FormBody } from "../../ui/form/formContainers/formBody";
import { FormRow } from "../../ui/form/formContainers/formRow";
import { TextInput } from "../../ui/form/inputs/textInput/textInput";
import { Link, useSearchParams } from "react-router-dom";
import { Reveal } from "../../../util/reveal";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { FormDisclaimer } from "../../ui/form/formContainers/formDisclaimer";
import { Button } from "../../ui/button/button";
import { useForm } from "../../ui/form/useForm";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../../helper/getErrorMessage";
import { ACCOUNT_REDIRECT } from "../loginForm/loginForm";
import { Loader } from "../../buyPagePOC/loader/loader";

export const EmailVerificationForm = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const checkInstance = async (id: string | null) => {
    const body = {
      id: id,
    };

    loadingOverlay.open("Loading", "Getting your email verification instance");

    const jsonData = await customFetch("/user/email-verification/check", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setIsActive((prev) => {
        return true;
      });
    }
  };

  const sendEmail = async (id: string | null) => {
    const body = {
      id: id,
    };

    loadingOverlay.open("Loading", "sending email");

    const jsonData = await customFetch("/user/email-verification/send-email", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setEmailSent(true);
    }
  };

  const verifyEmail = async (id: string | null, verificationId: string | null) => {
    const body = {
      id: id,
      verificationId: verificationId,
    };

    loadingOverlay.open("Loading", "Verifying your email");

    const jsonData = await customFetch("/user/email-verification/verify", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      window.location.href = ACCOUNT_REDIRECT;
    }
  };

  useEffect(() => {
    if (searchParams.get("verificationId")) verifyEmail(searchParams.get("id"), searchParams.get("verificationId"));
    else if (searchParams.get("id")) checkInstance(searchParams.get("id"));
  }, [searchParams]);

  return (
    <>
      {loadingOverlay.render}
      {alerter.render}
      <Reveal height="100%" width="100%">
        {isActive ? (
          <div className="flex flex-col items-center justify-center text-presetgray gap-2">
            <div className="font-boldFamily text-4xl text-center text-primary pb-4">
              {t("account.emailVerification.title")}
            </div>
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="text-center text-gray-500">{t("account.emailVerification.disclaimer1")}</div>
              <div className="text-center font-semibold">{t("account.emailVerification.disclaimer2")}</div>
              <div className="flex gap-1">
                <span>{t("account.emailVerification.emailNotSent")}</span>
                {emailSent ? (
                  <span className="text-primary opacity-70">{t("account.emailVerification.sent")}</span>
                ) : (
                  <Link
                    className="text-primary"
                    to="#"
                    onClick={() => {
                      if (searchParams.get("id") && !emailSent) sendEmail(searchParams.get("id"));
                    }}
                  >
                    {t("account.emailVerification.sendAgain")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center py-10">
            <Loader />
          </div>
        )}
      </Reveal>
    </>
  );
};
