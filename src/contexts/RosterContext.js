import React, { createContext, useContext, useState } from "react";
import * as Local from "../services/local";
import { useToast } from "./ToastContext";

const ROSTER_MODEL = {
  name: "",
  characters: [],
  teamTactics: [],
  crises: [],
  created: new Date().getTime(),
  lastUpdated: new Date().getTime(),
};

const RosterContext = createContext();

export function useRosters() {
  return useContext(RosterContext);
}

export function RosterProvider({ children }) {
  const [selectedRoster, setSelectedRoster] = useState();
  const { postMessage } = useToast();

  const getRosters = () => {
    return Local.read("rosters");
  };

  const selectRoster = (rosterId) => {
    const rosters = Local.read("rosters");
    if (!rosters) return;
    const roster = rosters.find((r) => !r.id.localeCompare(rosterId));
    setSelectedRoster(roster);
  };

  const createRoster = (name) => {
    const id = crypto.randomUUID();
    const newRoster = { ...ROSTER_MODEL, name, id };

    const rosters = !!Local.read("rosters");
    if (rosters) {
      Local.push("rosters", newRoster);
      setSelectedRoster(newRoster);
    } else {
      Local.create("rosters", [newRoster]);
      setSelectedRoster(newRoster);
    }

    return newRoster;
  };

  const deleteRoster = (rosterId) => {
    Local.filter("rosters", (roster) => roster.id !== rosterId);
    setSelectedRoster(null);
    postMessage("Deleted Roster");
  };

  const updateRoster = (newRoster) => {
    const d = new Date();
    const rosters = Local.read("rosters");
    const updatedRosters = rosters.map((roster) => {
      if (roster.id.localeCompare(newRoster.id)) return roster;
      return newRoster;
    });
    Local.set("rosters", updatedRosters);
    setSelectedRoster({
      ...newRoster,
      lastUpdated: d.getTime(),
    });
    postMessage("Roster Saved!");
  };

  const copyRoster = (rosterId) => {
    const d = new Date();
    const rosters = getRosters();
    const rosterToCopy = rosters.find(
      (roster) => !roster.id.localeCompare(rosterId)
    );
    if (!!rosterToCopy) {
      Local.push("rosters", {
        ...rosterToCopy,
        name: `${rosterToCopy.name} (${d.toLocaleDateString()})`,
        id: crypto.randomUUID(),
        lastUpdated: d.getTime(),
        created: d.getTime(),
      });
      postMessage("Copied Roster");
    } else {
      postMessage("Couldn't copy this roster.", "error");
    }
  };

  const clearSelectedRoster = () => {
    setSelectedRoster(null);
  };

  const importRoster = (roster) => {
    const d = new Date();
    const rosters = getRosters();
    const rosterExists = rosters.find((r) => !r.id.localeCompare(roster.id));
    if (!rosterExists) {
      Local.set("rosters", [
        ...rosters,
        {
          ...roster,
          lastUpdated: d.getTime(),
        },
      ]);
      postMessage("Roster Imported Successfully!");
    }
  };

  return (
    <RosterContext.Provider
      value={{
        selectedRoster,
        getRosters,
        createRoster,
        selectRoster,
        deleteRoster,
        updateRoster,
        copyRoster,
        clearSelectedRoster,
        importRoster,
      }}
    >
      {children}
    </RosterContext.Provider>
  );
}
