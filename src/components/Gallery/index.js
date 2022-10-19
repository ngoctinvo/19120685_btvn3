import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function Gallery() {
  const [data, setData] = useState([]);
  const ref = useRef(null);

  const getData = async () => {
    const promise = await fetch("https://api.imgflip.com/get_memes");
    const res = await promise.json();
    const newData = res?.data?.memes || [];
    setData([...data, ...newData]);
  };

  useEffect(() => {
    if (!data.length) getData();
  });

  console.log(data);
  return (
    <>
      <h1 style={{textAlign: "center", color: "pink"}}>Gallery</h1>
      <div
        className={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
        ref={ref}
      >
        {data.map(({ id, name, url }) => (
          <img src={url} alt={name} key={id} height="200px" />
        ))}
      </div>
      <Button onClick={() => getData()} variant="contained" sx={{margin: "20px auto", display: "block", backgroundColor: "pink"}}>
        Load More
      </Button>
    </>
  );
}
