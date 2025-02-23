import Background from '../assets/Background 8.svg';

const HomepageAbout = () => {
  return (
    <div
      className='flex flex-col items-center w-full h-[50rem]'
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center right', 
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className='flex flex-col items-start m-[6rem]'>
        <h1 className='text-6xl font-bold'>Start with a template</h1>
        <h1 className='text-6xl font-bold'>Build anything</h1>
        <button className='text-blue-400 text-xl font-bold'>Browse all templates →</button>
      </div>

      <div className='flex justify-center space-x-5'>
        <div className='bg-gray-200 h-[32rem] w-[20rem] flex flex-col justify-center space-y-1 items-center rounded-lg'>
          <div className='bg-white rounded-full h-[5rem] w-[5rem]'></div>
          <h1 className = "font-lato bg-yellow-200 p-2 rounded-md">University of Waterloo</h1>
          <h1 className = "font-light">Software + Mechatronics + Electrical Engineering</h1>
          <h1 className = "font-light">Computer Science</h1>
          <h1 className = "font-light">Accounting and Financial Management (AFM)</h1>

        </div>
        <div className='grid grid-cols-2 gap-4'>
        <div className="bg-gray-200 flex flex-col justify-center space-y-1 items-center h-[10rem] w-[15rem] rounded-lg">
                <div className = 'bg-white rounded-full h-[5rem] w-[5rem]'>

                </div>
                <h1 className = "bg-red-200 p-2 font-lato">
                  Harvard University
                </h1>
                <h1 className = "font-light">
                  Computer Science
                </h1>
              </div>
              <div className="bg-gray-200 flex flex-col justify-center space-y-1 items-center h-[10rem] w-[15rem] rounded-lg">
                <div className = 'bg-white rounded-full h-[5rem] w-[5rem]'>

                </div>
                <h1 className = "bg-blue-200 p-2 font-lato">University of Toronto</h1>
                <h1 className = "font-light">Engineering Science</h1>
              </div>
              <div className="bg-gray-200 flex flex-col justify-center space-y-1 items-center h-[10rem] w-[15rem] rounded-lg">
                <div className = 'bg-white rounded-full h-[5rem] w-[5rem]'>

                </div>
                <h1 className = "bg-purple-200 p-2 font-lato">University of Western Ontario</h1>
                <h1 className = "font-light">Ivey School of Business</h1>
              </div>
              <div className="bg-gray-200 flex flex-col justify-center space-y-1 items-center h-[10rem] w-[15rem] rounded-lg">
                <div className = 'bg-white rounded-full h-[5rem] w-[5rem]'>

                </div>
                <h1 className = "bg-red-200 p-2 font-lato">McMaster University</h1>
                <h1 className = "font-light">Health Science</h1>
              </div>
              <div className="bg-gray-200 flex flex-col justify-center space-y-1 items-center h-[10rem] w-[15rem] rounded-lg">
                <div className = 'bg-white rounded-full h-[5rem] w-[5rem]'>

                </div>  
                <h1 className = "bg-red-200 p-2 font-lato">Queens University</h1>
                <h1 className = "font-light">Commerce + Health Science</h1>
              </div>
              <div className="bg-gray-200 flex flex-col justify-center space-y-1 items-center h-[10rem] w-[15rem] rounded-lg">
                <div className = 'bg-white rounded-full h-[5rem] w-[5rem]'>

                </div> 
                <h1 className = "bg-yellow-200 p-2 font-lato">Toronto Metropolitan U</h1>
                <h1 className = "font-light">Computer Engineering</h1>
              </div>

        </div>
      </div>
    </div>
  );
};

export default HomepageAbout;
