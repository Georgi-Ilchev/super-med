import AppointmentTable from './AppointmentTable/AppointmentTable.js';

const Appointments = () => {

  return (
    <section>
      <h1 style={style.appointmentTable} className='text-center'>Your Appointments</h1>
      <div>
        <AppointmentTable />
      </div>
    </section>
  );
}

export default Appointments;

const style = {
  appointmentTable: {
    marginTop: '30px',
    marginBottom: '30px',
  }
}