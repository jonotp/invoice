import React, { ChangeEvent, createRef, useContext, useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import ClearIcon from '@material-ui/icons/Clear';
import AlertsContext from "../Alert/alerts.context";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "../types";
import "./logo-uploader.scss";

interface LogoUploaderProps {
  style?: object;
  logo: string | undefined;
  onUpdateLogo: (x: string) => void;
}

const logoInputRef = createRef<HTMLInputElement>();
const sizeLimitMB = 1;

const getFile = () => {
  const files = logoInputRef.current?.files;
  const file =
    files !== undefined && files !== null && files?.length > 0
      ? files[0]
      : undefined;
  return file;
};

const LogoUploader = ({ style, logo, onUpdateLogo, }: LogoUploaderProps) => {
  const [hasError, setHasError] = useState(false);
  const { alertsDispatch } = useContext(AlertsContext);

  const onChangeLogo = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const input = logoInputRef.current;
    if (input !== undefined && input !== null) {
      input.click();
    }
  };

  const handleDelete = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();

    // this will only clear the src on img el. It will not clear the files on input el
    onUpdateLogo("");
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;

      if (files !== undefined && files !== null && files.length > 0) {
        if (((files[0].size / 1024) / 1024) > sizeLimitMB) throw new Error(`Filesize must be < ${sizeLimitMB}MB`)
        onUpdateLogo(URL.createObjectURL(files[0]));
        setHasError(false);
      }
    }
    catch (error) {
      onUpdateLogo("");
      setHasError(true);
      alertsDispatch({
        type: ALERT_ACTION_TYPE.ADD_ALERT,
        payload: {
          message: error.message,
          type: ALERT_TYPE.ERROR,
        },
      });
    }
  };

  return (
    <div
      className={`logo-uploader ${hasError ? "error" : ""}`}
      style={style}
      onClick={onChangeLogo}
    >
      {logo !== undefined && logo.trim().length > 0 ? (
        <div className="logo-container"
          onClick={onChangeLogo}
        >
          <div className="clear-button">
            <ClearIcon className="clear-svg" onClick={handleDelete} />
          </div>
          <img className="logo-img" src={logo} alt={`Invoice logo`} />
          <span>Click to change logo</span>
        </div>
      ) : (
          <div className="logo-container"
          >
            <ImageIcon className="image-svg" />
            <span>Click to add logo</span>
          </div>
        )}
      <input
        className="logo-input"
        ref={logoInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export { LogoUploader, logoInputRef, getFile };
