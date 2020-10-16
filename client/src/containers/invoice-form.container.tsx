import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SupplierSection from "../components/supplier-section.component";
import CustomerSection from "../components/customer-section.component";
import ItemsSection from "../components/items-section.component";
import HiddenInvoiceDownloader from "../components/hidden-invoice-downloader.component";
import {
  ICustomer,
  IItem,
  DefaultPersonel,
  DefaultItem,
  IInvoice,
  Colors,
  DefaultUser,
  IUser,
} from "../types";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { AppContext } from "../contexts/app.context";
import { FirebaseContext } from "../contexts/firebase.context";
import { USER_ACTION_TYPE } from "../constants";
import { getFile } from "../components/logo-uploader.component";
import "../styles/containers/invoice-form.container.scss";

const colors: Colors = {
  primary: "#29485d",
  secondary: "#95A8AC",
  background: "#FFD962",
  text: "#333",
};

const InvoiceForm = () => {
  const firebase = useContext(FirebaseContext);
  const { state, dispatch } = useContext(AppContext);

  const [supplierDetails, setSupplierDetails] = useState<IUser>(
    DefaultUser
  );

  const [invoiceNo, setInvoiceNo] = useState("");
  const [issueDate, setIssueDate] = useState(new Date());
  const [customerDetails, setCustomerDetails] = useState<ICustomer>(
    DefaultPersonel
  );

  const [hasTax, setHasTax] = useState(true);
  const [taxRatePercentage, setTaxRatePercentage] = useState(10);
  const [items, setItems] = useState<IItem[]>([DefaultItem]);

  const [notes, setNotes] = useState("");

  const [invoice, setInvoice] = useState<IInvoice>();
  const [isProfileDialogueOpen, setIsProfileDialogueOpen] = useState(false);

  useEffect(() => {
    console.count("in use effect");
    (async () => {
      if (state.auth === null) return;

      if (state.user === null) {
        // Set supplier details
        const user = await firebase?.getUser(state.auth.uid);
        if (user !== null) {
          dispatch({ type: USER_ACTION_TYPE.SAVE_USER_DETAILS, payload: user });
        }

        // TODO: Set tax rate
      } else if (state.user !== null && supplierDetails.userId === "") {
        setSupplierDetails(state.user);
      }
    })();
  }, [state]);

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
            <SupplierSection
              supplier={supplierDetails}
              onUpdateSupplier={setSupplierDetails}
            />
          </div>
          <div className="invoice-section">
            <CustomerSection
              customer={customerDetails}
              onCustomerUpdate={setCustomerDetails}
              invoiceNo={invoiceNo}
              onInvoiceNoUpdate={setInvoiceNo}
              issueDate={issueDate}
              onIssueDateUpdate={setIssueDate}
            />
          </div>
          <div className="invoice-section">
            <ItemsSection
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
        <ProfileDialogue
          open={isProfileDialogueOpen}
          onClose={() => setIsProfileDialogueOpen(false)}
          onSubmit={handleUpdateProfile}
        />
      </section>
    </MuiPickersUtilsProvider>
  );
};

interface ProfileDialogProps {
  open: boolean;
  onClose(): void;
  onSubmit(): void;
}

const ProfileDialogue = ({ open, onClose, onSubmit }: ProfileDialogProps) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>Update your details?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="text" onClick={handleSubmit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceForm;
