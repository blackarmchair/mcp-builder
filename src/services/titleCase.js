const toTitleCase = (str) => {
  try {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        if (!word.length) return "";
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  } catch (e) {
    return str;
  }
};

export default toTitleCase;
