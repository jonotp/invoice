import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import InvoiceSupplierSection from "./Supplier/section";
import InvoiceFormCustomerSection from "./Customer/section";
import InvoiceItemsSection from "./Items/section";
import HiddenInvoiceDownloader from "./hidden-invoice-downloader.component";
import {
  ICustomer,
  IItem,
  DefaultCustomer,
  DefaultItem,
  IInvoice,
  Colors,
  DefaultUser,
  IUser,
} from "../types";
import DateFnsUtils from "@date-io/date-fns";
import { Button, TextField } from "@material-ui/core";
import AppContext from "../App/app.context";
import FirebaseContext from "../Firebase/firebase.context";
import { PreloaderContext } from "../Preloader/preloader.context";
import { USER_ACTION_TYPE } from "../types";
import { getFile } from "../LogoUploader/logo-uploader.component";
import CustomDialog from "../Dialog/custom-dialog.component";
import "./invoice-form.scss";

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoiceForm = () => {
  const firebase = useContext(FirebaseContext);
  const { state, dispatch } = useContext(AppContext);
  const { setIsLoading } = useContext(PreloaderContext);

  const [supplierDetails, setSupplierDetails] = useState<IUser>(DefaultUser);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [issueDate, setIssueDate] = useState(new Date());
  const [customerDetails, setCustomerDetails] = useState<ICustomer>(
    DefaultCustomer
  );

  const [hasTax, setHasTax] = useState(true);
  const [taxRatePercentage, setTaxRatePercentage] = useState(10);
  const [items, setItems] = useState<IItem[]>([DefaultItem]);

  const [notes, setNotes] = useState("");

  const [invoice, setInvoice] = useState<IInvoice>();
  const [isProfileDialogueOpen, setIsProfileDialogueOpen] = useState(false);

  useEffect(() => {
    (async () => {
      console.log({ auth: state.auth, user: state.user });
      if (state.auth === null) return;

      // May set this in the app component instead
      if (state.user === null) {
        setIsLoading(true);

        // Set supplier details
        try {
          const user = await firebase?.getUser(state.auth.uid);
          console.log(user);
          if (user !== null) {
            dispatch({
              type: USER_ACTION_TYPE.SAVE_USER_DETAILS,
              payload: user,
            });
          }
        } catch (err) {
          console.log("Failed to get customer data");
        }

        setIsLoading(false);

        // TODO: Set tax rate
      } else if (state.user !== null && supplierDetails.userId === "") {
        setSupplierDetails(state.user);
      }
    })();
  }, [ state, firebase, dispatch, setIsLoading, setSupplierDetails, supplierDetails, ]);

  const onSubmit = () => {
    const submittedInvoice: IInvoice = {
      invoiceNo,
      issueDate,
      supplier: supplierDetails,
      customer: customerDetails,
      hasTax,
      taxRatePercentage,
      items,
      notes,
    };

    console.log(submittedInvoice);

    // If there are changes show the profile dialogue
    if (state.user !== null && state.user !== supplierDetails) {
      setIsProfileDialogueOpen(true);
    }

    setInvoice(submittedInvoice);
  };

  const handleNotesTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setNotes(event.target.value);
  };

  const handleUpdateProfile = async () => {
    if (state.user === null) return;

    const file = getFile();

    // If a new logo was attached then the image needs to be uploaded to storage
    // before updating the user details
    const updatedUser =
      supplierDetails.logo?.match("^blob") && file !== null
        ? {
            ...supplierDetails,
            logo: await firebase?.uploadFile(
              file,
              `logo/${state.user?.userId}_${Date.now()}`
            ),
          }
        : supplierDetails;

    firebase?.updateUser(state.user?.userId, updatedUser);
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
        {invoice !== undefined && invoice !== null ? (
          <HiddenInvoiceDownloader invoice={invoice} colors={colors} />
        ) : null}
        <CustomDialog
          open={isProfileDialogueOpen}
          onClose={() => setIsProfileDialogueOpen(false)}
          onSubmit={handleUpdateProfile}
        >
          <span>Update your details?</span>
        </CustomDialog>
      </section>
    </MuiPickersUtilsProvider>
  );
};

export default InvoiceForm;
