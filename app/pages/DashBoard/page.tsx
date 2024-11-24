import React from "react";
import DashBoardview from "../../components/Dashboardview";


const page = (props: any) => {
    if (!props) {
        throw new Error("props is null or undefined");
    }
    return (
        <div className="pagescreen" style={{height:"100dvh"}}>
            <DashBoardview/> 
        </div>
    );
}

export default page;