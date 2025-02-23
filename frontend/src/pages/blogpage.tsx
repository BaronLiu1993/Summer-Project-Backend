import Blogcomponent from '../components/blogpages/Blogcomponent';
import Searchbar from '../components/blogpages/Searchbar';

const blogpage = () => {
  return (
    <>
        <div className = 'flex'>
            <Searchbar />
            <Blogcomponent />
        </div>
    </>
  )
}

export default blogpage
