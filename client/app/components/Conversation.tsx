
function Conversation() {



  return (
    <div className="flex-1 bg--400 pb-16 md:pb-0">
                {/* Conversation content goes here */}
        <div className="h-full flex flex-col">
            <div className="h-16 bg-slate-900 p-4">Chat Header</div>
            <div className="flex-1 p-4">Messages</div>
            <div className="h-20 bg-slate-900 p-4">Input</div>
        </div>
        
    </div>
  )
}

export default Conversation