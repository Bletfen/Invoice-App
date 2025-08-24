interface IFilter {
  Draft: boolean;
  Pending: boolean;
  Paid: boolean;
}

interface IItems {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface IInvoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IItems[];
  total: number;
}

type Inputs = {
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientName: string;
  clientEmail: string;
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  description: string;
  items: itemsInput[];
};
type itemsInput = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type TInvoices = IInvoice[];
