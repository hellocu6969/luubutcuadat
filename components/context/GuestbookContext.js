"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const GuestbookContext = createContext(undefined);

export const GuestbookProvider = ({ children }) => {
  const [available, setAvailable] = useState(true);
  
  // State for data
  const [data, setData] = useState({
    date: "",
    name: "",
    title: "",
    role: "Guest",
    about: "",
    handsome: 40,
    memories: "",
    message: "",
  });

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem("data");
      if (localData) {
        setData(JSON.parse(localData));
        setAvailable(false);
      }
    }
  }, []);

  // Sync to local storage when data changes (optional, but good for recovery)
  // We can also just do this on submit like before. 
  // For now, let's keep the submit logic as the primary persistence point 
  // but persist drafts could be nice. Let's stick to the original logic:
  // "Submit" saves to localStorage.

  return (
    <GuestbookContext.Provider value={{
      data,
      setData,
      available,
      setAvailable
    }}>
      {children}
    </GuestbookContext.Provider>
  );
};

export const useGuestbook = () => {
  const context = useContext(GuestbookContext);
  if (!context) {
    throw new Error("useGuestbook must be used within a GuestbookProvider");
  }
  return context;
};
