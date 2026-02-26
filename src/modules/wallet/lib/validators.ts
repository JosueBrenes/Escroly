export const isValidWallet = (wallet: string): boolean => {
  if (wallet.length !== 56 || wallet[0] !== "G") {
    return false;
  }

  const base32Regex = /^[A-Z2-7]+$/;
  return base32Regex.test(wallet);
};
