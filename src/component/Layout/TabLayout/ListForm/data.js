const customers = [
    { id: 1, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 2, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 3, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 4, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 5, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 6, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 7, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 8, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 9, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 10, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 11, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 12, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 13, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 14, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 15, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 16, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 17, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 18, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 19, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 20, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 21, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 22, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 23, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 24, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 25, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 26, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 27, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 28, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 29, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 30, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 31, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 32, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 33, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 34, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 35, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 36, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 37, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 38, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 39, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 40, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 41, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 42, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 43, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 44, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 45, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 46, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
    { id: 47, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 48, name: 'Jacob', info: { age: 35, gender: 'Male', phone: '987654321' }, bill: 200, status: 'Hoàn thành', other: 'Detail 2' },
    { id: 49, name: 'Larry the Bird', info: { age: 25, gender: 'Female', phone: '555555555' },  bill: 0, status: 'Hủy', other: 'Detail 3' },
    { id: 50, name: 'Mark', info: { age: 30, gender: 'Male', phone: '123456789' }, bill: 100, status: 'Chờ khám', other: 'Detail 1' },
];

export function getCustomer(page, limit) {
    let array = [];
    for (let i = (page-1) * limit; i < (page * limit); i++) {
        array.push(customers[i]);
    }
    return array;
}

export function getLength() {
    return customers.length;
}

