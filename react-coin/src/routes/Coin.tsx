import { info } from "console";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams, Route, Routes, Link, useMatch} from "react-router-dom"
import { styled } from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

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

const Loader = styled.span`
text-align : center;
display: block;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0,0,0,0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor}
  a{
    display: block;
  }
`;
 


interface RouteState{
   state:{
    name:string;
   }
}

interface IInfoData{
    id:string ;
    name:string ;
    symbol:string ;
    rank:number ;
    is_new:boolean ;
    is_active:boolean ;
    type:string ;
    logo:string ;
    description:string ;
    message:string ;
    open_source:boolean ;
    started_at:string ;
    development_status:string ;
    hardware_wallet:boolean ;
    proof_type:string ;
    org_structure:string ;
    hash_algorithm:string ;
    first_data_at:string ;
    last_data_at:string ;
}

interface IPriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:{
            ath_date: string
            ath_price:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_1h:number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_change_12h:number;
            percent_change_15m:number;
            percent_change_24h:number;
            percent_change_30d:number;
            percent_change_30m:number;
            percent_from_price_ath:number;
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
        }
    }
}


function Coin(){
    const {coinId} = useParams<{coinId:string}>();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation() as RouteState;
    const [infoData, setInfoData] = useState<IInfoData>();
    const [priceData, setPriceData] = useState<IPriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    // console.log(priceMatch)
    // console.log(chartMatch)
    // useMatch 
    // url이 일치하면 object를 던저줌 
 

   useEffect(()=>{
    (async()=>{
        const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
        const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
        setInfoData(infoData);
        setPriceData(priceData);
        setLoading(false);
    })();
   },[coinId])

    // console.log(location) 
    //location 이라는 객체안에 state라는 객체  == 객체안에 객체 
    // 
    // console.log(location.state)
    //  console.log(coinId)
    return  (
    <Container>
        <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        </Header>
        {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
             <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
             <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
          </Tabs>

         
         
          <Routes>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
        </ Routes>
        </>
      )}
    </Container>
    )
}
// link to 로 state값을 넘길수 있다 --> 굳이 api 통신한번더 안해도됨 --> 화면전환 부드러움
// state로 넘길시 link to 버튼을 눌렀을때 통신이되기때문에 url로 바로접근하면 loading을 뜨게해준다 
// 


// api 호출 async await을 이용한 비동기처리로 ---> useState에 담기 ---> 담을때 interface로 useState에 type 지정 
export default Coin;