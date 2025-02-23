const Searchbar = () => {
  return (
    <>
      <div className = 'ml-[4rem] mt-[2rem] space-y-5'>
        <div className = 'mb-[3rem] w-[10rem]'>
            <h1 className = 'font-lato text-4xl'>Tools</h1>
            <h1 className = 'font-lato text-4xl'>& Craft</h1>
            <div className = 'mt-[1rem]'>
                <div className = 'font-light text-xs'>Thoughts on the future </div>
                <div className = 'font-light text-xs'>from the people and</div>
                <div className = 'font-light text-xs'>teams creating it</div>
            </div>
        </div>

        <div className = 'flex flex-col font-light'>
            <a href = "" className = 'hover:text-blue-600 h-[2rem] rounded-md pl-[1rem] hover:bg-gray-100'>Latest</a>
            <a href = "" className = 'hover:text-blue-600 h-[2rem] rounded-md pl-[1rem] hover:bg-gray-100'>Notion HQ</a>
            <a href = "" className = 'hover:text-blue-600 h-[2rem] rounded-md pl-[1rem] hover:bg-gray-100'>For Teams</a>
            <a href = "" className = 'hover:text-blue-600 h-[2rem] rounded-md pl-[1rem] hover:bg-gray-100'>Tech</a>
            <a href = "" className = 'hover:text-blue-600 h-[2rem] rounded-md pl-[1rem] hover:bg-gray-100'>Inspiration</a>
        </div>
      </div>
        
    </>
  )
}

export default Searchbar
