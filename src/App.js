import logo from "./logo.svg";
import "./App.css";
import { keyframes, styled } from "styled-components";
import { GlobalStyle } from "./globalStyle";
import { useEffect, useState } from "react";
import { clear } from "@testing-library/user-event/dist/clear";
import star from "./Vector.svg";

function App() {
  const [num, setNum] = useState(2);
  const [isStop, setIsStop] = useState(false);
  const [selected, setSelected] = useState([]);
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const numArr = new Array(81).fill(0).map((v, i) => i + 1);
  useEffect(() => {
    const loop = setInterval(() => {
      setNum((value) => (value + 1 > 81 ? 1 : value + 1));
    }, 80);
    if (isStop) {
      clearInterval(loop);
    }
    return () => {
      clearInterval(loop);
    };
  }, [isStop]);
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "red",
            }}
          >
            대
          </p>
          <img src={star} />
          <p
            style={{
              color: "orange",
            }}
          >
            마
          </p>
          <img src={star} />
          <p
            style={{
              color: "yellow",
            }}
          >
            고
          </p>
          <img src={star} />
          <p
            style={{
              color: "green",
            }}
          >
            뽑
          </p>
          <img src={star} />
          <p
            style={{
              color: "blue",
            }}
          >
            기
          </p>
          <img src={star} />
          <p
            style={{
              color: "navy",
            }}
          >
            기
          </p>
          <img src={star} />
          <p
            style={{
              color: "purple",
            }}
          >
            계
          </p>
        </h1>
        <Number>
          <div>
            {numArr.map((value) => {
              let id;
              if (value === num) {
                id = "mid";
              } else if (value === num - 1) {
                id = "top";
              } else if (value === num + 1) {
                id = "bottom";
              } else {
                id = "hidden";
              }
              return <h1 id={id}>{value}</h1>;
            })}
          </div>
          <SelectedView>{selected.join(", ")}</SelectedView>
        </Number>
        <Button
          onClick={() => {
            const selectedNum = getRandomInt(81);
            setNum(selectedNum);
            if (!isStop) setSelected([...selected, selectedNum]);
            setIsStop(!isStop);
          }}
        >
          {isStop ? "돌리기" : "멈추기"}
        </Button>
      </Wrapper>
      ;
    </>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    background-color: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      blue,
      indigo,
      purple
    );
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 30px;
`;

const Number = styled.div`
  position: relative;
  width: 400px;
  height: 235px;

  align-items: center;
  > div {
    border: 1px solid black;
    height: 200px;
    width: 100%;
    position: relative;
    overflow-y: hidden;
    display: flex;

    > h1 {
      position: absolute;
      transition: 0.2s;
      width: 100%;
      text-align: center;
    }
    #top {
      top: 0px;
      opacity: 0;
    }
    #mid {
      top: 80px;
    }
    #bottom {
      top: 160px;
      opacity: 0;
    }
    #hidden {
      opacity: 0;
      top: 160px;
    }
  }
`;

const SelectedView = styled.p`
  position: absolute;
  display: flex;
  bottom: 0px;
`;
