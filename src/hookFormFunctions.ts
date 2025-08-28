import { useLocation, type NavigateFunction } from "react-router-dom";
import { useDataContext } from "./context/InvoicesContext";
import {
  useFieldArray,
  useForm,
  type UseFormHandleSubmit,
} from "react-hook-form";
import { schema } from "./yup/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateInvoiceId } from "./seperateFuncs";

const { setData } = useDataContext();
const location = useLocation();
export const isEdit = location.pathname.includes("/edit");

export function useInvoiceForm(
  isEdit: boolean,
  invoice: IInvoice | null,
  selectedDate: string | null,
  selectedPaymentTerms: number | null,
  updateInvoice: (id: string, updated: IInvoice) => void,
  setData: React.Dispatch<React.SetStateAction<IInvoice[]>>,
  navigate: NavigateFunction
) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: getDefaultInvoiceValues(),
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (values: Inputs, status: "Paid" | "Pending" | "Draft") => {
    const newTotal = values.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const invoiceDate =
      selectedDate ||
      invoice?.createdAt ||
      new Date().toISOString().split("T")[0];
    const paymentDue = calculatePaymentDue(
      invoiceDate,
      Number(selectedPaymentTerms)
    );

    const newInvoice: IInvoice = {
      id: invoice?.id || generateInvoiceId(),
      createdAt: invoiceDate,
      paymentDue: paymentDue,
      description: values.description,
      paymentTerms: selectedPaymentTerms ?? 0,
      clientName: values.clientName,
      clientEmail: values.clientEmail,
      status: status,
      senderAddress: values.senderAddress,
      clientAddress: values.clientAddress,
      items: values.items,
      total: newTotal,
    };
    if (isEdit && invoice) {
      updateInvoice(invoice.id, newInvoice);
      navigate(-1);
    } else {
      setData((prev) => [newInvoice, ...prev]);
      navigate("/");
    }
  };

  return {
    register,
    control,
    watch,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    onSubmit,
  };
}

export const getDefaultInvoiceValues = (invoice?: IInvoice) => {
  return invoice
    ? {
        senderAddress: invoice.senderAddress,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        clientAddress: invoice.clientAddress,
        description: invoice.description,
        items: invoice.items,
      }
    : {
        senderAddress: { street: "", city: "", postCode: "", country: "" },
        clientName: "",
        clientEmail: "",
        clientAddress: { street: "", city: "", postCode: "", country: "" },
        description: "",
        items: [],
      };
};
export const calculatePaymentDue = (
  createdAt: string,
  paymentTerms: number
): string => {
  const createdDate = new Date(createdAt);
  const dueDate = new Date(createdDate);
  dueDate.setDate(createdDate.getDate() + paymentTerms);
  return dueDate.toISOString().split("T")[0];
};

export const goBack = (navigate: NavigateFunction) => {
  navigate(-1);
};

export const updateInvoice = (id: string, updated: IInvoice) => {
  setData((prev) => prev.map((inv) => (inv.id === id ? updated : inv)));
};

export const createSubmitHandler = (
  handleSubmit: UseFormHandleSubmit<Inputs>,
  onSubmit: (values: Inputs, status: "Paid" | "Pending" | "Draft") => void
) => {
  return (status: "Paid" | "Pending" | "Draft") =>
    handleSubmit((values) => onSubmit(values, status));
};
