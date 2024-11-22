"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Uploader(props) {
    const [file, setFile] = useState<File>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!file) {
        return;
      }
     try {
        const data = new FormData();
        data.set("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if(!res.ok) throw new Error(await res.text());
        console.log(res);
      } catch (e: any) {
        console.error(e);
      }
    }
    return (
        <div className="pagescreen">
          <div className="backbtn">
          <Link href="/pages/HomePage">
              <div className="backbtn">
                  <p>Back</p>
              </div>
          </Link>
      </div>
          <div className="flexpanelc" style={{height:"100dvh"}}>
            <div className="apptexth1" style={{marginBottom:"3rem"}}>
            <h1>Uploader</h1>
            </div>
            <form onSubmit={onSubmit}>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files?.[0]);
                  }
                }} 
              /> 
              <button type="submit">Upload</button>
            </form> 
          </div>
        </div>
    )
}


