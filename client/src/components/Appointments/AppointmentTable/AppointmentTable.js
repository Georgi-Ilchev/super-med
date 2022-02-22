const AppointmentTable = ({
    data
}) => {
    return (
        <table className="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Patient</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Hospital</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Test</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@24.02.1998</td>
                    <td>Ended</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@24.02.1999</td>
                    <td>Ended</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@24.02.1978</td>
                    <td>Active</td>
                </tr>
            </tbody>
        </table>
    )
}

export default AppointmentTable;