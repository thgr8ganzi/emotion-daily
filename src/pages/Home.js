import {useContext, useEffect, useState} from "react";
import MyHeader from "../componets/MyHeader";
import MyButton from "../componets/MyButton";
import {DiaryStateContext} from "../App";
import DiaryList from "../componets/DiaryList";

const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    useEffect(() => {
        if(diaryList.length >= 1){
            const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
            const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getTime();

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
    },[diaryList, curDate])

    useEffect(()=>{
        console.log(data)
    },[data])

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
    }
    const decreseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
    }

    return(
        <div>
            <MyHeader headText={headText}
                      leftChild={<MyButton text={"<"} onClick={decreseMonth}/>}
                      rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;