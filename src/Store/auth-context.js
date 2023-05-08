import React, { useState } from "react";

const AuthContext = React.createContext({
  showModel: false,
  onConfirm: () => {},
});

export const AuthContextProvider = (props) => {
  const [showModel, setShowModal] = useState(false);

  const onConfirmHandler = () => {
    if (showModel) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        showModel: showModel,
        onConfirm: onConfirmHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;