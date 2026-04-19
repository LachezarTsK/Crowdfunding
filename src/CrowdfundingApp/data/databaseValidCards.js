
/**
 * -------------------------------
 * Simulated Database for Valid Cards
 * -------------------------------
 *
 * Key: Card Number
 *
 * Value:
 * {
 * cardHolderFirstName: string,
 * cardHolderLastName: string,
 * cardType: string,
 * expiryDate: MM/YY,
 * CVC: string
 * }
 *
 * Note:
 * The stored card expiry date is assumed to be not in the past, i.e.,
 * the provider of the database guarantees that all cards in the database
 * are valid for use and that upon a card's expiration date, the card is
 * immediately removed from the database.
 *
 * Otherwise, in addition to all other card validations, a check that
 * the date is not in the past could be implemented.
 * But in this case, it is assumed that it is not necessary.
 */
const cardNumberToCredentials = new Map();

cardNumberToCredentials.set("4242424242424242", {
  cardHolderFirstName: "John",
  cardHolderLastName: "Smith",
  cardType: "Visa",
  expiryDate: "10/28",
  CVC: "456",
});

cardNumberToCredentials.set("378282246310005", {
  cardHolderFirstName: "John",
  cardHolderLastName: "Adams",
  cardType: "AmericanExpress",
  expiryDate: "12/29",
  CVC: "6789",
});

cardNumberToCredentials.set("5555555555554444", {
  cardHolderFirstName: "Thomas",
  cardHolderLastName: "Jefferson",
  cardType: "Mastercard",
  expiryDate: "08/29",
  CVC: "234",
});

cardNumberToCredentials.set("3056930009020004", {
  cardHolderFirstName: "Benjamin",
  cardHolderLastName: "Franklin",
  cardType: "DinersClub",
  expiryDate: "05/28",
  CVC: "248",
});

export default cardNumberToCredentials;
