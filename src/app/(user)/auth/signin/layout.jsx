import React from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Login | Demiehan",
  description: "Demiehan",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logobrand.png', sizes: '180x180' }
    ],
  },
  manifest: '/manifest.json'
};

const LayoutSignin = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default LayoutSignin;
