// import { useState } from "react";
// import { mnemonicToSeed } from "bip39";
// import { Wallet, HDNodeWallet } from "ethers";
// import PropTypes from "prop-types";

// export const EthWallet = ({ mnemonic }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [addresses, setAddresses] = useState([]);

//     const addWallet = async () => {
//         try {
//             const seed = await mnemonicToSeed(mnemonic);
//             const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
//             const hdNode = HDNodeWallet.fromSeed(seed);
//             const child = hdNode.derivePath(derivationPath);
//             const privateKey = child.privateKey;
//             const wallet = new Wallet(privateKey);

//             setCurrentIndex((prevIndex) => prevIndex + 1);
//             setAddresses((prevAddresses) => [...prevAddresses, wallet.address]);
//         } catch (error) {
//             console.error("Error generating ETH wallet:", error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={addWallet}>Add ETH Wallet</button>
//             {addresses.map((address, index) => (
//                 <div key={index}>Eth - {address}</div>
//             ))}
//         </div>
//     );
// };

// EthWallet.propTypes = {
//     mnemonic: PropTypes.string.isRequired
// };



import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet, ethers } from "ethers";
import PropTypes from "prop-types";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [balances, setBalances] = useState({});

  
  const provider = ethers.getDefaultProvider("mainnet"); 

  const addWallet = async () => {
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const wallet = new Wallet(child.privateKey, provider);

      setCurrentIndex((prevIndex) => prevIndex + 1);
      setAddresses((prevAddresses) => [...prevAddresses, wallet.address]);

    
      const balance = await provider.getBalance(wallet.address);
      setBalances((prevBalances) => ({
        ...prevBalances,
        [wallet.address]: ethers.formatEther(balance), 
      }));
    } catch (error) {
      console.error("Error generating ETH wallet:", error);
    }
  };

  return (
    <div className="wallet-container">
      <button onClick={addWallet} className="add-wallet-button">Add ETH Wallet</button>
      {addresses.map((address, index) => (
        <div key={index} className="wallet-info">
          <p>Eth Address: {address}</p>
          <p>Balance: {balances[address] ?? "Loading..."} ETH</p>
        </div>
      ))}
    </div>
  );
};

EthWallet.propTypes = {
  mnemonic: PropTypes.string.isRequired,
};
