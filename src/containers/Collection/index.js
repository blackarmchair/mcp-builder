import React from "react";
import { useSearch } from "../../contexts/SearchContext";
import PageContainer from "../../components/PageContainer";
import BoxList from "../../components/BoxList";

const Collection = () => {
  const { characters } = useSearch();

  const CPs = [...new Set(characters.map((character) => character.cp))].sort(
    (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
  );

  const cpList = CPs.map((cp) => {
    const includedCharacters = characters.filter(
      (character) => character.cp === cp
    );
    return includedCharacters;
  });

  return (
    <PageContainer>
      <BoxList cps={cpList} />
    </PageContainer>
  );
};

export default Collection;
