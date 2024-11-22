'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import KTClogoL from "../../public/KTClogoL.jpg"
const Openlogo = () => {
   
    return (
        <div className="pagescreen">
            <div className='flexpanel' style={{height:"100dvh"}}>
                <Image
                    src={KTClogoL}
                    alt="KTClogo"
                    width={323}
                    height={182}
                    priority={true}
                    style={{objectFit: "contain"}}
                    quality={100}
                />
                <div className="apptexth1">
                    <h1>Keewatin Tribal Council Inc.</h1>
                </div>
                <div>
                <Link href="/pages/HomePage"
                    className='btn-link'
                >
                    <div className='apptextp'>
                        <p>Enter</p>
                    </div>
                </Link>
                </div>
            </div>
        </div>
    )
}
export default Openlogo;
