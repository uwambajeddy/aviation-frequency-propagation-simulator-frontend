const add = document.querySelector("#add");
const items = document.querySelector("#items");
let globalURL = window.location.origin.includes("heroku") ? "https://uwambajeeddy.herokuapp.com" : "http://localhost:3000";


add.addEventListener("click",async (e)=>{
e.preventDefault();

let lat = document.querySelector("#lat").value;
let lng = document.querySelector("#lng").value;
let rd = document.querySelector("#rd").value;

if(!lat || !lng || !rd) return alert("Please fill empty fields !!");

await axios.post(`${globalURL}/api/add`,{
        longitute: lng,
        latitude: lat,
        radius: rd
}).then(()=>{
    location.reload();
}).catch((err)=>{
    console.log(err)
    alert(`${err.response.data.message}`);
});

});

async function getItems(){

        await fetch(`${globalURL}/api/map`)
        .then(data => data.json())
         .then(res => {
             
        res.data.receivers.map(receiver => {
        items.innerHTML += `<li onclick="removeItem('${receiver._id}')"><p>${receiver.latitude}</p>  <p>${receiver.longitute}</p> <p>${receiver.radius}</p></li>`;
        })
    })
    
}

async function removeItem(key){
    
    await axios.delete(`${globalURL}/api/remove/${key}`).then(()=>{
        location.reload();
    }).catch((err)=>{
        console.log(err)
        alert(`${err.response.data.message}`);
    });
};


getItems();