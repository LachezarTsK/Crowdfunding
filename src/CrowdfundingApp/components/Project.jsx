import Donation from "./Donation";
import MessageAfterDonation from "./MessageAfterDonation";
import MessageInvalidInput from "./MessageInvalidInput";
import WhiteSpaceInserter from "./WhiteSpaceInserter";
import CreditOrDebitCardValidator from "./CreditOrDebitCardValidator";
import "../styles/generalStyles.css";

export default function Project({
  id,
  title,
  goal,
  raised,
  popupIdThankYou,
  popupIdInvalidCard,
  popupIdInvalidAmout,
  remaining,
  handleSetProjects,
  handleSetIdToAmount,
  setCardIsValid,
}) {
  return (
    <>
      <div key={id} className="project">
        <div className="title">{title}</div>

        <div>
          Goal: ${goal}
          <WhiteSpaceInserter widthInPixels={28} />
          Raised: ${raised}
          <WhiteSpaceInserter widthInPixels={28} />
          Remaining: ${Math.max(remaining, 0)}
        </div>

        <CreditOrDebitCardValidator setCardIsValid={setCardIsValid} />

        <Donation
          id={id}
          raised={raised}
          goal={goal}
          handleSetIdToAmount={handleSetIdToAmount}
          handleSetProjects={() => handleSetProjects(id)}
        />

        <MessageInvalidInput
          id={id}
          popupIdInvalidCard={popupIdInvalidCard}
          popupIdInvalidAmout={popupIdInvalidAmout}
        />

        <MessageAfterDonation
          id={id}
          popupIdThankYou={popupIdThankYou}
          raised={raised}
          goal={goal}
        />
      </div>
    </>
  );
}
