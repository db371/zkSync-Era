import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const nftDropAddress = "0xf78d8e0e7d4199c9B94bde1db5aeFd9Ef4af7eF6";
  const editionDropAddress = "0x3Fa6f63Ac9856F45e4955C28c69Ce2aB64a0Ef33";
  const tokenAddress = "0x48f66191261e8a548e28731916bfACAd85F7460a";

  const address = useAddress();

  const{
    contract: nftDropContract, 
  } =useContract(nftDropAddress);
  const{
    contract: editionDropContract
  } = useContract(editionDropAddress);
  const{
    contract: tokenContract, 
  } = useContract(tokenAddress);

  const{
    data: nftDropTotalMinted,
    isLoading: nftDropTotalMintedIsLoading, 
  } = useContractRead(nftDropContract, "totalMinted");
  const{
    data: editionDropTotalMinted,
    isLoading: editionDropTotalMintedIsLoading,
  } = useContractRead(editionDropContract, "totalSupply", [0]);
  const{
    data: tokenBalance,
    isLoading: tokenBalanceIsLoading,
  } = useContractRead(tokenContract, "balanceOf", [address]);
  

  return (
    <div className={styles.container}>
    <main className={styles.main}>
    <ConnectWallet />
    <h1> zkSync Era App</h1>
    {nftDropTotalMintedIsLoading ? (
      <p> Loading...</p>
    ) : (
      <p> Total NFTs minted: {nftDropTotalMinted?.toNumber()}</p>

    )}
    <Web3Button
      contractAddress= {nftDropAddress}
      action= {(contract) => contract.erc721.claim(1)}
      > Claim NFT Drop</Web3Button>
      <br />
      {editionDropTotalMintedIsLoading ? (
        <p> Loading...</p>
      ) : (
        <p>Total Editions minted: {editionDropTotalMinted.toNumber()}</p>
      )}
      <Web3Button
      contractAddress= {editionDropAddress}
      action= {(contract) => contract.erc1155.claim(0, 1)}
      > Claim Edition NFT</Web3Button>
      <br />
      {tokenBalanceIsLoading ? (
        <p> Loading...</p>
      ) : (
        <p>Token balance: {ethers.utils.formatUnits(tokenBalance, 18)}</p>
      )}
    </main>
    </div>
  );
};

export default Home;