import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponseData = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

// declare const google: any;

async function searchAddressHandler(event: Event) {
    event.preventDefault();

    const enteredAddress = addressInput.value;
    const address = encodeURI(enteredAddress);

    try {
        const { data } = await axios.get<GoogleGeocodingResponseData>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
        );

        if (data.status !== 'OK') {
            const errorMessage = 'Could not fetch location!';

            alert(errorMessage);

            console.error(errorMessage);
        }

        const coordinates = data.results[0].geometry.location;

        const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates,
            zoom: 8
        });

        new google.maps.Marker({ position: coordinates, map });
    } catch (error) {
        alert('Something went wrong!');

        console.error(error);
    }
}

function appendGoogleScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`;
    document.getElementsByTagName('head')[0].appendChild(script);
}

appendGoogleScript();
form.addEventListener('submit', searchAddressHandler);
