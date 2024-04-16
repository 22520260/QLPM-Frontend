function ListForm({ customers }) {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => ( // Đảo ngược thứ tự tham số trong map
                    <tr key={index}>
                        <th scope="row">{customer[0]}</th> {/* ID */}
                        <td>{customer[1]}</td> {/* Name */}
                        <td>{customer[2]}</td> {/* Phone */}
                        <td>{customer[3]}</td> {/* Address */}
                        <td>{customer[4]}</td> {/* City */}
                        <td>{customer[5]}</td> {/* State */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListForm;
