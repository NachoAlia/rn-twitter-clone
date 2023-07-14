import React, { useEffect, useState } from "react";
import { domainUrl } from "../../host";

export async function ListPosts() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch(`${domainUrl}/tweets`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  fetchData();

  return data;
}
