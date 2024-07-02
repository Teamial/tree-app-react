import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("auth"));
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1 className="">Welcome to TreeTalk!</h1>
    </div>
  );
}
export default Home;
