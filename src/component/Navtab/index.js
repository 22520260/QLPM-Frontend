import React, { useState } from 'react';


function Navtab({ tabsData }) {
    const [activeTab, setActiveTab] = useState(0); 

    const handleTabClick = (index) => {
        setActiveTab(index); 
    };

    return (
        <>
            <div className='px-4'>
                <div>
                    <ul className="nav nav-tabs">
                        {tabsData.map((tab, index) => (
                            <li className="nav-item" key={index}>
                                <a
                                    className={`nav-link ${activeTab === index ? 'active' : ''}`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    {tab.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="tab-content">
                    {tabsData.map((tab, index) => (
                        <div
                            key={index}
                            className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                        >
                            {tab.component && <tab.component />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Navtab;