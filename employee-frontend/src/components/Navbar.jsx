import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto p-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Employee CRUD
        </Link>
        <div>
          <Link to="/add" className="bg-blue-500 text-white px-3 py-1 rounded">
            Add Employee
          </Link>
        </div>
      </div>
    </nav>
  );
}
