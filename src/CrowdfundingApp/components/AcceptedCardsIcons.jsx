import {
  VisaIcon,
  MastercardIcon,
  AmericanExpressIcon,
  DinersClubIcon,
} from "react-svg-credit-card-payment-icons";

export default function AcceptedCardsIcons() {
  return (
    <div>
      <VisaIcon className="cardIcon" />
      <MastercardIcon className="cardIcon" />
      <AmericanExpressIcon className="cardIcon" />
      <DinersClubIcon className="cardIcon" />
    </div>
  );
}
