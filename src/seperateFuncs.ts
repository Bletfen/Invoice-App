export const generateInvoiceId = (): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return randomLetters + randomNumbers;
};

export const handleThemeSwitch = (
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
    setIsDark(false);
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setIsDark(true);
  }
};
// const updatedInvoice: IInvoice = {
//   ...invoice,
//   senderAddress: values.senderAddress,
//   clientName: values.clientName,
//   clientEmail: values.clientEmail,
//   clientAddress: values.clientAddress,
//   description: values.description,
//   items: values.items,
//   total: newTotal,
//   createdAt: selectedDate || invoice.createdAt,
//   paymentTerms: selectedPaymentTerms,
//   paymentDue: paymentDue,
// };
