//config

import * as dotenv from 'dotenv';

dotenv.config();

//project

const form = document.querySelector('from')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// const { GOOGLE_API_KEY } = process.env;

//dotenv fix (fs)

function searchAddressHandler(event: Event) {
    event.preventDefault();

    const enteredAddress = addressInput.value;

    console.log(enteredAddress);
}

form.addEventListener('submit', searchAddressHandler);
