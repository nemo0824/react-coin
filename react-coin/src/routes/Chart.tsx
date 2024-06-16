import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts"

interface ChartProps{
  coinId:string;
}

interface IHistorical{
  time_open:number;
time_close: number;
open: string
high: string
low: string
close: string
volume: string
market_cap: number;
}


function Chart( {coinId}: ChartProps ){
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return<div>{isLoading ? "Loading Chart..." : <ApexCharts
      type="line"
      series={[
      {
        name: "sales",
        data: data?.map((price) => parseFloat(price.close)) ?? []
      }
        
      ]}
      options={{
        theme:{
          mode:"dark"
        },
        chart:{
        
        height:500,
        width:500,
      }}}

    />}
    </div>
  }
  
  export default Chart;