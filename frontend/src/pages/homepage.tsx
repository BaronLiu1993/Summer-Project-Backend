import PopularPostCard from "../components/homepage/PopularPostCard"
import BlogItem from "../components/homepage/BlogItem"
import HomepageMS from "../components/homepage/HomepageMS"
import HomepageAbout from "../components/homepage/HomepageAbout"

const homepage = () => {
  return (
    <>
      <PopularPostCard />
      <HomepageAbout />
      <HomepageMS />
      <BlogItem />
    </>
  )
}

export default homepage
