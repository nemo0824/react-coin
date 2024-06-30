import styled from "styled-components"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Title = styled.h1`
color:${(props) => props.theme.accentColor}
font-size: 48px;
`

const Container = styled.div`
    padding: 0px 20px;
    // max-width: 480px;
    margin: 0 auto;
`;
const Header =styled.header`
    height: 10vh;
    display: flex;
    justify-content:center;
    align-items: center;
`;
const CoinList = styled.ul`
`;
const Coin = styled.li`
 background-color: white;
 color: ${(props) => props.theme.textColor};
 margin-bottom: 10px;
 padding: 20px;
 border-radius: 15px;
 a {
 transition: color 0.2s ease-in;
 display:flex;
 align-items: center;
 
}
 &:hover{
    a{
      color: ${(props) => props.theme.accentColor}
    }
 }
`;

const Loader = styled.span`
text-align : center;
display: block;
`
const Img = styled.img`
width: 25px;
height: 25px;
margin-right: 10px
`




interface ICoin{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
}


function Coins(){
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev)=> !prev);
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);

    //useQuery 함수가 fetchCoins 함수를 부르고 다들어가기전에는 isLoading 띄어주고 , 다됐을때 data 넣어줌
    // 특정 코인 상세페이지 들어갔다가 다시 왔을때 loading 보이지않는이유 --> react query에서 데이터를 캐시에 저장해주기때문


    // const [coins, setCoins] = useState<ICoin[]>([])
    // const [loading, setLoading] = useState(true);
    // useEffect(()=>{
      
    //     getCoins()
    // },[])


    // useEffect(()=>{
    //     getCoins()
    // },[])

    // 코인을 가져오는 함수
    // promise async await을 이용해서 비동기처리를 해줌 -> response로 값을 받아온뒤 -> json으로 변환 

    // const getCoins = async()=>{
       
        
    //     setCoins(json.slice(0,100))
    //     console.log(coins)
    //     setLoading(false)
    // }

    // 삼항연산자를 사용할때 () 소괄호 넣는것은 필수는 아님 하지만 가독성을 높이기위해서 넣는것임
    return (
    <Container>
        <Header>
            <Title>코인</Title>
            <button onClick={toggleDarkAtom}>toggle button</button>
        </Header>
        {isLoading ? (<Loader>loading....</Loader>) :(<CoinList>
            {data?.slice(0,100).map(coin => <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                    <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                    {coin.name} &rarr;</Link>
            </Coin>)}
        </CoinList>)}
    </Container>
    )
}

export default Coins