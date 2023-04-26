import { config } from "../config";

async function getLayout() {
    const url = config.URL_SERVER + "/structures";
    const options = {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  
    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();
      return(jsonData);
    } catch (error) {
      alert(error);
    }
  }

  export {getLayout}