import Background from '../assets/Background 6.svg';

const PopularPostCard = () => {
  return (
    <>
      <div
        className='flex items-center justify-center w-full h-[40rem]'
        style={{
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center center', 
          backgroundBlendMode: 'overlay',
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Background})`,

        }}
      >
        
        <div className="flex flex-col justify-center items-center font-lato text-center p-4 rounded bg-slate-300 opacity-70" style={{ maxWidth: '100%', maxHeight: '100%' }}>
          <div className='text-6xl text-gradient-to-r from-blue-400 to-blue-700 font-extrabold m-[2rem] tracking-wider' >
            Write, Plan, Organize, Play
          </div>
          <div className='text-2xl font-bold'>
            Turn ideas into action
          </div>
          <div className='text-2xl font-bold'>
            with Notion's AI-powered workspace
          </div>

          <div className="flex space-x-3 justify-center items-center m-[2rem]">
            <button className="bg-blue-400 text-white w-[8rem] rounded-sm">
              Get Notion Free
            </button>
            <button className='text-blue-400'>
              Request a demo →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularPostCard;
