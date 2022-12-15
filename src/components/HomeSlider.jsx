import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebase.config"
import {Navigation, Pagination, Scrollbar, Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/autoplay'
import Spinner from "./Spinner"


function HomeSlider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'),
      limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

    setListings(listings)
    setLoading(false)
    }

    fetchListings()
  }, [])

  if(loading) {
    return <Spinner />
  }

  if(listings.length === 0) {
    return <></>
  }

  return listings && (
    <>
    <p className="exploreHeading">Recommended</p>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        slidesPerView={1} pagination={{clickable: true}} autoplay={{delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true}}>
          {listings.map(({data, id}) => (
            <SwiperSlide key={id} 
                        onClick={() => navigate(`/category/${data.type}/${id}`)}>
              <div 
                style={{
                  background: `url(${data.imageUrls[0]}) 
                  center no-repeat`,
                  backgroundSize: 'cover',
                  minHeight: "20rem",
                  borderRadius: '1.5rem', 
                  width: '90vw',
                  height: '30vh',
                  margin: 'auto',
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  €{data.discountedPrice ?? data.regularPrice}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}

export default HomeSlider