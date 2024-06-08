import { useParams } from "react-router-dom"


function Coin(){
    const {coinId} = useParams<{coinId:string}>();
    console.log(coinId)
    return <h1>coin :{coinId}</h1>
}
// commit test
// token test
// token test go
// change ssh

// is finish?  마지막 확인 push 
export default Coin;