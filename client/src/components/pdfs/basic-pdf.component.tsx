import React, { FunctionComponent } from "react";
import { PDFProps } from "../../types";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import {
  getLineTax,
  getLineTotal,
  getSubTotal,
  getTaxTotal,
} from "../../constants";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf",
      fontStyle: "italic",
    },
  ],
});

const BasicPDF: FunctionComponent<PDFProps> = ({ invoice, colors }) => {
  const styles = StyleSheet.create({
    body: {
      fontFamily: "Open Sans",
      padding: "50",
      color: colors.text,
      fontSize: "10",
    },
    title: {
      fontSize: "50",
      fontWeight: 600,
      color: colors.primary,
      textTransform: "uppercase",
    },
    heading: {
      fontSize: "12",
      fontWeight: 600,
      color: colors.primary,
      marginBottom: "12",
      textTransform: "uppercase",
    },
    tableHeading: {
      fontWeight: 600,
      color: colors.secondary,
      paddingBottom: "6",
      marginBottom: "6",
      borderBottom: `1 solid ${colors.primary}`,
      textTransform: "uppercase",
    },
    tableRow: {
      paddingBottom: "6",
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    flexGrow: {
      flex: 3,
    },
    flexGrow2: {
      flex: 5,
      paddingRight: "25",
    },
    borderBox: {
      // border: `1 solid ${colors.primary}`,
    },
    description: {
      width: "40%",
      textAlign: "left",
    },
    quantity: {
      width: "15%",
      textAlign: "right",
    },
    price: {
      width: invoice.taxRatePercentage > 0 ? "11.25%" : "22.5%",
      textAlign: "right",
    },
    tax: {
      width: "11.25%",
      textAlign: "right",
    },
    total: {
      width: "22.5%",
      textAlign: "right",
    },
    notes: {
      fontSize: "10",
      fontStyle: "italic",
    },
    divider: {
      width: "100%",
      height: "1",
      backgroundColor: "#DCDCDC",
      marginTop: "25",
      marginBottom: "12",
    },
    invoiceDetailsSection: {},
    itemsSection: {
      marginTop: "25",
    },
    subHeadings: {
      fontWeight: 600,
      color: colors.secondary,
      textTransform: "uppercase",
    },
    textBold: {
      fontWeight: 600,
    },
    totalRow: {
      fontSize: "14",
      fontWeight: 600,
      marginTop: 6,
      paddingTop: 6,
      borderTop: `1 solid ${colors.primary}`,
    },
  });

  const tax = invoice.taxRatePercentage;
  const dateDue = format(invoice.issueDate, "do MMMM, yyyy");
  const subTotal = getSubTotal(invoice.items);
  const taxTotal = getTaxTotal(invoice.items, tax);
  const total = Number(subTotal) + Number(taxTotal);

  return (
    <Document
      title={`${invoice.customer.name} Invoice - ${invoice.invoiceNo}`}
      author={invoice.supplier.name}
      subject="Invoice"
      keywords={`${invoice.customer.name}, ${invoice.invoiceNo}, Invoice`}
    >
      <Page size="A4" style={styles.body}>
        {/* Header */}
        <Text style={styles.title}>Invoice</Text>
        <View style={[styles.divider, { marginTop: "12" }]}></View>
        <View style={[styles.flexRow, { maxHeight: "150" }]}>
          {/* Supplier */}
          <View style={[styles.flexGrow2, styles.borderBox]}>
            <Text style={[styles.heading]}>Bill From:</Text>
            <Text style={[styles.textBold]}>{invoice.supplier.businessId}</Text>
            <Text>{invoice.supplier.name}</Text>
            <Text>{invoice.supplier.address}</Text>
            <Text>
              {invoice.supplier.city}, {invoice.supplier.state},{" "}
              {invoice.supplier.zip}
            </Text>
            {invoice.supplier.email !== null ? (
              <Text>{invoice.supplier.email}</Text>
            ) : null}
            {invoice.supplier.phone !== null ? (
              <Text>{invoice.supplier.phone}</Text>
            ) : null}
          </View>
          <View
            style={[
              styles.flexGrow,
              styles.borderBox,
              { position: "relative", alignItems: "flex-end" },
            ]}
          >
            {invoice.supplier.logo != null ? (
              <Image
                source={invoice.supplier.logo}
                style={{
                  width: "100%",
                }}
              />
            ) : null}
          </View>
        </View>
        <View style={[styles.divider]}></View>
        <View style={[styles.flexRow]}>
          {/* Customer */}
          <View style={[styles.flexGrow2, styles.borderBox]}>
            <Text style={[styles.heading]}>Bill To:</Text>
            <Text>{invoice.customer.businessId}</Text>
            <Text>{invoice.customer.name}</Text>
            <Text>{invoice.customer.address}</Text>
            <Text>
              {invoice.customer.city}, {invoice.customer.state},{" "}
              {invoice.customer.zip}
            </Text>
          </View>

          {/* Invoice Details */}
          <View
            style={[
              styles.flexGrow,
              styles.borderBox,
              styles.invoiceDetailsSection,
              { alignItems: "flex-end" },
            ]}
          >
            <View style={[styles.flexRow]}>
              <View style={[styles.flexGrow]}>
                <Text style={[styles.subHeadings]}>Invoice #</Text>
              </View>
              <View style={[styles.flexGrow, { textAlign: "right" }]}>
                <Text>{invoice.invoiceNo}</Text>
              </View>
            </View>
            <View style={[styles.flexRow]}>
              <View style={[styles.flexGrow]}>
                <Text style={[styles.subHeadings]}>Issue date</Text>
              </View>
              <View style={[styles.flexGrow, { textAlign: "right" }]}>
                <Text>{dateDue}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Items */}
        <View style={[styles.itemsSection, styles.borderBox]}>
          <View style={[styles.flexRow, styles.tableHeading]}>
            <Text style={[styles.description]}>Description</Text>
            <Text style={[styles.quantity]}>Quantity</Text>
            <Text style={[styles.price]}>Price</Text>
            {invoice.taxRatePercentage > 0 ? (
              <Text style={[styles.tax]}>Tax</Text>
            ) : null}
            <Text style={[styles.total]}>Line Total</Text>
          </View>
          {invoice.items.map((x, i) => {
            return (
              <View key={i} style={[styles.flexRow, styles.tableRow]}>
                <Text style={styles.description}>{x.description}</Text>
                <Text style={styles.quantity}>{x.quantity}</Text>
                <Text style={styles.price}>${x.price}</Text>
                {invoice.taxRatePercentage > 0 ? (
                  <Text style={styles.tax}>${getLineTax(x, tax)}</Text>
                ) : null}
                <Text style={styles.total}>${getLineTotal(x, tax)}</Text>
              </View>
            );
          })}
        </View>
        <View style={[styles.divider]}></View>
        <View style={[styles.flexRow, styles.borderBox]}>
          {/* Notes */}
          <View style={[styles.flexGrow2]}>
            <Text style={[styles.heading]}>Notes:</Text>
            <Text style={[styles.notes]}>{invoice.notes}</Text>
          </View>
          <View style={[styles.flexGrow, { alignItems: "center" }]}>
            <View style={[styles.flexRow]}>
              <View style={[styles.flexGrow]}>
                <Text style={[styles.subHeadings]}>Subtotal</Text>
              </View>
              <View style={[styles.flexGrow, { textAlign: "right" }]}>
                <Text>$ {subTotal}</Text>
              </View>
            </View>
            <View style={[styles.flexRow]}>
              <View style={[styles.flexGrow]}>
                <Text style={[styles.subHeadings]}>Tax</Text>
              </View>
              <View style={[styles.flexGrow, { textAlign: "right" }]}>
                <Text>$ {taxTotal}</Text>
              </View>
            </View>
            <View style={[styles.flexRow, styles.totalRow]}>
              <View style={[styles.flexGrow]}>
                <Text style={[styles.subHeadings]}>Total</Text>
              </View>
              <View style={[styles.flexGrow, { textAlign: "right" }]}>
                <Text>$ {total}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BasicPDF;
