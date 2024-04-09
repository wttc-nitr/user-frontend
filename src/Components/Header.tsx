import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 text-center h-auto shadow-lg w-full">
      <Link to={'/'}>
        <span className="inline-block p-4 text-xl" onClick={() => {
          localStorage.removeItem('token')
        }}
        >
          Course-Selling App
        </span>
      </Link>
    </div>
  )
};

export default Header;