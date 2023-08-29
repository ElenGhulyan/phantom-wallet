import React, {useEffect, useState} from 'react';
import {Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js';
import * as buffer from "buffer";

window.Buffer = buffer.Buffer;

const WalletIntegration = () => {
    const [connected, setConnected] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [balanceAmount, setBalance] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const rpcUrl = 'https://long-morning-waterfall.solana-mainnet.discover.quiknode.pro/518985538e0ba735bd0b04a49dc59beb9bca4177/';

    const connection = new Connection(rpcUrl, 'confirmed');

    useEffect(() => {
        const establishConnection = async () => {
            try {
                const walletAvailable = window.solana && window.solana.isPhantom;

                if (walletAvailable) {
                    const connectedWallet = await window.solana.connect();
                    console.log(connectedWallet)
                    setWallet(connectedWallet);

                    const walletAddress = connectedWallet.publicKey.toString();
                    setWalletAddress(walletAddress);

                    const publicKey = new PublicKey(walletAddress);
                    const balance = await connection.getBalance(publicKey);
                    setBalance(balance / Math.pow(10, 9));

                    setConnected(true);
                }
            } catch (error) {
                console.error('Error connecting to Phantom Wallet:', error);
            }
        };

        establishConnection();
    }, []);

    const handleButtonClick = async () => {
        alert(inputValue + '----' + balanceAmount)
        if (parseFloat(inputValue) > balanceAmount) {
            alert('The amount is not enough.');
            return;
        }

        try {
            if (!wallet) {
                alert('Wallet is not connected.');
                return;
            }

            const toAddress = 'Cdk93KCwM6CiT2N5zziww95CjbBkQvHtATT5zrFPsAhJ'; // Replace with recipient's Solana address
            const lamportsToSend = Math.floor(parseFloat(inputValue) * Math.pow(10, 9));

            // console.log("lamportsToSend", lamportsToSend);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: new PublicKey(walletAddress),
                    toPubkey: new PublicKey(toAddress),
                    lamports: lamportsToSend,
                })
            );

            transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
            transaction.sign(wallet);

            const signature = await sendAndConfirmTransaction(connection, transaction, [wallet.publicKey]);
            console.log('Transaction signature:', signature);

            alert('Transaction successful');
        } catch (error) {
            console.error('Error transferring SOL:', error);
            alert('Error transferring SOL');
        }
    };


    return (
        <div>
            {connected ? (
                <div className='content'>
                    <div className="walletAddress">
                        <p>{walletAddress}</p>
                    </div>

                    <p>Connected to Phantom Wallet ddd Balance: {balanceAmount}</p>

                    <div>
                        <input
                            type="number"
                            placeholder={inputValue}
                            className="input-sol"
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={handleButtonClick}>Transfer</button>
                    </div>
                </div>
            ) : (
                <p>Phantom Wallet not available or not connected!!!!</p>
            )}
        </div>
    );
};

export default WalletIntegration;