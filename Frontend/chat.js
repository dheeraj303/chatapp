const msg=document.querySelector('#message');
console.log(msg);
document.getElementById('send').addEventListener('click',send);

async function send(e){
    e.preventDefault();
    alert("hi");
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