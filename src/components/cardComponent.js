import React from "react";
import { Card, Divider } from "@nextui-org/react";

const CardComponent = ({item, handleStatusData, length}) => {
  return (
    <Card isPressable className="w-full md:w-[20rem] h-[10rem] flex flex-col items-center justify-center bg-white" onPress={() => handleStatusData(item)}>
        <p className="text-2xl my-4 text-gray-800">{item} Action Items</p>
      <Divider className="w-[90%] bg-black" />
        <p className="text-4xl text-orange-500 text-center my-4">{length}</p>
    </Card>
  );
};

export default CardComponent;
