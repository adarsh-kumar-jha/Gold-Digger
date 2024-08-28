import { useState } from 'react';
import './App.css';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './Sol';  
import { EthWallet } from './Eth';  

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerateMnemonic = () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div className="app-container">
      <button onClick={handleGenerateMnemonic} className="generate-button">
        Create Seed Phrase
      </button>
      <input type="text" value={mnemonic} readOnly className="mnemonic-input" />
      
      {/* Only render the wallets if a mnemonic is generated */}
      {mnemonic && (
        <div className="wallets-container">
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </div>
      )}
    </div>
  );
}

export default App;
