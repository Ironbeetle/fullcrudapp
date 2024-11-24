import React from "react";
import Editorview from "../../components/Editorview";
import Link from "next/link";
const Page: React.FC = (props) => {
    if (!props) {
        throw new Error("props is null or undefined");
    }
    return (
        <div className="pagescreen" style={{height:"100dvh"}}>
            <Editorview/> 
        </div>
    );
}
export default Page