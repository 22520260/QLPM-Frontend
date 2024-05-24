import React, { useState } from 'react';

function Navtab({ tabsData }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const renderActiveTabContent = () => {
        const ActiveComponent = tabsData[activeTab].component;
        return <ActiveComponent />;
    };

    return (
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

            <div className="tab-content border border-primary">
                {renderActiveTabContent()}
            </div>
        </div>
    );
}

export default Navtab;
