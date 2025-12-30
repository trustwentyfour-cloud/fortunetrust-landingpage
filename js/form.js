    // console.log("Form js included");

    const ssl = "https"
    const domain = "mockapi.draptor.in";
    const pageId = "68e2edda03d7975ecbade3da"

    // const ssl = "http"
    // const domain = "localhost:8080";
    // const pageId = "68e2d86803d7975ecbade3d1"

    document.getElementById('messageForm').addEventListener('submit', function(e) {
        e.preventDefault(); // ✅ Prevents page reload/redirect
        const form = this;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let apiUrl = `${ssl}://${domain}/api/message/${pageId}`

        fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            form.reset();
        //   console.log('Response:', result);
            messageNotify("successContact");
        })
        .catch(err => {
        //   console.error('Error:', err);
            messageNotify("failureContact");
        });
    });

    document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
        e.preventDefault(); // ✅ Prevents page reload/redirect
        const form = this;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let apiUrl = `${ssl}://${domain}/api/subscription/${pageId}`

        fetch(apiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            form.reset();
            // console.log('Response:', result);
            if(result["status"] === "Success"){
                messageNotify("subSuccess");
            }else{
                messageNotify("subFailure");
            }
        })
        .catch(err => {
            // console.error('Error:', err);
            messageNotify("subFailure");
        });
    });

    function messageNotify(paraId){
        let successDisplay = document.getElementById(paraId)
        successDisplay.style.display = "block";
        setTimeout(function() {
            successDisplay.style.display = "none";
        }, 10000); // 3000 milliseconds = 3 seconds
    }

    function callPageVisit(){

        let apiUrl = `${ssl}://${domain}/api/page-visit/${pageId}`

        fetch(apiUrl, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(result => {
            // console.log('Response:', result);
        })
        .catch(err => {
            // console.error('Error:', err);
        });

    }

    const customAmount = document.getElementById("customAmount")

    // Function to handle changes in the "payAmountRadio" group
    function handlePayAmountChange(event) {
        const selectedPayAmount = event.target.id; // Get the ID of the selected radio button
        console.log(`Selected Pay Amount: ${selectedPayAmount}`);
        // Add your logic here based on the selected pay amount
        if(selectedPayAmount==="payAmountThree"){
            customAmount.style.display = "block";
        }else{
            customAmount.style.display = "none";
        }
    }

    function donateButtonAction(){
        messageNotify("donateInfo")
    }

    callPageVisit();






















