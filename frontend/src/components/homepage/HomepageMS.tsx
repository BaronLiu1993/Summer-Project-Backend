import Eng from '../assets/Engineering_Icon.svg';
import Health from '../assets/Health_Icon.svg';
import Commerce from '../assets/Business_Icon.svg';
import CS from '../assets/CS_icon.svg';
import Background from '../assets/Background 6.svg'; 

const HomepageMS = () => {
  return (
    <div
      className='flex flex-col font-lato justify-center items-center'
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Background})`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        padding: '2rem',
      }}
    >
      <div className='flex'>
        <div className='m-[2rem] space-y-4'>
          <h1 className='font-extrabold text-4xl bg-gradient-to-r from-blue-500 to-red-400 bg-clip-text text-transparent'>
            Explore Our Extensive Catalogue
          </h1>
          <h1 className='font-thin'>Get Advice About How To Get Into Your Dream University From Actual Students</h1>
          <button className='rounded-sm bg-blue-400 text-white p-[0.2rem]'>Explore Our Blogs</button>
        </div>
        <div>
          <div className='flex space-x-5 m-[3rem]'>
            <button className='rounded-xl w-[8rem] h-[8rem] flex border-2 border-black flex-col bg-purple-300 justify-center items-center'>
              <img className='w-[10rem] h-[5rem]' src={Eng} alt='Engineering' />
              <h1 className='text-white'>Engineering</h1>
            </button>
            <button className='rounded-xl w-[8rem] h-[8rem] bg-red-400 border-2 border-black flex flex-col justify-center items-center'>
              <img className='w-[10rem] h-[5rem]' src={Health} alt='Health Science' />
              <h1 className='text-white'>Health Science</h1>
            </button>
            <button className='rounded-xl w-[8rem] bg-yellow-400 h-[8rem] border-2 border-black flex flex-col justify-center items-center'>
              <img className='w-[10rem] h-[5rem]' src={CS} alt='CS' />
              <h1 className='text-white'>CS</h1>
            </button>
            <button className='rounded-xl w-[8rem] bg-blue-400 h-[8rem] border-2 border-black flex flex-col justify-center items-center'>
              <img className='w-[10rem] h-[5rem]' src={Commerce} alt='Commerce' />
              <h1 className='text-white'>Commerce</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageMS;
