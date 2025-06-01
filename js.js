function getData() {
  console.log("1. Fetching started...");

  fetch("https://api.example.com/data")
    .then(response => {
      console.log("2. Got response");
      return response.json();
    })
    .then(data => {
      console.log("3. Parsed data:", data);
    })
    .catch(error => {
      console.log("4. Error occurred:", error);
    });

  console.log("5. Fetch call is done, but response isn't back yet.");
}

getData();
