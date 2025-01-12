import iziToast from "izitoast";



document.querySelector(".form").addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputDelay = form.querySelector(".delay").value;
    const selectedState = form.querySelector('input[name="state"]:checked').value;
    const delay = parseInt(inputDelay, 10);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
    
            if (selectedState === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    promise.then((delay) => {
        iziToast.show({
            backgroundColor: ' #59a10d',
            messageColor: '#fff',
            message: `✅ Fulfilled promise in ${delay}ms`,

        });

    })
        .catch((delay) => {iziToast.show({
    backgroundColor: ' #ef4040',
    messageColor: '#fff',
     message: `❌ Rejected promise in ${delay}ms`

}); });
}