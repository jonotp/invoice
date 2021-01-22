export interface IAppContext {
  user: IUser | null;
  auth: firebase.User | null;
};

export interface IAlert {
  id: string;
  title?: string;
  message: string;
  type: ALERT_TYPE;
}

export interface IUser {
  userId: string;
  name: string;
  email: string;
  businessId?: string;
  address?: string;
  phone?: string;
  logo?: string;
}

export const DefaultUser: IUser = {
  userId: "",
  name: "",
  email: "",
  businessId: "",
  address: "",
  phone: "",
  logo: "",
}

export interface ICustomer {
  businessId?: string;
  name: string;
  address: string;
  email?: string;
  phone?: string;
}

export const DefaultCustomer = {
  businessId: "",
  name: "",
  address: "",
  email: "",
  phone: "",
}

export interface IItem {
  description: string;
  quantity: number;
  price: number;
}

export const DefaultItem = {
  description: " ",
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
  supplier: IUser;
  customer: ICustomer;
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

export enum GENERIC_ACTION_TYPE {
  DELETE_ALL = "DELETE_ALL",
};

export enum AUTH_ACTION_TYPE {
  SAVE_AUTH_SESSION = "SAVE_AUTH_SESSION",
  DELETE_AUTH_SESSION = "DELETE_AUTH_SESSION",
};

export enum USER_ACTION_TYPE {
  SAVE_USER_DETAILS = "SAVE_USER_DETAILS",
  DELETE_USER_DETAILS = "DELETE_USER_DETAILS",
  UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS",
};

export enum ALERT_ACTION_TYPE {
  ADD_ALERT = "ADD_ALERT",
  DELETE_ALERT = "DELETE_ALERT",
  CLEAR_ALERTS = "CLEAR_ALERTS"
}

export enum ALERT_TYPE {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}
