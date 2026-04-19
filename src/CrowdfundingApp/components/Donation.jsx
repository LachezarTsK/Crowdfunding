import { useState } from "react";
import { formatAmountToDonate } from "../utilFunctions/utilFunctions";
import "../styles/generalStyles.css";

export default function Donation({
  id,
  raised,
  goal,
  handleSetIdToAmount,
  handleSetProjects,
}) {
  const [amountToDonate, setAmountToDonate] = useState("");

  return (
    <div>
      USD{" "}
      <input
        className="input"
        placeholder="Amount in USD"
        type="text"
        minLength={"1".length}
        maxLength={"100 000 000 000".length}
        value={amountToDonate}
        onChange={(e) => {
          handleSetIdToAmount(id, Number(e.target.value));
          formatAmountToDonate(e.target.value, setAmountToDonate);
        }}
      />
      <button
        className={raised < goal ? "button" : "button disabled"}
        disabled={raised >= goal}
        onClick={() => {
          handleSetProjects(id);
        }}
      >
        Donate
      </button>
    </div>
  );
}
