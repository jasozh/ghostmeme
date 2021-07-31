import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getLocalUser } from '../services/userService'
import { searchMemes } from '../services/memeService'
import { redirect } from '../services/userService'



export const Stories1 = ({user}) => {
  // const [user, setUser] = useState({ loading: true })
  useEffect(() => { redirect(user) }, [user])
  const [UsersMemesArray, setUserMemesArray] = useState([])
  const [valid, setValid] = useState(false)

  // useEffect(() => {
  //   const updateUser = async () => { setUser(await getLocalUser()) }
  //   updateUser()
  // }, [])



// 
const GetsUsersMemes = async () => { 
  try { 
  setUserMemesArray(await searchMemes({owner:user.user_id}))
  setValid(true)
   console.log('got it!')
 }
  catch{
    console.log('error!')
  }
 }
const mapper = (ix) => { 
  return (
  
  
    <article className="Post" >
            <header>
              <div className="Post-user">
                <div className="Post-user-profilepicture">
                  <img src={ix.imageUrl} alt="Me and my Friends" />
                  <p>{ix.description}</p>
                </div>
                <div className="Post-user-nickname">
                  <span>{ix.username}</span>
                </div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
                <img alt="Icon Living" src={ix.imageUrl} />
              </div>
            </div>
            <div className="Post-caption">
              <strong>John D. Veloper </strong> Loving Educative!
            </div>
            
          </article>
         
  )

}

const TitleItems = UsersMemesArray.map(mapper)

  return (
      <>
          <h1>{user.username}'s Stories!</h1> <br />
          <button onClick={GetsUsersMemes} > Get up to date on your posts!</button>
          {valid && ( <ul> {TitleItems}</ul>)  }
      </>
  )
}

    export default Stories1





    // import React, { Component } from "react";

//     class Stories extends Component {

//       render() {

        // return <article className="Post" ref="Post">
        //     <header>
        //       <div className="Post-user">
        //         <div className="Post-user-profilepicture">
        //           <img src="https://www.w3schools.com/images/picture.jpg" alt="Me and my Friends" />
        //           <p>I went hiking in the mountains!</p>
        //         </div>
        //         <div className="Post-user-nickname">
        //           <span>John Doe</span>
        //         </div>
        //       </div>
        //     </header>
        //     <div className="Post-image">
        //       <div className="Post-image-bg">
        //         <img alt="Icon Living" src="[https://cdn-images-1.medium.com/max/1200/1*dMSWcBZCuzyRDeMr4uE_og.png]" />
        //       </div>
        //     </div>
        //     <div className="Post-caption">
        //       <strong>John D. Veloper </strong> Loving Educative!
        //     </div>
            
        //   </article>
//         }
//     }