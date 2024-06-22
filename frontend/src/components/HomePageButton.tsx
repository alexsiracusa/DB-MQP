import { Button } from "react-bootstrap";

const HomePageButton = ({ bgColor, buttonName, textCol }: { bgColor: string, buttonName: string, textCol?: string }) => {
    if (!textCol) textCol = "white";
    return (
        <Button className={`bg-${bgColor} w-3/4 font-Inter font-bold text-sm text-${textCol} hover:scale-105 duration-500 rounded-full w-${length}`}>{buttonName}</Button>
    );
}

export default HomePageButton