import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#59a5d8",
      main: "#386fa4",
      dark: "#133c55",
      contrastText:"#f3f4f9"
    },
    secondary:{
      light: "#9f86c0",
      main: "#5e548e",
      dark: "#231942",
      contrastText:"#575c5f"
    },
    background:{
      paper: "#fff",
      default:"#f3f4f9"
    }
  },
});
export default theme;

