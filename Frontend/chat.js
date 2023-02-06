const msg=document.querySelector('#message');
// console.log(msg);
document.getElementById('send').addEventListener('click',send);
const token=localStorage.getItem('token');
async function send(e){
    e.preventDefault();
    const gid= localStorage.getItem('gid');
    // alert("hi");
    const data={
        "message":msg.value
    }
    console.log(data);
    try{
        // const token=localStorage.getItem('token');
        let response=await axios.post(`http://localhost:3000/message?gid=${gid}`,data,{headers:{"Authorization":token}})
        console.log(response.data[0]);
     if(response.data[0].status==1){
        // document.getElementById('msg').textContent=response.data[0].message;
        // window.SharedArrayBuffer.location
     }
     if(response.data[0].status==0){
        // document.getElementById('msg').textContent=response.data[0].message.name;
     }
    }
    catch(err){
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded',fetchMessageFromLocal);
window.addEventListener('DOMContentLoaded',getgroup);
// setInterval(() =>{
//     getmessage();
// }, 1000);
async function getmessage(){
    // localStorage.setItem('gid',gid);
    // e.preventDefault();
    try{
        
        
       let message=[];
        if(localStorage.hasOwnProperty('message')){
             message=JSON.parse(localStorage.getItem('message'));
       
            var lastmsgid=message[message.length-1].id;
        
        }
        let response=await axios.get(`http://localhost:3000/message/${lastmsgid}`,{headers:{"Authorization":token}})
        console.log(response.data.message[0]);
     if(response.data.status==1){
        var arr3 = [...message, ...response.data.message];
        var msg=JSON.stringify(arr3);
        console.log(msg);
        localStorage.setItem('message',msg)
        fetchMessageFromLocal();
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

function fetchMessageFromLocal(){
    document.querySelector('#chat').innerHTML="";
    const message=JSON.parse(localStorage.getItem('message'));
    console.log(message);
    for(var i=0;i<message.length;i++){
        viewmessage(message[i]);
    }
}

function viewmessage(msg){
    const parentnode=document.querySelector('#chat')
    const childhtml=`<h3>${msg.message}</h3>`;
    parentnode.innerHTML=parentnode.innerHTML+childhtml;
}




document.getElementById('cgroup').addEventListener('click',createGroup);

async function createGroup(e){
    e.preventDefault();
    const data={
       
        "group":document.getElementById('group').value
    }
    try{
       
    
        let response=await axios.post(`http://localhost:3000/creategroup`,data,{headers:{"Authorization":token}})
     if(response.data.status==1){
        alert(response.data.message);
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

async function getgroup(){
    try{

    
        let response=await axios.get(`http://localhost:3000/getgroup`,{headers:{"Authorization":token}})
     if(response.data.status==1){
        response.data.group.forEach((group)=>{
           const list= document.querySelector('#grouplist');
           
            const childhtml=` <a class="nav-link" onclick="getgroupmessage('${group.id}')">${group.groupname}</a>`;
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

async function getgroupmessage(gid){  
    document.querySelector('#chat').innerHTML="";
    localStorage.setItem('gid',gid);
    try{
        let response=await axios.get(`http://localhost:3000/getgroupmessage/?gid=${gid}`,{headers:{"Authorization":token}})
        // console.log(response.data.message);
        response.data.message.forEach((msg)=>{
            viewmessage(msg);
        });
        // window.location.href='#'+id;
    }
    catch(err){

    }
  
}

document.getElementById('adduser').addEventListener('click',joingroup);
async function joingroup(e){
    // alert("hi");
    e.preventDefault();
    try{
      const gid= localStorage.getItem('gid');
      const obj={
        email:document.getElementById('useremail').value,
        gid:gid
      }
    
        let response=await axios.post(`http://localhost:3000/joingroup`,obj,{headers:{"Authorization":token}})
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




