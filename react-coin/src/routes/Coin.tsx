import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import styled, { Styled } from "styled-components";

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

function Coin(){
    const {coinId} = useParams<{coinId:string}>();
    const [loading, setLoading] = useState(true)
    console.log(coinId)
    return  (<Container>
    <Header>
        <Title>코인</Title>
    </Header>
    {loading ? (<Loader>loading....</Loader>) : null
}</Container>
    )
}
// commit test
// token test
// token test go
// change ssh

// is finish?  마지막 확인 push 
export default Coin;