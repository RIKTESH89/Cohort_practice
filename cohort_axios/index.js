const axios = require("axios");

async function main() {
  const response = await axios.post(
    " https://httpdump.app/dumps/3730a0c9-4a7e-4289-a186-1c315abd1cdd",
    {
      username: "Riktesh Singh",
    },
    {
      headers: {
        authorization: "Bearer 123456",
      },
    }
  );
  //   console.log(response.data.todos.length);
}

main();

// while using axios.get , we cant send the body but we still can send the information
// using the query parameters in the http request while using get

// in all other methods, we should always keep the body as second argument, and then the
// third argument can contain the headers
