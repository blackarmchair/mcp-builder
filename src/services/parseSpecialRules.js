import { Typography } from "@mui/material";
import MCPIcon from "../components/McpIcon";

const iconize = (string) => {
  const parts = string.split(/(\{[a-zA-Z]+\})/gi);
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = <MCPIcon icon={parts[i]} key={i} />;
  }

  return parts;
};

const parseRulesText = (text) => {
  try {
    const stripHtmlTags = text.replace(/<\/?[^>]+(>|$)/g, "");
    return stripHtmlTags
      .split("-")
      .filter((line) => typeof line === "string" && line.length)
      .map((line, idx) => <Typography key={idx}>• {iconize(line)}</Typography>);
  } catch (e) {
    return text;
  }
};

export default parseRulesText;
