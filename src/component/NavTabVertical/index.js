import React, { useState } from "react";

function NavTabVertical({ tabsData }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const renderActiveTabContent = () => {
    const ActiveComponent = tabsData[activeTab].component;
    return <ActiveComponent />;
  };
  const urlImg = 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'


  return (
    <div className="container-fluid p-0">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 p-0">

          <ul className="nav flex-column nav-pills">
            {tabsData.map((tab, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${activeTab === index ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="col-md-10 px-4">
          <div className="tab-content">{renderActiveTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default NavTabVertical;
