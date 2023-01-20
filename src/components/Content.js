import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exchangeSelector } from "../store/selectors";
import { loadAllOrders, subscribeToEvents } from "../store/interactions";
import OrderBook from "./OrderBook";
import Trades from "./Trades";
import MyTransactions from "./MyTransactions";
import PriceChart from "./PriceChart";
import Balance from "./Balance";
import NewOrder from "./NewOrder";

const loadBlockchainData = async (dispatch, exchange) => {
  await loadAllOrders(exchange, dispatch);
  await subscribeToEvents(exchange, dispatch);
};

const Content = () => {
  const dispatch = useDispatch();
  const exchange = useSelector(exchangeSelector);

  useEffect(() => {
    loadBlockchainData(dispatch, exchange);
  }, [dispatch]);

  return (
    <div className="content">
      <div className="vertical-split">
        <Balance />
        <NewOrder />
      </div>
      <OrderBook />
      <div className="vertical-split">
        <PriceChart />
        <MyTransactions />
      </div>
      <Trades />
    </div>
  );
};

export default Content;
