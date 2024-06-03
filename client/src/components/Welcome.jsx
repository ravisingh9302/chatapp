import Robot from "../assets/robot.gif";
import { useSelector } from "react-redux";

export default function Welcome() {
  const { currentUser } = useSelector(state => state.Auth)

  return (
    <div className="flex justify-center items-center  h-full rounded-r-lg">

      <div className="flex  items-center text-white flex-col font-semibold text-lg ">
        <img width={300} src={Robot} alt="robot" />
        <h1>
          Welcome, <span className="text-blue-600 text-3xl">{currentUser?.username}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </div>
    </div>
  );
}

