const AppointmentTable = ({
    data
}) => {
    let counter = 0;
    return (
        <table className="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Address</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            {data.map(x =>
                <tbody key={x.id}>
                    <tr>
                        <th scope="row">{++counter}</th>
                        <td>{x.data.doctorName}</td>
                        <td>{x.data.address}</td>
                        <td>{x.data.date} - {x.data.hour}</td>
                        <td>{x.data.status}</td>
                    </tr>
                </tbody>
            )}

        </table>
    )
}

export default AppointmentTable;