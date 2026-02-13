

function DashboardCard() {

  return (
    <div className="bg-bg2 w-full max-w-sm rounded-t-[30px] shadow-lg flex flex-col h-[80%]">
      
        {/* Card of Task Container */}
        <div className="border-b border-gray-600 p-6 text-center">
            <h3 className="text-lg font-semibold text-txt ">Bare Minimun Tasks</h3>
            <p className="italic text-sm text-txt">"Just enough to survive."</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
            <p className="text-lg text-black mb-2">“Empty. As intended.”</p>
            <div className="text-2xl font-light">
                {/* This mimics the kaomoji in your design */}
                <p>&lt;(￣︶￣)&gt;</p>
            </div>
        </div>
    </div>
  )
}

export default DashboardCard;