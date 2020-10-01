import React, { FunctionComponent } from "react";
import { Colors, IInvoice, IItem } from "../types";
import { Button } from "@material-ui/core";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import BasicPDF from "../components/pdfs/basic-pdf.component";
import { getToTwoDecimalPlaces } from "../constants";
import "../styles/containers/invoice-pdf.container.scss";

const testData: IInvoice = {
  supplier: {
    identity: "123 456 789",
    name: "The Krusty Krab",
    address: "1 Krusty Street",
    city: "Bikkini Bottom",
    state: "Under the sea",
    zip: "2500",
    country: "Ocean",
    email: "krusty_krab@thekrustkrab.com",
    phone: "0400000000",
  },
  customer: {
    identity: "",
    name: "Sponge Bob",
    address: "1 Pineapple Street",
    city: "Bikkini Bottom",
    state: "Under the sea",
    zip: "2500",
    country: "Ocean",
  },
  hasGST: true,
  invoiceNo: "INV001",
  issueDate: new Date(),
  logo:
    // "https://res.cloudinary.com/teepublic/image/private/s--Neg6ccrS--/b_rgb:fffffe,t_Heather Preview/c_limit,f_jpg,h_630,q_90,w_630/v1542507929/production/designs/3524997_0.jpg",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsnib4Snq5L2UW7EHiCZd351tUzVrOG2MiCg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT687jtRizt6a0o9ZX3tImT8KhWInsT6MjmFg&usqp=CAU",
  notes: `Tempor reprehenderit dolore labore eiusmod est dolore sint consectetur nisi non laboris culpa. Amet eiusmod aliqua voluptate amet. Deserunt do est fugiat excepteur occaecat magna dolore ex ullamco incididunt consequat. Deserunt Lorem est eu ex cupidatat Lorem pariatur. Officia id officia mollit fugiat ea. Et excepteur mollit dolor dolor laboris magna ut.

Tempor officia sunt ipsum id cillum in cillum ex pariatur minim ut laborum consectetur esse. Quis enim adipisicing deserunt eu ad do consectetur eu pariatur nostrud veniam. Irure irure esse adipisicing Lorem consequat eu laborum cillum ad. Veniam ex ut esse eu sunt.`,
  items: [
    {
      name: "Burgers",
      description: "The finest burgers in bikkin bottom",
      price: 10.0,
      quantity: 4,
    },
    {
      name: "Pickles",
      description: "",
      price: 1.1,
      quantity: 10,
    },
    {
      name: "Extra sauce",
      description: "",
      price: 0.5,
      quantity: 5,
    },
  ],
};

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoicePDFContainer: FunctionComponent = () => {
  const invoice = testData;

  const getLineTax = (item: IItem): string =>
    getToTwoDecimalPlaces(item.quantity * item.price * 0.1);

  const getLineTotal = (item: IItem): string =>
    invoice.hasGST
      ? getToTwoDecimalPlaces(
          item.quantity * (Number(item.price) + Number(item.price * 0.1))
        )
      : getToTwoDecimalPlaces(item.quantity * item.price);

  const getTaxTotal = (items: IItem[], taxAmount: number) => {
    if (taxAmount === 0) return getToTwoDecimalPlaces(0);
    return getToTwoDecimalPlaces(
      items.reduce(
        (prev, curr) =>
          (prev += curr.price * (taxAmount * 0.01) * curr.quantity),
        0
      )
    );
  };

  const getSubTotal = (items: IItem[]) => {
    return getToTwoDecimalPlaces(
      items.reduce((prev, curr) => (prev += curr.price * curr.quantity), 0)
    );
  };

  return (
    <section className="invoice-pdf-container">
      <PDFViewer width="90%" height="1200">
        <BasicPDF
          invoice={invoice}
          colors={colors}
          getLineTax={getLineTax}
          getLineTotal={getLineTotal}
          getTaxTotal={getTaxTotal}
          getSubTotal={getSubTotal}
        />
      </PDFViewer>
      <br />
      <Button color="primary" variant="contained">
        <PDFDownloadLink
          className="pdf-link"
          document={
            <BasicPDF
              invoice={invoice}
              colors={colors}
              getLineTax={getLineTax}
              getLineTotal={getLineTotal}
              getTaxTotal={getTaxTotal}
              getSubTotal={getSubTotal}
            />
          }
          fileName="invoice.pdf"
        >
          Print PDF
        </PDFDownloadLink>
      </Button>
    </section>
  );
};

export default InvoicePDFContainer;
