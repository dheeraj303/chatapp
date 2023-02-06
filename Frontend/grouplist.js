// let grouplist=document.getElementById('group');

const token=localStorage.getItem('token');
window.addEventListener('DOMContentLoaded',async ()=>{
  
        try{
    
        
            let response=await axios.get(`http://localhost:3000/getgroup`,{headers:{"Authorization":token}})
         if(response.data.status==1){
            response.data.group.forEach((group)=>{
               const list= document.querySelector('#group');
               
                const childhtml=` <a class="nav-link" onclick="showuser('${group.id}')">${group.groupname}</a>`;
                list.innerHTML+=childhtml;
            })
      
        //    showgroup(response.data[0]);
            // document.getElementById('msg').textContent=response.data[0].message;
            // window.SharedArrayBuffer.location
         }
         if(response.data.status==0){
            // document.getElementById('msg').textContent=response.data[0].message.name;
         }
        }
        catch(err){
            console.log(err);
        }
    })



    async function showuser(id){
        localStorage.setItem('gid',id);
        try{
    
        
            let response=await axios.get(`http://localhost:3000/getgroupuser/${id}`,{headers:{"Authorization":token}})
            // console.log(response);
         if(response.data.status==1){
            console.log(response.data.user[0]);
            response.data.user[0].users.forEach((user)=>{
               
               const list= document.querySelector('#user');
       
                var childhtml=` <a class="nav-link">${user.name} `;
                if(response.data.isAdmin){
                 
                        childhtml+=`<button onclick="removefromgroup(${user.id},${response.data.user[0].id})">Remove</button> <button onclick="makeadmin(${user.id},${response.data.user[0].id})">Make Admin</button></a>`;
                }
                list.innerHTML+=childhtml;
            })
      
        //    showgroup(response.data[0]);
            // document.getElementById('msg').textContent=response.data[0].message;
            // window.SharedArrayBuffer.location
         }
         if(response.data.status==0){
            // document.getElementById('msg').textContent=response.data[0].message.name;
         }
        }
        catch(err){
            console.log(err);
        }
    }


   async function removefromgroup(userId,gid){

        try{
            let response=await axios.get(`http://localhost:3000/removefromgroup/${userId}/${gid}`,{headers:{"Authorization":token}})
            if(response.data.status==1){
                   alert(response.data.message);
            }
            if(response.data.status==0){
               // document.getElementById('msg').textContent=response.data[0].message.name;
            }
        }
        catch(err){
            console.log(err);
        }

    }

    async function makeadmin(userId,gid){

        try{
            let response=await axios.get(`http://localhost:3000/makeadmin/${userId}/${gid}`,{headers:{"Authorization":token}})
            if(response.data.status==1){
                   alert(response.data.message);
            }
            if(response.data.status==0){
               // document.getElementById('msg').textContent=response.data[0].message.name;
            }
        }
        catch(err){
            console.log(err);
        }

    }