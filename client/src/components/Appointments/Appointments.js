import { Calendar } from 'antd';
import { useCallback } from 'react';

// styles
import "antd/dist/antd.css";

const Appointments = () => {

  const clieckedDate = useCallback((value) => {
    alert(`Your selected ${value.format('YYYY-MM-DD')}`)
  }, []);

  return (
    <div style={style.centerCalendar}>
      <h4>ReactJS Ant-Design Calendar Component</h4>
      <Calendar onChange={clieckedDate}
      />
    </div>
  );
}

export default Appointments;


const style = {
  centerCalendar: {
    display: 'block',
    width: '90%',
    padding: 30,
    margin: "auto"
  },
}