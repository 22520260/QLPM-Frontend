import React, { useState } from 'react';

function Navtab() {
    const [activeTab, setActiveTab] = useState('tab1'); // State để lưu trạng thái của tab đang được chọn

    // Chọn tab
    const handleTabClick = (tab) => {
        setActiveTab(tab); // Cập nhật trạng thái của tab đang được chọn
    };

    return (
        <>
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`}
                            onClick={() => handleTabClick('tab1')}
                        >
                            Tab 1
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}
                            onClick={() => handleTabClick('tab2')}
                        >
                            Tab 2
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`}
                            onClick={() => handleTabClick('tab3')}
                        >
                            Tab 3
                        </a>
                    </li>
                </ul>
            </div>

            {/* Nội dung của tab */}
            <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 'tab1' ? 'show active' : ''}`}>
                    <h3>Tab 1 Content</h3>
                    <p>This is the content of tab 1.</p>
                </div>
                <div className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''}`}>
                    <h3>Tab 2 Content</h3>
                    <p>This is the content of tab 2.</p>
                </div>
                <div className={`tab-pane fade ${activeTab === 'tab3' ? 'show active' : ''}`}>
                    <h3>Tab 3 Content</h3>
                    <p>This is the content of tab 3.</p>
                </div>
            </div>
        </>
    );
}

export default Navtab;