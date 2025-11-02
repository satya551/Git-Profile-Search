let currMode="dark";
let toggle =document.querySelector("#mode-toggle");
let result=document.querySelector(".result");
let footer=document.querySelector(".footer-con");
let nav=document.querySelector(".search-container");
var reposlength;
// added a Light/Dark mode button
function createDivs(){
    return document.createElement('div');
}
toggle.addEventListener("click",(evt)=>{
    if(currMode==="dark"){
        document.querySelector("body").style.backgroundColor="white";
        toggle.style.backgroundColor="black";
        toggle.style.color="white";
        result.style.backgroundColor="white";
        result.style.color="black";
        footer.style.backgroundColor="white";
        footer.style.boxShadow="1px -1px 5px grey, 1px 1px 5px grey";
        nav.style.border="1px solid grey";
        nav.style.boxShadow="1px 1px 5px grey";
        footer.style.color="black";
        currMode="light";

    }
    else{
        document.querySelector("body").style.backgroundColor="rgb(46, 46, 46)";
        toggle.style.backgroundColor="rgb(221, 217, 217)";
        toggle.style.color="black";
        result.style.backgroundColor="rgb(69, 71, 73)"
        result.style.color="white";
        footer.style.backgroundColor="rgb(69, 71, 73)";
        footer.style.boxShadow="";
        nav.style.boxShadow="";
        footer.style.color="white";
        currMode="dark";
    }
    
})
let username;
let search=document.querySelector("#search-button");
search.addEventListener("click",()=>{
    
    username=document.querySelector(".search-value").value; 
    console.log(username);
    // Using Fetch API instead of Octokit
   
    // serching github profile using username
    async function getData(username){       
       //handling if no user found

    try{

       
        await fetch(`https://api.github.com/users/${username}`, {
         method: 'GET',
         headers: {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
         }
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`We not found result for ${username}` )
            }
           return response.json()})
        .then(async data=>{
            
          
           console.log(data);
            
            const repoListURL=data.repos_url;

            // after getting repos_url link we are retreiving the data from it as all repos metadata
            // its return array of json file that contains all data about each repo respectively
            await fetch(repoListURL,{
                method:'GET',
                headers:{
                    'Accept':'application/vnd.github+json',
                }
            })
            .then(repoListURLresponse=>{
                if(!repoListURLresponse.ok){
                    throw new Error("uanble to fetch repostories");
                }
                return repoListURLresponse.json()})
            .then(repoarray=>{
                  console.log(repoarray);
                  reposlength=repoarray.length; // finding the length that how much repos are there 
                  

                     result.innerHTML=`
                           <span>"Found  ${data.id} result for ${username}"</span>
                           <div>
                              <img src="${data.avatar_url}" height="200" width="200">
                              <div  class="basic-info">
                                 <a href="${data.html_url}" target="_blank" title="user github profile">${username}</a>
                                 <div class="follow-list">
                                      <ul>
                                          <li>
                                             <p>Follower</p>
                                             <p>${data.followers}</p>
                                          </li>
                                          <li>
                                              <p>Following</p>
                                               <p>${data.following}</p>
                                          </li>
                                           <li> 
                                               <p>Repos</p>  
                                                <p>${reposlength}</p>
                                            </li>
        

                                         </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="repo-container"><h1>Repostories:-></h1></div>
                        ` ;
                        if(reposlength===0){
                           let zeroRepoMessage=document.createElement("div");
                           zeroRepoMessage.classList.add("zero-repo-message");
                            zeroRepoMessage.innerHTML=`
                               <p>Have no repo !!!<p>    
                            `;
                            result.appendChild(zeroRepoMessage);
                            return;
                       }
                         let repoContainer=document.querySelector(".repo-container");
                        repoarray.forEach(repo => 
                        {
                             console.log(repo.name);
                             console.log(repo.forks_count);
                              console.log(repo.html_url);
                              console.log(repo.language);
                              console.log(repo.updated_at);
                              console.log(repo.watchers_count);
                              console.log(repo.stargazers_count);
                              let repoDiv=document.createElement("div");
                              repoDiv.classList.add("repoBox");
                              repoDiv.innerHTML=`

                                  <div>
                                       <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                       <p class="last-update">Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
                                        
                                  </div>
                                
                                  <div>
                                       <p>${repo.language} </p>
                                       <p><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</p>
                                       <p><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</p>
                                       <p><i class="fa-regular fa-eye" title="watchers"></i>:${repo.watchers_count}</p>
                                  </div>
                                  </br>
                                  

                              `
                              repoContainer.appendChild(repoDiv)
                              
                        });
            })

        })
        .catch(error=>{result.innerHTML=`<p>!Error:${error.message}</p>`;})
    }
    catch(error){
        console.log(error.message);
    }
    }
    getData(username);
   

})



