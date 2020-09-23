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

export const DefaultPersonel = {
  name: "",
  address:"",
  city: "",
  state: "", 
  zip: "", 
  country:"", 
  email: "", 
  phone: "", 
}

export interface IItem {
  name: string;
  quantity: number;
  price: number;
  discountPercentage?: number;
}

export const DefaultItem = {
  name: "",
  quantity: 1,
  price: 0,
}

export interface IInvoiceDetails{
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
  invoiceDetails: IInvoiceDetails;
  supplier: IPersonel;
  customer: IPersonel;
  items: IItem[];
  logo?: string;
  notes?: string;
  setInvoiceProperty(
    property: string,
    data: string | number | boolean | Date | IItem[] | IPersonel | IInvoiceDetails
  ): void;
  setInvoicePropertyViaSpread(data: {}): void;
}
