"use server";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

const Page: React.FC = async(props) => {
    if (!props) {
        throw new Error("props is null or undefined");
    }
    
    const video = await prisma.post.findMany(
        { orderBy: { id: 'desc' } }
    );
   
    return(
        <div className="pagescreen">
            <div className="backbtn">
                <Link href="/pages/HomePage">
                    <div className="backbtn">
                        <p>Back</p>
                    </div>
                </Link>
            </div>
            <div className='pagescroll' style={{height:"100dvh"}}>
                <div className="flexpanel">
                    {video &&video.map((vid) => (
                        <div key={vid.id} style={{padding:"1rem"}}>
                            <div className="listpanel" style={{marginBottom:"2rem"}}>
                                <div className="flexpanelR" style={{width:"100%"}}>
                                    <div>
                                        <Image 
                                            src={vid.thumbimg} 
                                            alt="iconimg" 
                                            width={300} 
                                            height={300}
                                        />
                                    </div>
                                    <div className="flexpanel" style={{width:"600px"}}>
                                  
                                        <Link href={'/pages/Viewer/' + vid.id}
                                            className='btn-link apptexth2 flexpanel' 
                                            style={{height:"100%", width:"100%"}}
                                        >
                                            <h2>{vid.title}</h2>
                                            <h2>{vid.subtitle}</h2>
                                        </Link>
                                    </div>
                                    <div>
                                        <Image 
                                            src={vid.thumbnail} 
                                            alt="teacherimg" 
                                            width={300} 
                                            height={300}
                                            style={{justifySelf:"flex-end"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Page;
