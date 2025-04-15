"use client";
import { useState } from "react";

export function GlobalState() {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  return { alert, setAlert, isLoading, setIsLoading };
}
