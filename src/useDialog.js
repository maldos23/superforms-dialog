import React, { Fragment, useCallback, useState } from "react";
import {
  Button,
  DialogContent,
  DialogTitle,
  Typography,
  Dialog,
} from "@material-ui/core";

//Gatillo de apertura
function Tigger({ Componse, children, ...props }) {
  return <Componse {...props}>{children}</Componse>;
}

function DialogStyledTitle({
  title = "Title",
  subtitle = "subtitle",
  titleProps = {},
  subtitleProps = {},
}) {
  return (
    <Fragment>
      <Typography variant="subtitle2" {...subtitleProps}>
        {subtitle}
      </Typography>
      <Typography variant="h6" {...titleProps}>
        {title}
      </Typography>
    </Fragment>
  );
}

export default function useDialog({
  TiggerComponent = Button,
  TitleComponent = DialogStyledTitle,
}) {
  const [open, setOpen] = useState(false);

  //Apertura del dialog
  const handleDialog = () => setOpen(!open);

  return {
    handleDialog,
    Tigger: useCallback(
      ({ children, ...otherProps }) => (
        <Tigger
          Componse={TiggerComponent}
          onClick={handleDialog}
          {...otherProps}
        >
          {children}
        </Tigger>
      ),
      []
    ),
    Constructor: useCallback(
      ({ title, subtitle, children }) => (
        <Dialog fullWidth open={open} onClose={handleDialog}>
          <DialogTitle>
            <TitleComponent title={title} subtitle={subtitle} />
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
        </Dialog>
      ),
      [open]
    ),
  };
}

