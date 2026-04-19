import { useState } from "react";
import "../styles/cardValidatorStyles.css";
import WhiteSpaceInserter from "./WhiteSpaceInserter";
import AcceptedCardsIcons from "./AcceptedCardsIcons";

import {
  isValidCard,
  formatCardDate,
  formatCardNumber,
  formatCardCVC,
  getIconForValidCardNumber,
} from "../utilFunctions/utilFunctions";

export default function CreditOrDebitCardValidator({ setCardIsValid }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  return (
    <div>
      <div className="containerCardValidator">
        <AcceptedCardsIcons />
        <div>
          <input
            type="text"
            className="inputCardHolderName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setCardIsValid(
                isValidCard(
                  cardNumber,
                  e.target.value,
                  lastName,
                  expiryDate,
                  cardCVC,
                ),
              );
            }}
          />
          <input
            type="text"
            className="inputCardHolderName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setCardIsValid(
                isValidCard(
                  cardNumber,
                  firstName,
                  e.target.value,
                  expiryDate,
                  cardCVC,
                ),
              );
            }}
          />
        </div>
        <input
          className="inputCardDate"
          placeholder="Expiry MM/YY"
          type="text"
          minLength={"MM/YY".length}
          maxLength={"MM/YY".length}
          value={expiryDate}
          onChange={(e) => {
            formatCardDate(e.target.value, setExpiryDate);
            setCardIsValid(
              isValidCard(
                cardNumber,
                firstName,
                lastName,
                e.target.value,
                cardCVC,
              ),
            );
          }}
        />
        <input
          className="inputCardNumber"
          placeholder="Credit/Debit Card Number"
          type="text"
          minLength={"xxxx xxxx xxxx".length}
          maxLength={"xxxx xxxx xxxx xxxx".length}
          value={cardNumber}
          onChange={(e) => {
            formatCardNumber(e.target.value, setCardNumber);
            setCardIsValid(
              isValidCard(
                e.target.value,
                firstName,
                lastName,
                expiryDate,
                cardCVC,
              ),
            );
          }}
        />
        <input
          className="inputCardCVC"
          placeholder="CVC"
          type="text"
          minLength={3}
          maxLength={4}
          value={cardCVC}
          onChange={(e) => {
            formatCardCVC(e.target.value, setCardCVC);
            setCardIsValid(
              isValidCard(
                cardNumber,
                firstName,
                lastName,
                expiryDate,
                e.target.value,
              ),
            );
          }}
        />
        {getIconForValidCardNumber(cardNumber)}
      </div>
    </div>
  );
}
