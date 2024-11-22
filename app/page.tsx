import React from "react";
import "./globals.css";
import Openview from "./components/Opener";

export default function Home() {
  return (
    <div className="pagescreen" style={{height:"100dvh"}}>
      <Openview />
    </div>
  );
}
