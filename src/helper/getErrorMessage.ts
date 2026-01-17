import i18n from "../i18n";

export function getErrorMessage(errorCode: string): { description: string; message: string; type: "error" } {
  return {
    description: i18n.exists(`error.${errorCode}.description`) ? i18n.t(`error.${errorCode}.description`) : "",
    message: i18n.exists(`error.${errorCode}.message`) ? i18n.t(`error.${errorCode}.message`) : errorCode,
    type: "error",
  };
}
