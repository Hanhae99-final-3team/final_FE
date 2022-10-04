import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mainColors = ["#cbcbcb", "#B192F3", "#FFE47A"];

export default function PriceChart({
  sellingPrice,
  purchasePrice,
  averagePrice,
  category,
}) {
  const [pPrice, setPprice] = useState();
  const [sPrice, setSprice] = useState();
  const [aPrice, setAPrice] = useState();
  const [cate, setCategory] = useState();

  useEffect(() => {
    setSprice(sellingPrice);
    setPprice(purchasePrice);
    setAPrice(averagePrice);
    setCategory(category);
  }, [
    setPprice,
    setSprice,
    setAPrice,
    purchasePrice,
    sellingPrice,
    averagePrice,
    setCategory,
    category,
  ]);

  const data = [
    {
      name: "구매당시가격",
      price: pPrice,
    },
    {
      name: "판매희망가",
      price: sPrice,
    },
    {
      name: "평균가격",
      price: aPrice,
    },
  ];

  const CustomTooltip = ({ active, payload, label, category }) => {
    if (active && payload && payload.length) {
      return (
        <StCustomToolTip style={{ border: "none" }}>
          <StLabel>{`${label}`}</StLabel>
          <StPrice>{`${payload[0].value.toLocaleString("ko-KR")}원`}</StPrice>
          {label === "평균가격" && (
            <p className="desc">{`${cate}의 평균가격입니다.`}</p>
          )}
        </StCustomToolTip>
      );
    }

    return null;
  };

  return (
    <StBarChartWrapper>
      <ResponsiveContainer width={"99%"} height={"100%"}>
        <BarChart
          data={data}
          barSize={50}
          margin={{
            top: 0,
            right: 20,
            left: 5,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <Bar dataKey="price" fill="#000000" label={{ position: "top" }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={mainColors[index % 20]} />
            ))}
          </Bar>
          <Tooltip
            cursor={{ stroke: "#B192F3", strokeWidth: 2, fill: "transparent" }}
            content={<CustomTooltip />}
          />
        </BarChart>
      </ResponsiveContainer>
    </StBarChartWrapper>
  );
}

const StBarChartWrapper = styled.div`
  width: max-content;
  min-width: 26rem;
  height: 30rem;
  margin: 0 auto;
  font-size: 1.2rem;
  outline: none;
  @media (min-width: 768px) {
    /* Tablet */ /* Desktop */
    width: 44.6rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 20rem;
  }
`;

const StCustomToolTip = styled.div`
  border: 1px solid #ffffff;
  padding: 0.8rem;
  width: max-content;
  min-width: 10rem;
  opacity: 0.8;
  outline: none;
  box-shadow: 0px;
  border: none;
  text-align: center;
  background-color: #f7f2f2;
`;

const StLabel = styled.p`
  font-size: 1.2rem;
`;

const StPrice = styled.p`
  color: ${({ theme }) => theme.mainColor};
  font-weight: 600;
`;
