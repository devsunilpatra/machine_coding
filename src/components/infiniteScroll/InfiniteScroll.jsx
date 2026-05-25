// `https://picsum.photos/v2/list?page=${page}&limit=100`

import { useState } from "react";

import Post from "./Post"






const InfiniteScroll = () => {

const [data, setData] = useState([]);

    return (
        <div>
           <Post/>
        </div>
    );
};

export default InfiniteScroll;
