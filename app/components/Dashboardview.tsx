"use client";
import React, { useEffect, useState } from "react";
import { useQuery} from '@tanstack/react-query';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Link from "next/link";
export default function page(props){
   
    const [activeTab, setActiveTab] = useState(1);
   
    const lptChart = [
        { topic: "sacredteachings", count: 19 },
        { topic: "sacrednature", count: 6 },
        { topic: "ceremony", count: 4 },
        { topic: "naturallaws", count: 4 },
        { topic: "socialmanners", count: 4 },
        { topic: "socialroles", count: 3 },
      ];

    const lpcChart = [
        {category:"sacred",count:25},
        {category:"natlaws",count:12}, 
    ]

    const lessonpertopic = () => {
        return(
            <>
            <div className="apptexth1 flexpanel">
                <h1>Lessons per Topic</h1>
            </div>
            <ResponsiveContainer width="80%" height="70%">
                <BarChart
                        width={500}
                        height={300}
                        data={lptChart}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <Bar dataKey="count" fill="#80000A" />
                        <XAxis dataKey="topic" />
                        <YAxis dataKey="count" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }


    const lessonpercategory = () => {
        return(
            <>
                <div className="apptexth1 flexpanel">
                    <h1>Lessons per Category</h1>
                </div>
                <ResponsiveContainer width="80%" height="70%">
                <BarChart
                        width={500}
                        height={300}
                        data={lpcChart}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <Bar dataKey="count" fill="#80000A" />
                        <XAxis dataKey="category" />
                        <YAxis dataKey="count" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }

    return(
        <div className="pagescreen">
            <div className="backbtn">
                <Link href="/pages/HomePage">
                    <div className="backbtn">
                        <p>Back</p>
                    </div>
                </Link>
            </div>
            <div className="row1fr2fr" style={{width:"100%", height:"100%"}}>
                <div className="flexpanelc">
                    <div className='itempanel' style={{marginBottom:"5%"}}>                         
                        <button className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}
                            style={{width: '100%', height: '100%'}}
                        >
                            <h1 className='apptextB'>Lesson Per Topic</h1>
                        </button>
                    </div>

                    <div className='itempanel' style={{marginBottom:"5%"}}>                         
                        <button className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}
                            style={{width: '100%', height: '100%'}}
                        >
                            <h1 className='apptextB'>Lesson Per Category</h1>
                        </button>
                    </div>

                </div>
                <div className="itempanel" style={{width:"100%", height:"100%"}}>
                    {activeTab === 1 && lessonpertopic()}
                    {activeTab === 2 && lessonpercategory()}
                </div>
            </div>
            
        </div>
    )
}