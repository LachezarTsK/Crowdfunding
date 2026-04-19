import { useState, useEffect } from "react";
import Project from "./Project";
import initialProjects from "../data/listOfProjects";
import "../styles/generalStyles.css";

const NOT_SELECTED = -1;

export default function CrowdfundingApp() {
  const [idToEnteredAmount, setIdToEnteredAmount] = useState(new Map());
  const [projects, setProjects] = useState(initialProjects);
  const [popupIdThankYou, setPopupIdThankYou] = useState(NOT_SELECTED);
  const [popupIdInvalidCard, setPopupIdInvalidCard] = useState(NOT_SELECTED);
  const [popupIdInvalidAmout, setPopupIdInvalidAmount] = useState(NOT_SELECTED);
  const [cardIsValid, setCardIsValid] = useState(false);

  useEffect(() => {
    const idTimer = setTimeout(() => {
      setPopupIdInvalidCard(NOT_SELECTED);
    }, 4000);
    return () => clearTimeout(idTimer);
  }, [popupIdInvalidCard]);

  useEffect(() => {
    const idTimer = setTimeout(() => {
      setPopupIdInvalidAmount(NOT_SELECTED);
    }, 4000);
    return () => clearTimeout(idTimer);
  }, [popupIdInvalidAmout]);

  useEffect(() => {
    const idTimer = setTimeout(() => {
      setPopupIdThankYou(NOT_SELECTED);
    }, 4000);
    return () => clearTimeout(idTimer);
  }, [popupIdThankYou]);

  function handleSetIdToEnteredAmount(id, amount) {
    const clone = new Map();
    for (let [key, value] of idToEnteredAmount) {
      clone.set(key, value);
    }
    clone.set(id, amount);
    setIdToEnteredAmount(clone);
  }

  function handleSetProjects(id) {
    if (!cardIsValid) {
      setPopupIdInvalidCard(id);
      return;
    }

    if (!idToEnteredAmount.has(id) || idToEnteredAmount.get(id) < 1) {
      setPopupIdInvalidAmount(id);
      return;
    }

    const clone = [...projects];
    for (let i = 0; i < clone.length; ++i) {
      if (clone[i].id === id) {
        clone[i].raised += idToEnteredAmount.get(id);
        clone[i].remaining = clone[i].goal - clone[i].raised;
        break;
      }
    }
    setProjects(clone);
    setPopupIdThankYou(id);
  }

  return (
    <div>
      <div className="project-container">
        {projects.map(({ id, title, goal, raised, remaining }) => (
          <Project
            key={id}
            id={id}
            title={title}
            goal={goal}
            raised={raised}
            popupIdThankYou={popupIdThankYou}
            popupIdInvalidCard={popupIdInvalidCard}
            popupIdInvalidAmout={popupIdInvalidAmout}
            remaining={remaining}
            handleSetProjects={() => handleSetProjects(id)}
            handleSetIdToAmount={handleSetIdToEnteredAmount}
            setCardIsValid={setCardIsValid}
          />
        ))}
      </div>
    </div>
  );
}
