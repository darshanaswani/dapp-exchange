import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector } from "../store/selectors";
import { web3AccountLoaded } from "../store/actions";

const connectWallet = (dispatch) => {
  if (typeof window.ethereum !== "undefined") {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        const account = accounts[0];

        console.log(`Wallet connected: ${account}`);
        dispatch(web3AccountLoaded(account));
      })
      .catch((error) => {
        // Handle error
        console.log(error, error.code);

        // 4001 - The request was rejected by the user
        // -32602 - The parameters were invalid
        // -32603- Internal error
      });
  } else {
    window.open("https://metamask.io/download/", "_blank");
  }
};

const Navbar = () => {
  const account = useSelector(accountSelector);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#/">
        DApp Token Exchange
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {account ? (
            <a
              className="nav-link small"
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {account}
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                connectWallet(dispatch);
              }}
            >
              Connect Wallet
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
