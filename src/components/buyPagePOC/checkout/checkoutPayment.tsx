import { useAlerter } from "../../ui/alerter/useAlerter";
import { Button } from "../../ui/button/button";

export const CheckoutPayment = ({ paymentObject }: { paymentObject: any }) => {
  const alerter = useAlerter();
  const startPayment = () => {
    const form = document.createElement("form");
    form.method = "POST";

    if (paymentObject.endpoint && paymentObject.paymentObject) {
      form.action = paymentObject.endpoint;

      Object.keys(paymentObject.paymentObject).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = paymentObject.paymentObject[key];
        form.appendChild(input);
      });
      document.body.appendChild(form);

      form.submit();
    } else {
      alerter.alertMessage({ description: null, message: "Something went wrong.", type: "error" });
    }
  };
  return (
    <div>
      {alerter.render}
      <Button
        buttonType="secondaryAlt"
        style={{
          paddingTop: 4,
          paddingBottom: 4,
        }}
        onClick={startPayment}
      >
        Vazhdo me pagesen
      </Button>
    </div>
  );
};
