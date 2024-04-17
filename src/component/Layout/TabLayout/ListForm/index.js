import React from 'react';

function ListForm({ columns, data }) {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} scope="col">{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>
                                {column.render ? column.render(row) : row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListForm;
