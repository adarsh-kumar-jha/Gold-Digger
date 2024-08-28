// import { useState } from "react";
// import { mnemonicToSeedSync } from "bip39"; // Synchronous version for seed derivation
// import { derivePath } from "ed25519-hd-key";
// import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
// import nacl from "tweetnacl";

// export function SolanaWallet({ mnemonic }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [publicKeys, setPublicKeys] = useState([]);
//   const [balances, setBalances] = useState({}); // Object to store balances of each public key
//   const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); // Connect to Solana devnet

//   const addWallet = async () => {
//     try {
//       const seed = mnemonicToSeedSync(mnemonic);
//       const path = `m/44'/501'/${currentIndex}'/0'`;
//       const derivedSeed = derivePath(path, seed.toString("hex")).key;
//       const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
//       const keypair = Keypair.fromSecretKey(secret);

//       setCurrentIndex((prevIndex) => prevIndex + 1);
//       setPublicKeys((prevPublicKeys) => [
//         ...prevPublicKeys,
//         keypair.publicKey.toBase58()
//       ]);

//       // Fetch and set balance for the new public key
//       const balance = await connection.getBalance(keypair.publicKey);
//       setBalances((prevBalances) => ({
//         ...prevBalances,
//         [keypair.publicKey.toBase58()]: balance / 1e9 // Convert from lamports to SOL
//       }));

//     } catch (error) {
//       console.error("Error generating wallet:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={addWallet}>Add Solana Wallet</button>
//       {publicKeys.map((publicKey, index) => (
//         <div key={index}>
//           <p>Public Key: {publicKey}</p>
//           <p>Balance: {balances[publicKey] ?? "Loading..."} SOL</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState } from "react";
import { mnemonicToSeedSync } from "bip39"; // Synchronous version for seed derivation
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [balances, setBalances] = useState({}); // Object to store balances of each public key
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); // Connect to Solana devnet

  const addWallet = async () => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      setCurrentIndex((prevIndex) => prevIndex + 1);
      setPublicKeys((prevPublicKeys) => [
        ...prevPublicKeys,
        keypair.publicKey.toBase58()
      ]);

      // Fetch and set balance for the new public key
      const balance = await connection.getBalance(keypair.publicKey);
      setBalances((prevBalances) => ({
        ...prevBalances,
        [keypair.publicKey.toBase58()]: balance / 1e9 // Convert from lamports to SOL
      }));

    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  return (
    <div className="wallet-container">
      <button onClick={addWallet} className="add-wallet-button">Add Solana Wallet</button>
      {publicKeys.map((publicKey, index) => (
        <div key={index} className="wallet-info">
          <p>Public Key: {publicKey}</p>
          <p>Balance: {balances[publicKey] ?? "Loading..."} SOL</p>
        </div>
      ))}
    </div>
  );
}
