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

window.addEventListener('DOMContentLoaded',getmessage);

async function getmessage(e){
    e.preventDefault();
    try{
        const token=localStorage.getItem('token');
        let response=await axios.get('http://localhost:3000/message',{headers:{"Authorization":token}})
        console.log(response.data.message[0]);
     if(response.data.status==1){
        for(var i=0;i<response.data.message.length;i++){
            viewmessage(response.data.message[i]);
        }
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

function viewmessage(msg){
    const parentnode=document.querySelector('#chat')
    const childhtml=`<h3>${msg.message}</h3>`;
    parentnode.innerHTML=parentnode.innerHTML+childhtml;
}