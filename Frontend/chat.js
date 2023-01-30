const msg=document.querySelector('#message');
console.log(msg);
document.getElementById('send').addEventListener('click',send);

async function send(e){
    e.preventDefault();
    // alert("hi");
    const data={
        "message":msg.value
    }
    console.log(data);
    try{
        const token=localStorage.getItem('token');
        let response=await axios.post('http://localhost:3000/message',data,{headers:{"Authorization":token}})
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
// window.addEventListener('DOMContentLoaded',getmessage);
setInterval(() =>{
    getmessage();
}, 1000);
async function getmessage(){
    
    // e.preventDefault();
    try{
        
        const token=localStorage.getItem('token');
        console.log(token);
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