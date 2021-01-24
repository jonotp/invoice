import React, { ChangeEvent, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import InvoiceSupplierSection from "./Supplier/section";
import InvoiceFormCustomerSection from "./Customer/section";
import InvoiceItemsSection from "./Items/section";
import HiddenInvoiceDownloader from "./hidden-invoice-downloader.component";
import { ICustomer, IItem, IInvoice, Colors, IUser, getDefaultInvoice, ALERT_ACTION_TYPE, ALERT_TYPE, } from "../types";
import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import AppContext from "../App/app.context";
import FirebaseContext from "../Firebase/firebase.context";
import { PreloaderContext } from "../Preloader/preloader.context";
import { USER_ACTION_TYPE } from "../types";
import { getFile } from "../LogoUploader/logo-uploader";
import CustomDialog from "../Dialog/custom-dialog.component";
import SignUpPopup from "../SignUp/popup";
// import * as ROUTES from "../routes";
import "./invoice-form.scss";
import AlertsContext from "../Alert/alerts.context";

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoiceForm = () => {
  const [originalInvoice] = useState<IInvoice>(getDefaultInvoice());
  const firebase = useContext(FirebaseContext);
  // const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const { alertsDispatch } = useContext(AlertsContext);
  const { setIsLoading } = useContext(PreloaderContext);

  const [supplierDetails, setSupplierDetails] = useState<IUser>(originalInvoice.supplier);
  const [invoiceNo, setInvoiceNo] = useState(originalInvoice.invoiceNo);
  const [issueDate, setIssueDate] = useState(originalInvoice.issueDate);
  const [customerDetails, setCustomerDetails] = useState<ICustomer>(originalInvoice.customer);

  const [hasTax, setHasTax] = useState(originalInvoice.hasTax);
  const [taxRatePercentage, setTaxRatePercentage] = useState(originalInvoice.taxRatePercentage);
  const [items, setItems] = useState<IItem[]>(originalInvoice.items);
  const [notes, setNotes] = useState("");

  const [invoice, setInvoice] = useState<IInvoice>();

  const [isProfileDialogueOpen, setIsProfileDialogueOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);

  // on load of the page if there is a auth object in the app state then get user info
  useEffect(() => {
    (async () => {
      if (invoice !== undefined) return;
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

        // TODO: Set tax rate
      } else if (state.user !== null && supplierDetails.userId === "") {
        setSupplierDetails(state.user);
      }
    })();
    // eslint-disable-next-line
  }, [state, firebase, dispatch, setIsLoading, setSupplierDetails, supplierDetails,]);

  // Show the signup popup when an unuthenticated user saves an invoice
  useEffect(() => {
    if (invoice === undefined || state.user !== null) return;

    setIsSignUpPopupOpen(true);

  }, [invoice, state.user])

  // Show the profile dialogue if there are changes to supplier details on authed user
  useEffect(() => {
    if (invoice === undefined || state.user === null || JSON.stringify(state.user) === JSON.stringify(supplierDetails)) return;

    setIsProfileDialogueOpen(true);

    // eslint-disable-next-line
  }, [invoice, state.user])

  const onSubmit = async () => {
    try {
      const submittedInvoice: IInvoice = {
        invoiceId: originalInvoice.invoiceId,
        invoiceNo,
        issueDate,
        supplier: supplierDetails,
        customer: customerDetails,
        hasTax,
        taxRatePercentage,
        items,
        notes,
        dateCreated: new Date(),
      };

      if (firebase === null) throw new Error("Unable to submit invoice");
      const savedInvoice = await firebase?.saveInvoice(submittedInvoice, getFile());
      setInvoice(savedInvoice);
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
    if (state.user === null || invoice === undefined) return;

    firebase?.updateUser(state.user?.userId, invoice?.supplier);
    window.location.reload();
  };

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
          onClick={onSubmit}
        >
          Submit
        </Button>
        {invoice !== undefined ? (
          <HiddenInvoiceDownloader invoice={invoice} colors={colors} />
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
          getFile={getFile}
          // Temporary
          onSuccessfulSubmit={() => window.location.reload()}
          onClose={() => setIsSignUpPopupOpen(false)} />
      </section>
    </MuiPickersUtilsProvider>
  );
};

export default InvoiceForm;
