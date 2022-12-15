import { getAuth, updateProfile } from "firebase/auth"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { updateDoc, doc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem'



function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  // initial stuff
  // const [user, setUser] = useState(null)
  // useEffect(() => {
  //   setUser(auth.currentUser)
  // }, [])

  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async() => {
      const listingsRef = collection(db, 'listings')

      const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid))

      const querySnap = await getDocs(q)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])


  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  
  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        // Update display name in db
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }

    } catch (error) {
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,

    }))
  }

  const onDelete = async (listingId) => {
    if(window.confirm('Are you sure you wante to delete this item?')) {
    await deleteDoc(doc(db, 'listings', listingId))
    const updatedListings = listings.filter((listing)=> 
    listing.id !== listingId)
    setListings(updatedListings)
    toast.success('Successfully deleted item!', {position: 'top-center'})
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My profile</p>
      <button type="button" className="logOut" onClick={onLogout}>Log Out</button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText ">Personal Details</p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !(prevState))
        }}>
          {changeDetails ? 'This looks good' : 'Change profile details'} 
        </p>
      </div>

      
      <div className="profileCard">
        <form >
          <input 
            type="text" 
            id="name" 
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />

          <input 
            type="text" 
            id="email" 
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
          />
        </form>
        
      </div>

      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt="home" className="homeIcon"/>
        <p>Have something for sale/rent?</p>
        <img src={arrowRight} alt="arrow right" />
      </Link>

      {!loading && listings?.length > 0 && (
        <>
          <p className="listingText">Your listings</p>
          <ul className="listingsList">
            {listings.map((listing) => (
              <ListingItem 
                key={listing.id} 
                listing={listing.data} 
                id={listing.id} 
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}                
              />
            ))}
          </ul>
        </>
      )}

    </main>
  </div>
}

export default Profile