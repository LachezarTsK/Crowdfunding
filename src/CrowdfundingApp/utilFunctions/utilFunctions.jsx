import { validateCardForType } from "react-svg-credit-card-payment-icons";
import cardNumberToCredentials from "../data/databaseValidCards";
import { reverse } from "lodash";
import "../styles/cardValidatorStyles.css";

import {
  VisaIcon,
  MastercardIcon,
  AmericanExpressIcon,
  DinersClubIcon,
} from "react-svg-credit-card-payment-icons";

const maxLengthGroupOfDigitsInCardExpiryDate = 2;
const maxLengthGroupOfDigitsInAmountToDonate = 3;
const maxLengthGroupOfDigitsInCardNumber = 4;

const separatorCardExpiryDate = "/";
const separatorCardNumber = " ";
const separatorAmountToDonate = " ";

/**
 * Check all the entered details of the credit or debit card in a simulated database containing valid cards.
 * Also include check for card type through validateCardForType from react-svg-credit-card-payment-icons.
 *
 * @param {string} cardNumber
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} expiryDate
 * @param {string} CVC
 * @returns {boolean}
 */
export function isValidCard(cardNumber, firstName, lastName, expiryDate, CVC) {
  cardNumber = cardNumber.replaceAll(" ", "");
  if (!cardNumberToCredentials.has(cardNumber)) {
    return false;
  }

  const credentials = cardNumberToCredentials.get(cardNumber);

  return (
    validateCardForType(cardNumber, credentials.cardType.replaceAll(" ", "")) &&
    firstName.replaceAll(" ", "") === credentials.cardHolderFirstName &&
    lastName.replaceAll(" ", "") === credentials.cardHolderLastName &&
    expiryDate.replaceAll(" ", "") == credentials.expiryDate &&
    CVC.replaceAll(" ", "") === credentials.CVC
  );
}

/**
 * @param {string} character
 * @returns {boolean}
 */
function isDigit(character) {
  return character >= "0" && character <= "9";
}

/**
 * Format the card expiry date to always be in the format "MM/YY" and allow the entry of only digits.
 * The slash character, i.e. "/", is inserted and deleted automatically.
 *
 * @param {string} input
 * @param {function} setExpiryDate
 * @returns {void}
 */
export function formatCardDate(input, setExpiryDate) {
  input = input.replaceAll(separatorCardExpiryDate, "");
  let formattedInput = "";

  for (let i = 0; i < input.length; ++i) {
    if (!isDigit(input.charAt(i))) {
      return;
    }
    formattedInput += input.charAt(i);
    if (
      i > 0 &&
      i < input.length - 1 &&
      (i + 1) % maxLengthGroupOfDigitsInCardExpiryDate === 0
    ) {
      formattedInput += separatorCardExpiryDate;
    }
  }
  setExpiryDate(formattedInput);
}

/**
 * Format the card number to always be in the format "xxxx xxxx xxxx xxxx" and allow the entry of only digits.
 * The empty space character is inserted and deleted automatically.
 *
 * @param {strging} input
 * @param {function} setCardNumber
 * @returns {void}
 */
export function formatCardNumber(input, setCardNumber) {
  input = input.replaceAll(separatorCardNumber, "");
  let formattedInput = "";

  for (let i = 0; i < input.length; ++i) {
    if (!isDigit(input.charAt(i))) {
      return;
    }
    formattedInput += input.charAt(i);
    if (
      i > 0 &&
      i < input.length - 1 &&
      (i + 1) % maxLengthGroupOfDigitsInCardNumber === 0
    ) {
      formattedInput += separatorCardNumber;
    }
  }
  setCardNumber(formattedInput);
}

/**
 * Allow the entry of only digits for the card CVC.
 *
 * @param {string} input
 * @param {function} setCardCVC
 * @returns {void}
 */
export function formatCardCVC(input, setCardCVC) {
  if (/^\d*$/.test(input)) {
    setCardCVC(input);
  }
}

/**
 * Display a card icon of the accepted card types upon entering a valid card number, regardless 
 * of the overall validity of the card.
 *
 * The overall validity of the card, i.e. a complete match of all card details,
 * is done by method isValidCard(...) Only by a positive result of method isValidCard(...)
 * the transaction can be allowed to proceed.
 *
 * @param {string} input
 * @returns {Card Icon as React Component | null}
 */
export function getIconForValidCardNumber(input) {
  input = input.replaceAll(" ", "");

  if (!cardNumberToCredentials.has(input)) {
    return null;
  }

  switch (cardNumberToCredentials.get(input).cardType) {
    case "Visa":
      return <VisaIcon className="cardIconForValidCardNumber" />;

    case "AmericanExpress":
      return <AmericanExpressIcon className="cardIconForValidCardNumber" />;

    case "Mastercard":
      return <MastercardIcon className="cardIconForValidCardNumber" />;

    case "DinersClub":
      return <DinersClubIcon className="cardIconForValidCardNumber" />;

    default:
      return null;
  }
}

/**
 * Format the amount to donate to always be in the form "xxx xxx xxx xxx", i.e.,
 * each thousandth place is separated with empty space and allow the entry of only digits.
 *
 * The empty space character is inserted and deleted automatically.
 *
 * @param {strging} input
 * @param {function} setAmountToDonate
 * @returns {void}
 */
export function formatAmountToDonate(input, setAmountToDonate) {
  input = input.replaceAll(separatorAmountToDonate, "");
  const indexFirstNonZeroDigit = findIndexFirstNonZeroDigit(input);

  let formattedInput = "";
  let digits = 0;

  for (let i = input.length - 1; i >= indexFirstNonZeroDigit; --i) {
    if (!isDigit(input.charAt(i))) {
      return;
    }
    ++digits;
    formattedInput += input.charAt(i);
    if (digits > 0 && digits % maxLengthGroupOfDigitsInAmountToDonate === 0) {
      formattedInput += separatorAmountToDonate;
    }
  }

  formattedInput = reverse(formattedInput.split("")).join("");
  setAmountToDonate(formattedInput);
}

/**
 * Helper method to skip leading zeros so that these are not displayed
 * in the formatted amount to donate.
 *
 * @param {string} input
 * @returns {number}
 */
function findIndexFirstNonZeroDigit(input) {
  let index = 0;
  while (index < input.length && input.charAt(index) === "0") {
    ++index;
  }
  return index;
}
