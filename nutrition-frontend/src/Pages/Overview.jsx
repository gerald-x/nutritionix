import { useSelector } from "react-redux";
import { Dashboard, BmiCalculator } from "../Components";

const Overview = () => {
  const { accessToken, refreshToken } = useSelector(state => state.appData)
    
  console.log(accessToken, refreshToken)
  return (
    <>
      <Dashboard>
        <BmiCalculator/>

      </Dashboard>
    </>
  );
};

export default Overview;
