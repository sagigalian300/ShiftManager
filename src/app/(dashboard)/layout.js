import Navbar from './../../components/UI/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar/Nav only appears for routes inside (main) */}
      <Navbar /> 
      
      <div className="flex-1 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}