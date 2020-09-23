import React, {
  useContext,
  FunctionComponent,
  // useState,
} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { InvoiceContext, IItem } from "../contexts/invoice.context";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const newItem: IItem = {
  name: "",
  quantity: 1,
  price: 1,
};

interface IItemsForm {
  items: IItem[];
}

const decimalInput = {
  steps: ".01",
  min: 0,
};

const quanityInput = {
  min: 1,
};

const ItemsSection: FunctionComponent = () => {
  const { items: contextItems, setInvoiceProperty } = useContext(
    InvoiceContext
  );
  // const [items, setItems] = useState<IItem[]>(contextItems ?? []);
  const { control, register, handleSubmit } = useForm<IItemsForm>({
    defaultValues: { items: contextItems },
  });
  const { fields, append } = useFieldArray({
    control,

    // Corresponds to the property on defaultValue
    name: "items",
  });

  const onSubmit = (data: IItemsForm) => {
    console.log(data.items);
    setInvoiceProperty("items", data.items);
  };

  const handleAddItem = () => {
    // setItems(items.concat(newItem));
    append(newItem);
  };

  // const handleTextChange = (index: number, property: string) => (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   event.persist();
  //   setItems(
  //     items.map((item: IItem, i: number) =>
  //       i === index
  //         ? {
  //             ...item,
  //             [property]: event.target.value,
  //           }
  //         : item
  //     )
  //   );
  // };
  return (
    <section className="items-section">
      <h1>Enter the items you wish to invoice</h1>
      <Table aria-label="item table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>Item name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Discount (%)</TableCell>
            <TableCell align="right">Price ($)</TableCell>
            <TableCell align="right">Total ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((x, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <TextField
                  variant="outlined"
                  margin="normal"
                  id={`name-${i}`}
                  label="Name"
                  name={`items[${i}].name`}
                  inputRef={register()}
                  defaultValue={x.name}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputProps={quanityInput}
                  label="Quantity"
                  name={`items[${i}].quantity`}
                  error={x.quantity <= 0}
                  inputRef={register()}
                  defaultValue={x.quantity}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`discountPercentage-${i}`}
                  label="Discount (%)"
                  error={
                    !!x.discountPercentage ? x.discountPercentage < 0 : false
                  }
                  name={`items[${i}].discountPercentage`}
                  inputRef={register()}
                  defaultValue={x.discountPercentage}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`price-${i}`}
                  label="Price ($)"
                  error={x.price < 0}
                  name={`items[${i}].price`}
                  inputRef={register()}
                  defaultValue={x.price}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="filled"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`total-${i}`}
                  label="Total ($)"
                  value={
                    !!x.discountPercentage
                      ? x.price - x.price * x.discountPercentage * 0.01
                      : x.price
                  }
                  name={`total`}
                  disabled
                />
              </TableCell>
            </TableRow>
          ))}
          {/* {items.map((x, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <TextField
                  variant="outlined"
                  margin="normal"
                  id={`name-${i}`}
                  label="Name"
                  name={`name-${i}`}
                  value={x.name}
                  onChange={handleTextChange(i, "name")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputProps={quanityInput}
                  label="Quantity"
                  name={`quantity-${i}`}
                  error={x.quantity <= 0}
                  value={x.quantity}
                  onChange={handleTextChange(i, "quantity")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`discountPercentage-${i}`}
                  label="Discount (%)"
                  error={
                    !!x.discountPercentage ? x.discountPercentage < 0 : false
                  }
                  value={x.discountPercentage || ""}
                  name={`discountPercentage-${i}`}
                  onChange={handleTextChange(i, "discountPercentage")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`price-${i}`}
                  label="Price ($)"
                  error={x.price < 0}
                  value={x.price}
                  name={`price-${i}`}
                  onChange={handleTextChange(i, "price")}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="filled"
                  margin="normal"
                  type="number"
                  inputProps={decimalInput}
                  id={`total-${i}`}
                  label="Total ($)"
                  value={
                    !!x.discountPercentage
                      ? x.price - x.price * x.discountPercentage * 0.01
                      : x.price
                  }
                  name={`total-${i}`}
                  disabled
                />
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      <Button
        color="secondary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddItem}
      >
        Add Item
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </section>
  );
};

export default ItemsSection;
