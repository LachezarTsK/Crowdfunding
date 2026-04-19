import "../styles/cardValidatorStyles.css";

export default function MessageInvalidInput({
  id,
  popupIdInvalidCard,
  popupIdInvalidAmout,
}) {
  return (
    <div>
      {popupIdInvalidCard === id && (
        <div className="invalidInputMessage">
          Invalid Card! Check Entered Details!
        </div>
      )}
      {popupIdInvalidAmout === id && (
        <div className="invalidInputMessage">
          Amount Must Be Greater Than Zero!
        </div>
      )}
    </div>
  );
}
