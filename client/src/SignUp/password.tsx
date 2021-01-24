import React, { useState } from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface SignUpPasswordProps {
  password: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalidPassword: boolean;
  hasError: boolean;
}

const SignUpPassword = ({
  password,
  onChange: handleChange,
  hasError,
  isInvalidPassword,

}: SignUpPasswordProps) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl
      className={`text-input ${hasError && isInvalidPassword ? "error" : ""
        }`}
      variant="outlined"
      fullWidth
    >
      <InputLabel htmlFor="password">Password *</InputLabel>
      <OutlinedInput
        className={`text-input ${hasError && isInvalidPassword ? "error" : ""
          }`}
        id="password"
        name="password"
        label="Password *"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleChange}
        required
        error={hasError && isInvalidPassword}
        margin="none"
        fullWidth
        placeholder="password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default SignUpPassword;
