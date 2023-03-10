
const email=document.querySelector('#email');
const password=document.querySelector('#password');

document.getElementById('login').addEventListener('click',signup);

async function signup(e){
    e.preventDefault();
    const data={
       
        "email":email.value,
        "password":password.value
    }
    try{
        let response=await axios.post('http://localhost:3000/login',data)
        console.log(response.data[0]);
     if(response.data[0].status==1){
        document.getElementById('msg').textContent=response.data[0].message;
        console.log(response.data[0])
        localStorage.setItem('token',response.data[0].token);
        alert("User logged in");
        window.location.href='chat.html';
     }
     if(response.data[0].status==0){
        document.getElementById('msg').textContent=response.data[0].message;
     }
    }
    catch(err){
        console.log(err);
    }
}
