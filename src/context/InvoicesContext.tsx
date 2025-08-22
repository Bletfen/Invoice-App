import { createContext, useContext, type ReactNode, useState } from "react";
import DataBase from "../../data.json";

interface IDataContext {
  data: IInvoice[];
  setData: React.Dispatch<React.SetStateAction<IInvoice[]>>;
}
interface IFormDate {
  formDate: (dateStr: string) => string;
}

const DataContext = createContext<IDataContext | undefined>(undefined);
const FormDateContext = createContext<IFormDate | undefined>(undefined);
export default function InvoicesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<IInvoice[]>(DataBase);
  const formDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <DataContext.Provider value={{ data, setData }}>
      <FormDateContext.Provider value={{ formDate }}>
        {children}
      </FormDateContext.Provider>
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("DataContext must be within DataProvider");
  }
  return context;
};

export const useFormDate = () => {
  const context = useContext(FormDateContext);
  if (!context) {
    throw new Error("FormDateContext must be within DataProvider");
  }
  return context;
};
