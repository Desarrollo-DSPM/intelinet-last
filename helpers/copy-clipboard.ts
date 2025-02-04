export const copyToClipboard = async (code: string) => {
  await navigator.clipboard.writeText(code);
};
