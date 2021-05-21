const form = document.querySelector('from')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

console.log(process.env.GOOGLE_API_KEY);

function searchAddressHandler(event: Event) {
    event.preventDefault();

    const enteredAddress = addressInput.value;

    console.log(enteredAddress);
}

form.addEventListener('submit', searchAddressHandler);
