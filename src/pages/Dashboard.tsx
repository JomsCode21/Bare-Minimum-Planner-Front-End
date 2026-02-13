import logo from "../assets/BMP_logo.png";
import DashboardCard from "@/utils/DashboardCard";
import ButtomNav from "@/components/ButtomNav";

function Dashboard() {
    return(
        <div className="bg-linear-to-t from-primary to-bg2 h-screen flex flex-col relative overflow-hidden">

            {/* This is for header section */}
            <header className="flex items-center justify-between px-6 pt-4 pb-8 mt-10">
                {/* Small Logo Div */}
                <div className="bg-bg/20 p-2 rounded-full border border-white">
                    <img src={logo} alt="Bare Minimum Logo" className="w-20 h-20 object-contain" />
                </div>

                {/* Greeting header */}
                <div className="text-right">
                    <p className="text-sm text-txt/800">Ready to barely conquer today?</p>
                    <h2 className="font-bold text-lg text-txt text-center">Jhumari ツ</h2>
                </div>
            </header>

            {/* Dashboard */}
            <div className="flex-1 flex flex-col items-center px-6 mt-4">
                <DashboardCard/>
            </div>

            {/* Nav buttons */}
            <ButtomNav/>
        </div>
    );
}

export default Dashboard;