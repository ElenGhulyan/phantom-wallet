import React, {useEffect, useState} from 'react';
import {Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js';
import * as buffer from "buffer";
import {getWallet} from "../phantomWallet";

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
                    // const confirm = await window.solana.confirm()
                    //
                    // console.log(confirm + 'ddddddd4545454545sdsdsd')

                    console.log(connectedWallet)
                    setWallet(connectedWallet);

                    const walletAddress = connectedWallet.publicKey.toString();

                    console.log( walletAddress + '  55555')
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




    window.onload= function (){
        establishConnection()
        };


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

            const toAddress = '7q96KU92MwXUBbnZveENzD3xeFDAuNKQNnKJ5KbFW38L';
            const lamportsToSend = Math.floor(parseFloat(inputValue) * Math.pow(10, 9));
            const w = getWallet();


            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey:w.publicKey,
                    toPubkey: new PublicKey(toAddress),
                    lamports: lamportsToSend,
                })
            );

            console.log('qweqweqweqweqweqwe',w)
            transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
            transaction.feePayer =w.publicKey;

            const sign = await  w.signAndSendTransaction(transaction,{skipPreflight:false})

            return

            wallet.signAndSendTransaction()
            const signature = await sendAndConfirmTransaction(connection,[wallet.publicKey]);
            console.log('Transaction signature:', signature);

        } catch (error) {
            console.error('Error transferring SOL:', error);
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