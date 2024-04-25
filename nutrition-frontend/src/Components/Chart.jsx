import { Tooltip } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';



const Chart = ({data}) => {
  return (
    <div className='w-3/4 h-[50vh] mx-auto'>
        <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 15, bottom: 65 }}>
                <XAxis dataKey="date" angle={-90} textAnchor='end' />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <YAxis />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <Tooltip/>
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default Chart
