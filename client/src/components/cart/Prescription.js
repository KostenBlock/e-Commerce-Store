import React from "react";

const Prescription = () => {
    return (
        <thead>
        <tr>
            <th scope="col" className="border-0 bg-light">
                <div className="p-2 px-3 text-uppercase">Товар</div>
            </th>
            <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Цена</div>
            </th>
            <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Количество</div>
            </th>
            <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Удалить</div>
            </th>
        </tr>
        </thead>
    )
};

export default Prescription;