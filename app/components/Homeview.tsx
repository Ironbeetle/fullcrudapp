"use client";
import React from 'react';
import Link from 'next/link';

export default function page(props){
    
    return (
        <div className='pagescreen'> 
            <div className='flexpanel' style={{height:"100dvh"}}>
                <div className='flexpanelR' style={{width:"100vw"}}>
                    <div className='btn-menu'>
                        <Link 
                            href='/pages/DataEditor'
                            style={{textDecoration:'none',width:"100%", height:"100%"}}
                        >
                            <div className="apptexth1">
                                <h1>Edit Items</h1>
                            </div>
                        </Link>
                    </div>
                    <div className='btn-menu'>
                        <Link 
                            href='/pages/Viewer'
                            style={{textDecoration:'none',width:"100%", height:"100%"}}
                        >
                            <div className="apptexth1">
                                <h1>Viewer</h1>
                            </div>
                        </Link>
                    </div>
                    <div className='btn-menu'>
                        <Link 
                            href='/pages/DashBoard'
                            style={{textDecoration:'none',width:"100%", height:"100%"}}
                        >
                            <div className="apptexth1">
                                <h1>Dashboard</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flexpanel'>
                 
                </div>
            </div>
        </div>
    );
}
