export const formatText = (input: string): string => {
  return input
    .split("-") // Split the text into parts separated by hyphens
    .map((word, index) => {
      // Capitalize the first letter of each word
      if (index === 0) {
        // For the first word, convert the entire word to uppercase (brand)
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" "); // Join the words with a space
};
