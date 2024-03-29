import React, { ChangeEvent } from "react";

export const commonInputChange = <T>(dispatch: React.Dispatch<React.SetStateAction<T>>) => (event: ChangeEvent<HTMLInputElement>) => {
  event.persist();
  return (
    dispatch((prev: T) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    })
  )
};