import React, { createContext, useState, FunctionComponent } from "react";

export interface IPersonel {
  identity?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
}

export interface IItem {
  name: string;
  quantity: number;
  price: number;
  discountPercentage?: number;
}

export interface IInvoice {
  invoiceNo: string;
  issueDate: Date;
  paymentTerm?: string;
  dueDate: Date;
  supplier: IPersonel;
  customer: IPersonel;
  items: IItem[];
  logo?: string;
  notes?: string;
  discountAmount?: number;
  hasGST: boolean;
  total: number;
  setInvoiceProperty(
    property: string,
    data: string | number | boolean | Date | IItem[] | IPersonel
  ): void;
  setInvoicePropertyViaSpread(data: {}): void;
}

const initialInvoiceState: IInvoice = {
  invoiceNo: "",
  issueDate: new Date(),
  dueDate: new Date(),
  supplier: {
    identity: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    phone: "",
  },
  customer: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    phone: "",
  },
  items: [{ name: "", quantity: 1, price: 0.0 }],
  hasGST: false,
  total: 0,
  setInvoiceProperty: () => {},
  setInvoicePropertyViaSpread: () => {},
};

const InvoiceContext = createContext(initialInvoiceState);

const InvoiceProvider: FunctionComponent = ({ children }) => {
  const setInvoiceProperty = (
    property: string,
    data: string | number | boolean | Date | IItem[] | IPersonel
  ) => {
    setInvoice((prevState) => {
      return {
        ...prevState,
        [property]: data,
      };
    });
  };

  const setInvoicePropertyViaSpread = (data: {}) => {
    setInvoice((prevState) => {
      return {
        ...prevState,
        ...data,
      };
    });
  };

  const initalState: IInvoice = {
    invoiceNo: "INV01",
    issueDate: new Date(),
    dueDate: new Date(),
    supplier: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      email: "",
      phone: "",
    },
    customer: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      email: "",
      phone: "",
    },
    items: [{ name: "", quantity: 1, price: 0.0 }],
    hasGST: false,
    total: 0,
    setInvoiceProperty,
    setInvoicePropertyViaSpread,
  };

  const [invoice, setInvoice] = useState<IInvoice>(initalState);
  return (
    <InvoiceContext.Provider value={invoice}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceProvider, InvoiceContext };
