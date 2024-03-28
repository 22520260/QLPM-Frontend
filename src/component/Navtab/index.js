import React, { useState } from 'react';
import { IFInputText, IFSelect, IFNgaySinh} from '../Layout/TabLayout/InputForm';

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
                            <div>
                                <div className='px-3 py-2 bg-primary'>
                                    Thông tin
                                </div>
                                <div className='mt-2'>
                                    <div className="container-fluid mb-2">
                                        <div className="row py-2">
                                            <IFInputText title={"Họ và Tên"} size={4} />
                                            <IFSelect title={"Giới tính"} size={2} option={["Nam", "Nữ", "Khác"]} />
                                            <IFInputText title={"Địa chỉ"} size={6} />
                                        </div>
                                        <div className='row py-2'>
                                            <IFNgaySinh />
                                            <IFInputText title={"CCCD"} size={2} />
                                            <IFInputText title={"Số điện thoại"} size={4} />
                                            <IFInputText title={"Số điện thoại người thân"} size={4} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Navtab;