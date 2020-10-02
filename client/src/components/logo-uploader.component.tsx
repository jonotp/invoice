import React, { ChangeEvent, createRef, Dispatch, SetStateAction } from "react";
import ImageIcon from "@material-ui/icons/Image";
import "../styles/components/logo-uploader.component.scss";

interface LogoUploaderProps {
  style?:object;
  className?: string;
  logo: string;
  onUpdateLogo: Dispatch<SetStateAction<string>>;
}
const LogoUploader = ({ style, className, logo, onUpdateLogo }: LogoUploaderProps) => {
  const logoInput = createRef<HTMLInputElement>();

  const onChangeLogo = () => {
    const input = logoInput.current;
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
      {logo.trim().length > 0 ? (
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
        ref={logoInput}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default LogoUploader;
