import React from "react";
import Creatorview from "../../components/Creatorview";


const page = (props: any) => {
    if (!props) {
        throw new Error("props is null or undefined");
    }
    return (
        <div className="pagescreen" style={{height:"100dvh"}}>
            <Creatorview/> 
        </div>
    );
}

export default page;