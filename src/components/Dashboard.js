import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div>
      <h1>پنل مدیریت رستوران</h1>
      <button onClick={handleLogout}>خروج</button>
      {/* محتوای مدیریتی اینجا قرار میگیرد */}
    </div>
  );
}

export default Dashboard;