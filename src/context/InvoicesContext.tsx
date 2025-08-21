import { createContext, useContext, type ReactNode, useState } from "react";
import DataBase from "../../data.json";

interface IDataContext {
  data: IInvoice[];
  setData: React.Dispatch<React.SetStateAction<IInvoice[]>>;
}

const DataContext = createContext<IDataContext | undefined>(undefined);
export default function InvoicesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<IInvoice[]>(DataBase);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
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
