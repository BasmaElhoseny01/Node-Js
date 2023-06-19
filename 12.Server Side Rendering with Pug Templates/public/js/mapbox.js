export const displayMap = locations => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzbWEtZWxob3NlbnkwMSIsImEiOiJjbGowaXlpNXIwb2ljM3F0ODdtbG9td296In0.e9GFKUoTPe675ExGdhmwbg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/basma-elhoseny01/clj1td4pn01ee01pfcwmxhe48',
        // center:[30.8025,26.8206],
        // zoom:3
        scrollZoom: false
    });
    //make map fit so that all locations are shown
    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        //Add marker
        const el = document.createElement('div')
        el.className = 'marker'

        //Add Marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"//button be located @ the GPS location it can be the center
        }).setLngLat(loc.coordinates).addTo(map);

        //Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map)


        //Extend map bounds to include the current location
        bounds.extend(loc.coordinates)
    });


    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    })
};