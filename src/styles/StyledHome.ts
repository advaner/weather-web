import styled from "styled-components"

const contentColor = "#d9dadf"
const mainColor = "#e2e3e5"

export const Icons = {
    height: "50px",
    width: "50px",
    marginRight: "7px"
}

export const Container = styled.div`
    height: 100%;
    width: 100%;

    padding: 0px;
    margin: 0px;

    display: flex;

    background-color: ${mainColor};
    font-family: 'Roboto', sans-serif;
`;

export const LeftSide  = styled.div`
    height: 95%;
    width: 70%;
`

export const TopContainer = styled.div`
    height: 15%;
    width: 100%;

    display: flex;

    align-items: center;
    justify-content: space-between;

    border-bottom: 4px;

    border-color: ${contentColor};
    border-width: 5px;
    border-style: solid;

`

export const TitleContainer = styled.div`
    height: 100%;
    width: 30%;

    display: flex;

    align-items: center;
    justify-content: center;

    h1{
        font-size: 40px;
    }

`

export const FormContainer = styled.form`
    height: 100%;
    width: 70%;

    display: flex;

    align-items: center;
    justify-content: center;

    input{
        height: 30%;
        width: 40%;

        border-width: 1px;
        border-radius: 16px;
        border-style: solid;
        border-color: black;

        background-color: ${contentColor};

        outline: none;

        padding: 10px;

        ::-webkit-search-cancel-button{
            display: none;
        }
    }
`

export const Map = styled.div`
    height: 85%;
    width: 100%;  

    margin: 0px;
    padding: 0px;

    display: flex;

    justify-content: center;
    align-items: center;
`

export const MapContainer = styled.div`
    width: 90%;
    height: 90%;

    overflow: hidden;

    border-radius: 32px;
`

export const RightSide = styled.div`
    height: 100%;
    width: 30%;

    background-color: ${contentColor};

    display: flex;

    justify-content: center;
    align-items: center;
`

export const ContentContainer = styled.div`
    width: 75%;
    height: 50%;

    margin: 0px;
    padding: 0px;
`
export const ContentCityName = styled.div`
    width: 100%;
    height: max-content;

    font-size: 48px;
    font-weight: bold;

    display: flex;

    align-items: center;
    justify-content: center;

    div{
        width: max-content;
        height: max-content;
    }
    
`

export const ContentTemp = styled.div`
    width: 100%;
    height: max-content;

    font-size: 64px;
    font-weight: bold;

    display: flex;

    align-items: center;
    justify-content: center;

    div{
        width: max-content;
        height: max-content;
    }
    
`

export const WeatherContainer = styled.div`
    width: 100%;
    height: max-content;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    div{
        width: 80%;
        height: max-content;

        display: flex;

        margin-top: 15px;

        div{
            width: 50%;
            height: max-content;
            font-size: 24px;

            display: flex;

            align-items: center;
            justify-content: center;
        }
    }
`

export const WindContent = styled.div`

    margin-top: 20px;

    display: flex;

    justify-content: center;
    align-items: center;
`

