import React from "react";
//import { Box, Button, HStack, VStack,Input,Image,Text, FormControl,FormLabel,Center, Spinner,Modal, ModalOverlay, ModalContent,ModalBody,useDisclosure, Heading, useToast } from '@chakra-ui/react'
import { withRouter } from "react-router-dom"; // Import withRouter
import "./Popup.css";
//import { CardElement, injectStripe } from "react-stripe-elements";

const PopupMessage = ({ message, onClose, history }) => {
  const handleClose = () => {
    onClose();
    history.push("/payment"); // Navigate to the payment.js page
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <p style={{ color: "black" }}>Thanks for Booking!!</p>

        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default withRouter(PopupMessage); // Wrap the component with withRouter
