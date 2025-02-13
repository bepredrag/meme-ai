
import Client, {
    CommitmentLevel,
    SubscribeRequest,
    SubscribeUpdate,
    SubscribeUpdateTransaction,
} from "@triton-one/yellowstone-grpc";
import { CompiledInstruction } from "@triton-one/yellowstone-grpc/dist/grpc/solana-storage";
import { ClientDuplexStream } from '@grpc/grpc-js';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';
import fs from 'fs'
import { convertBuffers } from "./utils/geyser";
import { getAssociatedTokenAddress, NATIVE_MINT } from "@solana/spl-token";
import { getBuyTxWithJupiter, getSellTxWithJupiter } from "./utils/swapOnlyAmm";
import { execute, getTokenMarketCap } from "./utils/legacy";
import { executeJitoTx } from "./utils/jito";

dotenv.config()

// Constants
const ENDPOINT = process.env.GRPC_ENDPOINT!;
const COMMITMENT = CommitmentLevel.PROCESSED;
const BASE_MINT_ADDRESS = process.env.BASE_MINT_ADDRESS;
const BUY_AMOUNT = Number(process.env.BUY_AMOUNT) || 0.001;

const solanaConnection = new Connection(process.env.RPC_ENDPOINT!, 'confirmed');
const keyPair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));

const TARGET_ADDRESS = process.env.TARGET_ADDRESS!;
const IS_JITO = process.env.IS_JITO!;

if (!TARGET_ADDRESS) console.log('Target Address is not defined')

console.log('========================================= Your Config =======================================')
console.log('Target Wallet Address =====> ', TARGET_ADDRESS);
console.log("Bot Wallet Address    =====> ", keyPair.publicKey.toBase58());
console.log('=============================================================================================== \n');

// Main function
async function main(): Promise<void> {
    // Private code
    try {
        await sendSubscribeRequest(stream, request);
        console.log(`Geyser connection established - watching ${TARGET_ADDRESS} \n`);
        await handleStreamEvents(stream);
    } catch (error) {
        console.error('Error in subscription process:', error);
        stream.end();
    }
}

// Helper functions
function createSubscribeRequest(): SubscribeRequest {
  // Private code
}

function sendSubscribeRequest(
    stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>,
    request: SubscribeRequest
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        stream.write(request, (err: Error | null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function handleStreamEvents(stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        stream.on('data', async (data) => {
            await handleData(data, stream)
        });
        stream.on("error", (error: Error) => {
            console.error('Stream error:', error);
            reject(error);
            stream.end();
        });
        stream.on("end", () => {
            console.log('Stream ended');
            resolve();
        });
        stream.on("close", () => {
            console.log('Stream closed');
            resolve();
        });
    });
}

async function handleData(data: SubscribeUpdate, stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>) {
    // Private code
}

// Check token balance change of target wallet
const filterAccount = (accounts: any[], token: string): any | null => {
   // Private code
}


const getBalanceChange = (data: SubscribeUpdate, token: string): number | null => {
    // Private code
}

const getSolBalanceChange = (data: SubscribeUpdate): number | null => {
    // Private code
}

// Get Token mint
const getMintAccount = (data: SubscribeUpdate): string | null => {
 // Private code
}

// Private code

main().catch((err) => {
    console.error('Unhandled error in main:', err);
    process.exit(1);
});