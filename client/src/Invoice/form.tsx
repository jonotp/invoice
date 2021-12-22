import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import InvoiceSupplierSection from "./Supplier/section";
import InvoiceFormCustomerSection from "./Customer/section";
import InvoiceItemsSection from "./Items/section";
import InvoiceHiddenDownloader from "./hidden-downloader";
import { ICustomer, IItem, IInvoice, Colors, IUser, getDefaultInvoice, ALERT_ACTION_TYPE, ALERT_TYPE, } from "../types";
import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import AppContext from "../App/app.context";
import FirebaseContext from "../Firebase/firebase.context";
import AlertsContext from "../Alert/alerts.context";
import { PreloaderContext } from "../Preloader/preloader.context";
import { USER_ACTION_TYPE } from "../types";
import { getFile } from "../LogoUploader/logo-uploader";
import CustomDialog from "../Dialog/custom-dialog.component";
import SignUpPopup from "../SignUp/popup";
import * as ROUTES from "../routes";
import "./invoice-form.scss";

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoiceForm = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const { alertsDispatch } = useContext(AlertsContext);
  const { setIsLoading } = useContext(PreloaderContext);

  const [invoice, setInvoice] = useState<IInvoice>(getDefaultInvoice());
  const [supplierDetails, setSupplierDetails] = useState<IUser>(invoice.supplier);
  const [invoiceNo, setInvoiceNo] = useState(invoice.invoiceNo);
  const [issueDate, setIssueDate] = useState(invoice.issueDate);
  const [customerDetails, setCustomerDetails] = useState<ICustomer>(invoice.customer);
  const [paymentDetails, setPaymentDetails] = useState(invoice.paymentDetails);

  const [hasTax, setHasTax] = useState(invoice.hasTax);
  const [taxRatePercentage, setTaxRatePercentage] = useState(invoice.taxRatePercentage);
  const [items, setItems] = useState<IItem[]>(invoice.items);
  const [notes, setNotes] = useState(invoice.notes);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isProfileDialogueOpen, setIsProfileDialogueOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);

  // Scroll to top on load of page 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // On load of the page if there is a auth object in the app state then get user info
  useEffect(() => {
    (async () => {

      // Don't need to get details if the invoice form has been submitted already
      if (hasSubmitted) return;
      if (state.auth === null) return;

      // May set this in the app component instead
      if (state.user === null) {
        setIsLoading(true);

        // Set supplier details
        try {
          const user = await firebase?.getUser(state.auth.uid);
          if (user !== null) {
            dispatch({
              type: USER_ACTION_TYPE.SAVE_USER_DETAILS,
              payload: user,
            });
          }
        } catch (err) {
          console.error("Failed to get user data");
        }

        setIsLoading(false);

      } else if (state.user !== null && supplierDetails.userId === "") {
        setSupplierDetails(state.user);
      }
    })();
    // eslint-disable-next-line
  }, [state, firebase, dispatch, hasSubmitted]);

  // Show the signup popup when an unuthenticated user saves an invoice
  useEffect(() => {
    if (!hasSubmitted || state.user !== null) return;

    setTimeout(() => { setIsSignUpPopupOpen(true) }, 1000);

  }, [hasSubmitted, state.user])

  // Show the profile dialogue if there are changes to supplier details on authed user
  useEffect(() => {
    if (!hasSubmitted || state.user === null || supplierDetails.userId === "" || JSON.stringify(state.user) === JSON.stringify(supplierDetails)) return;

    setIsProfileDialogueOpen(true);

    // eslint-disable-next-line
  }, [hasSubmitted, state.user])

  const handleSubmit = async () => {
    try {

      const submittedInvoice: IInvoice = {
        invoiceId: invoice.invoiceId,
        invoiceNo,
        issueDate,
        supplier: supplierDetails,
        customer: customerDetails,
        paymentDetails,
        hasTax,
        taxRatePercentage,
        items,
        notes,
        dateCreated: hasSubmitted ? invoice.dateCreated : new Date(),
        dateUpdated: hasSubmitted ? invoice.dateUpdated : new Date(),
      };

      if (firebase === null) throw new Error("Unable to submit invoice");

      if (JSON.stringify(submittedInvoice) !== JSON.stringify(invoice)) {
        const savedInvoice = await firebase?.saveInvoice(submittedInvoice, getFile());
        setInvoice(savedInvoice);
        setSupplierDetails(savedInvoice.supplier);
      }
      else {
        // Update last dateUpdated property, which will trigger re-download
        setInvoice({ ...invoice, dateUpdated: new Date() });
      }

      setHasSubmitted(true);
    }
    catch (error) {
      alertsDispatch({
        type: ALERT_ACTION_TYPE.ADD_ALERT,
        payload: {
          message: "Error with submitted invoice",
          type: ALERT_TYPE.ERROR,
        },
      });
    }
  };

  const handleNotesTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setNotes(event.target.value);
  };

  const handleUpdateProfile = async () => {
    if (state.user === null || invoice.supplier.userId === "") return;

    firebase?.updateUser(state.user?.userId, invoice.supplier);
  };

  const handleSignUp = async () => {
    await firebase?.saveInvoice({ ...invoice, dateUpdated: new Date() });

    history.push(ROUTES.HOME);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <section className="invoice-form">
        <div className="invoice-grid">
          <div className="invoice-section">
            <InvoiceSupplierSection
              supplier={supplierDetails}
              onUpdateSupplier={setSupplierDetails}
            />
          </div>
          <div className="invoice-section">
            <InvoiceFormCustomerSection
              customer={customerDetails}
              onCustomerUpdate={setCustomerDetails}
              invoiceNo={invoiceNo}
              onInvoiceNoUpdate={setInvoiceNo}
              issueDate={issueDate}
              onIssueDateUpdate={setIssueDate}
              paymentDetails={paymentDetails}
              onPaymentDetails={setPaymentDetails}
            />
          </div>
          <div className="invoice-section">
            <InvoiceItemsSection
              items={items}
              onItemsUpdate={setItems}
              hasTax={hasTax}
              onHasTaxUpdate={setHasTax}
              taxRate={taxRatePercentage}
              onTaxRateUpdate={setTaxRatePercentage}
            />
          </div>
          <div className="invoice-section">
            <section className="notes-section">
              <h1>Enter any additional notes</h1>
              <TextField
                id="notes"
                label="Additional notes"
                name="notes"
                margin="none"
                className="notes-field"
                rows={4}
                rowsMax={8}
                multiline={true}
                value={notes}
                onChange={handleNotesTextChange}
              />
            </section>
          </div>
        </div>
        <Button
          className="submit-button"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {hasSubmitted ? (
          <InvoiceHiddenDownloader invoice={invoice} colors={colors} />
        ) : null}
        <CustomDialog
          open={isProfileDialogueOpen}
          onClose={() => setIsProfileDialogueOpen(false)}
          onSubmit={handleUpdateProfile}
        >
          <span>Update your details?</span>
        </CustomDialog>
        <SignUpPopup
          open={isSignUpPopupOpen}
          user={invoice?.supplier}
          onSuccessfulSubmit={handleSignUp}
          onClose={() => setIsSignUpPopupOpen(false)} />
      </section>
    </MuiPickersUtilsProvider>
  );
};

export default InvoiceForm;
