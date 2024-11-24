import React from "react";
import Homeview from "../../components/Homeview";


const page: React.FC = (props) => {
    if (!props) {
        throw new Error("props is null or undefined");
    }
    return (
        <div className="pagescreen" style={{height:"100dvh"}}>
            <Homeview/> 
        </div>
    );
}

export default page;