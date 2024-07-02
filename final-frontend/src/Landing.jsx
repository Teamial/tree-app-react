import { Link } from "react-router-dom";

function Landing() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center">Tree Talk</h1>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-4 py-1 text-white bg-blue-500 rounded-md">
            login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-1 text-white bg-blue-500 rounded-md">
            signup
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Landing;
