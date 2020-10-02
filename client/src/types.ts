export interface IPersonel {
  businessId?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email?: string;
  phone?: string;
}

export const DefaultPersonel = {
  identity: "",
  name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  email: "",
  phone: "",
}

export interface IItem {
  description: string;
  quantity: number;
  price: number;
}

export const DefaultItem = {
  description: "",
  quantity: 1,
  price: 0,
}

export interface IInvoiceDetails {
  invoiceNo: string;
  issueDate: Date;
  hasGST: boolean;
}

export const DefaultInvoiceDetails = {
  invoiceNo: "",
  issueDate: new Date(),
  hasGST: false,
}
export interface IInvoice {
  invoiceNo: string;
  issueDate: Date;
  logo?: string;
  supplier: IPersonel;
  customer: IPersonel;
  items: IItem[];
  hasTax: boolean;
  taxRatePercentage: number;
  notes?: string;
}

export interface Colors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface PDFProps {
  invoice: IInvoice,
  colors: Colors,
}
