import {getWallet} from "../phantomWallet";
import {PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from "@solana/web3.js";


export const handleButtonClick = async () => {
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
