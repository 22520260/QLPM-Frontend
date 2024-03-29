import React, { useState } from 'react';


function Navtab({ tabsData }) {
    const [activeTab, setActiveTab] = useState(0); // State để lưu trạng thái của tab đang được chọn

    // Chọn tab
    const handleTabClick = (index) => {
        setActiveTab(index); // Cập nhật trạng thái của tab đang được chọn
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

                {/* Nội dung của tab */}
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