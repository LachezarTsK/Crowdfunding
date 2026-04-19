import "../styles/generalStyles.css";

export default function MessageAfterDonation({ id, popupIdThankYou, raised, goal }) {
  return (
    <div>
      {popupIdThankYou === id && (
        <div className="thankYouMessage">Donation successful! Thank you!</div>
      )}

      {popupIdThankYou !== id && raised === goal && (
        <div className="congratulationMessage">
          Goal Reached! Thank you for your support!
        </div>
      )}

      {popupIdThankYou !== id && raised > goal && (
        <div className="congratulationMessage">
          Goal Exceeded by ${raised - goal}! Thank you for your support!
        </div>
      )}
    </div>
  );
}
