import React, { ChangeEvent, createRef } from "react";
import ImageIcon from "@material-ui/icons/Image";
import "../styles/components/logo-uploader.component.scss";

interface LogoUploaderProps {
  style?: object;
  className?: string;
  logo: string | undefined;
  onUpdateLogo: (x: string) => void;
}

const logoInputRef = createRef<HTMLInputElement>();

const getFile = () => {
  const files = logoInputRef.current?.files;
  const file =
    files !== undefined && files !== null && files?.length > 0
      ? files[0]
      : null;
  return file;
};

const LogoUploader = ({
  style,
  className,
  logo,
  onUpdateLogo,
}: LogoUploaderProps) => {
  const onChangeLogo = () => {
    const input = logoInputRef.current;
    if (input !== undefined && input !== null) {
      input.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Need to consider change events users cancel the upload
    const files = event.target.files;
    if (files !== undefined && files !== null && files.length > 0) {
      onUpdateLogo(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div
      className={`logo-uploader ${className}`}
      style={style}
      onClick={onChangeLogo}
    >
      {logo !== undefined && logo.trim().length > 0 ? (
        <div className="logo-container">
          <img className="logo-img" src={logo} alt={`Invoice logo`} />
          <span>Click to change logo</span>
        </div>
      ) : (
        <div className="logo-container">
          <ImageIcon />
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
