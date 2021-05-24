import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponseData = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

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
    } catch (error) {
        alert('Something went wrong!');

        console.error(error);
    }
}

form.addEventListener('submit', searchAddressHandler);
