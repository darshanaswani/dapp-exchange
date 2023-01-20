import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Content from "./Content";
import { useDispatch, useSelector } from "react-redux";
import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange,
} from "../store/interactions";
import { accountSelector, contractsLoadedSelector } from "../store/selectors";
import { compose } from "redux";

const loadBlockchainData = async (dispatch) => {
  const web3 = await loadWeb3(dispatch);
  const networkId = await web3.eth.net.getId();
  await loadAccount(web3, dispatch);
  const token = await loadToken(web3, networkId, dispatch);
  if (!token) {
    window.alert(
      "Token smart contract not detected on the current network. Please select another network with Metamask."
    );
    return;
  }
  const exchange = await loadExchange(web3, networkId, dispatch);
  if (!exchange) {
    window.alert(
      "Exchange smart contract not detected on the current network. Please select another network with Metamask."
    );
    return;
  }
};

const App = () => {
  const dispatch = useDispatch();
  const contractsLoaded = useSelector(contractsLoadedSelector);
  const account = useSelector(accountSelector);

  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {contractsLoaded && account ? (
        <Content />
      ) : (
        <div className="content"></div>
      )}
    </div>
  );
};

export default App;
