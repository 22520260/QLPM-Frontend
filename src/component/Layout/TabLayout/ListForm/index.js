function ListForm({ customers }) {
    return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Info</th>
                        <th scope="col">Bill</th>
                        <th scope="col">Status</th>
                        <th scope="col">Khác</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <th scope="row">{customer.id}</th>
                            <td>{customer.name}</td>
                            <td>
                                <div>{customer.info.age} - {customer.info.gender}</div>
                                <div>{customer.info.phone}</div>
                            </td>
                            <td>{customer.bill}</td>
                            <td>{customer.status}</td>
                            <td>{customer.other}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
}
export default ListForm;
