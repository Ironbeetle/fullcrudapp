"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {countCategory, countTopic } from '@/app/api/items/actions';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Link from "next/link";


interface PageProps {
        children?: React.ReactNode;
    }
    interface Item {
        topic: string;
        count: number;
      }

export default function page(props: PageProps) {
   
    const [activeTab, setActiveTab] = useState(1);
    const queryClient = useQueryClient();
    
    const { data: items = [] as Item[]} = useQuery({
        queryKey: ['post'],
        queryFn: countTopic,
    });
   
    let lptChart: { topic: string, count: number }[] = [];

    if (Array.isArray(items)) {
        lptChart = items.map((item: any) => ({
            topic: item.topic,
            count: item.count,
        }));
    }

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

    const ShowTopicList = () => {
        
        return(
            <>
            <div className="apptexth1 flexpanel">
                <h1>Lessons per Topic List</h1>
            </div>
            {items.map((item: any) => (
                <div className="flexpanelR" key={item.topic}>
                    <div className="flexpanel">
                        <h1 className="apptextB">{item.topic}:&nbsp;&nbsp;&nbsp;</h1>
                    </div>
                    <div className="flexpanel">
                        <h1 className="apptxth1">{item.count}</h1>
                    </div>
                </div>
            ))}
            </>
        )
    }

  

    return(
        <div className="pagescreen">
            <div className="backbtn">
                <Link href="/pages/HomePage">
                    <div className="backbtn">
                        <button>Back</button>
                    </div>
                </Link>
            </div>
            <div className="row1fr2fr" style={{width:"100%", height:"100%"}}>
                <div className="flexpanelc">
                    <div className='itempanel' style={{marginBottom:"5%"}}>                         
                        <button className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}
                            style={{width: '100%', height: '100%'}}
                        >
                            <h1 className='apptextB'>Topic Count Chart</h1>
                        </button>
                    </div>

                    <div className='itempanel' style={{marginBottom:"5%"}}>                         
                        <button className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}
                            style={{width: '100%', height: '100%'}}
                        >
                            <h1 className='apptextB'>Lesson per Topic List</h1>
                        </button>
                    </div>

                </div>
                <div className="itempanel" style={{width:"100%", height:"100%"}}>
                    {activeTab === 1 && lessonpertopic()}
                    {activeTab === 2 && ShowTopicList()}

                </div>
            </div>
            
        </div>
    )
}