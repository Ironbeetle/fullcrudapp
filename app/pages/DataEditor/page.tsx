import React from "react";
import Editorview from "../../components/Editorview";
import Link from "next/link";
export default function page(props) {
    return (
        <div className="pagescreen" style={{height:"100dvh"}}>
            <Editorview/> 
        </div>
    );
}