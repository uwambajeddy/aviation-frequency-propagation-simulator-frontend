let globalURL = window.location.origin.includes("heroku") ? "https://uwambajeeddy.herokuapp.com" : "http://localhost:3000";


async function initMap(){
  await fetch(`${globalURL}/api/map`)
  .then(data => data.json())
   .then(res => {
       const map = new google.maps.Map(document.getElementById("map"),{
           center: {lat:-1.85, lng:30},
           zoom: 10
       });
       
  res.data.receivers.map(receiver => {
      console.log(receiver)

   const marker= new google.maps.Marker({
    position: new google.maps.LatLng(receiver.latitude, receiver.longitute),
        map: map,
        draggable:false,
        title: "ken",
        label:"k",
        animation: google.maps.Animation.DROP
    })

    
  const  radius = receiver.radius; 

  const  circle = new google.maps.Circle({
    map: map,
    radius: 1000 * radius
  });
  circle.bindTo('center', marker, 'position');

})
});

}

google.maps.event.addDomListener(window, 'load', initMap);

