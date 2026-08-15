// api/profile.js — every fetch call related to a user's profile data: saving profile info 
// from TheMainPg, fetching a user's data back, uploading a profile picture. Right now those 
// three fetches (/tinder, /users/{username}, /upload/) are written inline inside TheMainPg.jsx.
// This file just pulls them out into reusable functions:

//change into profile/TheMainPgs
const BASE_URL = import.meta.env.VITE_API_URL;

    
      
        
        //two goals: 1. send quick messege saying it's updated 2. clear everything you wrote in the text-box
        //1. if not null do this - i want it to go away after 5 seconds - click --> not null --> messege
        //2. 
       
       export function uploadpfps(file){
            if (!file) return;
            if (!file.type.startsWith("image/")) return;
    
            const formData = new FormData();
            //Think of this as an empty box that can hold data.
            formData.append("file", file);
        
            //You’re adding something into the box. the key and the actual file object
    
            fetch("http://127.0.0.1:8000/upload/", {
            //change the url into the function you created 
            
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                // console.log("Permanent URL:", data.url);
                const saveurl = data.url// ✅ store the permanent URL. If you add pic from your laptop it only exits there but other can't see it unless it turn to url
                return saveurl
            })
            .catch(err => console.error("Upload failed:", err));
        }
        /////////////////////////////////////////////////
                    //helper function to bring user info back to frontend so it can be shown in profile place
                    export async function fetchdata(id) {
        
                        const res = await fetch(`${BASE_URL}/users`);
                        //after you create useContext use it inside the $(). The id. 
                        //change the url into the function you created 
        
                        const data = await res.json();
                        return data
        
                       
                    }

       ///////////////////////////////// 
                    


        export async function tinderfetch(payload) {
            try {
                const res = await fetch("http://127.0.0.1:8000/tinder", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                return await res.json();
            } catch (err) {
                return err;
            }
        }



  
