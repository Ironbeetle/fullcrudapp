"use client";
import React from "react";
import View from "../../components/SearchBar";
import Link from "next/link";
const Page: React.FC = (props) => {
    if (!props) {
        throw new Error("props is null or undefined");
    }
    return (
        <div className="pagescreen" style={{height:"100dvh"}}>
            <View onSearch={(query) => console.log(query)} />
        </div>
    );
}
export default Page