import React from "react";
import {
  Stack,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreIcon from "@mui/icons-material/More";
import { useSearch } from "../../contexts/SearchContext";
import AdvancedSearchModal from "../AdvancedSearchModal";
import debounce from "../../services/debounce";
import AFFILIATIONS from "../../constants/affiliations.json";

const OverlayedStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.overlay.main,
  padding: theme.spacing(1),
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  border: "1px solid white",
  color: "white",
  flexGrow: 1,
}));

const searchFields = [
  { name: "rules", label: "Card Text" },
  {
    name: "affiliation",
    label: "Affiliation",
    cmpt: "Select",
    options: AFFILIATIONS.map((affiliation) => ({
      label: affiliation,
      value: affiliation,
    })),
  },
  {
    name: "type",
    label: "Type",
    cmpt: "Select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Reactive", value: "Reactive" },
    ],
  },
  {
    name: "banned",
    label: "Banned",
    cmpt: "Select",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    name: "restricted",
    label: "restricted",
    cmpt: "Select",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
];

const TeamTacticsSearch = ({ updateQuery, hideNumbers }) => {
  const { allTeamTactics, teamTactics, isFiltered, reset } = useSearch();
  const [advancedSearch, setAdvancedSearch] = React.useState(false);
  const toggleAdvancedSearch = () => {
    setAdvancedSearch((prevState) => !advancedSearch);
  };

  const handleSimpleSearch = debounce((e) => {
    updateQuery([["name", e.target.value]], "teamTactics");
  }, 400);

  const handleUpdateQuery = (query) => {
    let parsedQuery = [];
    Object.keys(query).forEach((key) => {
      const entry = query[key];
      if (!!entry && !isNaN(entry)) parsedQuery.push([key, parseInt(entry)]);
      else if (!!entry && isNaN(entry)) parsedQuery.push([key, entry]);
    });

    toggleAdvancedSearch();
    updateQuery(parsedQuery, "teamTactics");
  };

  const handleReset = () => {
    document.querySelector("input").value = null;
    reset();
  };

  return (
    <OverlayedStack>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <StyledTextField
          name="name"
          variant="outlined"
          label="Search"
          onChange={handleSimpleSearch}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <IconButton onClick={toggleAdvancedSearch} size="large">
          <MoreIcon color="white" />
        </IconButton>
      </Stack>
      {isFiltered && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          {!hideNumbers && (
            <Typography>
              Showing {teamTactics.length} of {allTeamTactics.length} Team
              Tactics.
            </Typography>
          )}
          <Button variant="outlined" color="white" onClick={handleReset}>
            Reset Search
          </Button>
        </Stack>
      )}
      <AdvancedSearchModal
        open={advancedSearch}
        toggle={toggleAdvancedSearch}
        submit={handleUpdateQuery}
        searchFields={searchFields}
      />
    </OverlayedStack>
  );
};

export default TeamTacticsSearch;
