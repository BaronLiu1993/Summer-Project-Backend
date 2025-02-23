import Background from '../assets/500_Page.svg'

const InternalError = () => {
  return (
    <div 
    className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    style={{
        backgroundImage: `url(${Background})`,
      }}>
      
    </div>
  )
}

export default InternalError
