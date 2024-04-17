const data = [
    { id: 1, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 2, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 3, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 4, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 5, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 6, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 7, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 8, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 9, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 10, date: "2024-05-14", info: { name: "Sarah", age: 45, gender: "Female", phone: "111111111" }, content: "Ut labore et dolore magna aliqua", doctor: "BS. Sarah Johnson", status: "đã hủy" },
    { id: 11, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 12, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 13, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 14, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 15, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 16, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 17, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 18, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 19, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 20, date: "2024-05-14", info: { name: "Sarah", age: 45, gender: "Female", phone: "111111111" }, content: "Ut labore et dolore magna aliqua", doctor: "BS. Sarah Johnson", status: "đã hủy" },
    { id: 21, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 22, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 23, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 24, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 25, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 26, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 27, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 28, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 29, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 30, date: "2024-05-14", info: { name: "Sarah", age: 45, gender: "Female", phone: "111111111" }, content: "Ut labore et dolore magna aliqua", doctor: "BS. Sarah Johnson", status: "đã hủy" },
    { id: 31, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 32, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 33, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 34, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 35, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 36, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 37, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 38, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 39, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 40, date: "2024-05-14", info: { name: "Sarah", age: 45, gender: "Female", phone: "111111111" }, content: "Ut labore et dolore magna aliqua", doctor: "BS. Sarah Johnson", status: "đã hủy" },
    { id: 41, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 42, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 43, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 44, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 45, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 46, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 47, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 48, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
    { id: 49, date: "2024-04-16", info: { name: "James", age: 40, gender: "Male", phone: "555555555" }, content: "Sed do eiusmod tempor incididunt", doctor: "BS. James Smith", status: "hoàn thành" },
    { id: 50, date: "2024-05-14", info: { name: "Sarah", age: 45, gender: "Female", phone: "111111111" }, content: "Ut labore et dolore magna aliqua", doctor: "BS. Sarah Johnson", status: "đã hủy" },
    { id: 51, date: "2024-04-14", info: { name: "John", age: 25, gender: "Male", phone: "123456789" }, content: "Lorem ipsum dolor sit amet", doctor: "BS. John Doe", status: "chờ xác nhận" },
    { id: 52, date: "2024-04-15", info: { name: "Jane", age: 30, gender: "Female", phone: "987654321" }, content: "Consectetur adipiscing elit", doctor: "BS. Jane Doe", status: "đã xác nhận" },
];
  

export function getData(page, limit) {
    let array = [];
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, data.length);
    for (let i = startIndex; i < endIndex; i++) {
        array.push(data[i]);
    }
    return array;
}


export function getLength() {
    return data.length;
}

