import { useAppKit } from "@reown/appkit/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function ConnectButton() {
    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    // Auto-connect if there's a saved connection
    useEffect(() => {
        const savedConnector = connectors.find(c => c.ready);
        if (savedConnector && !isConnected) {
            connect({ connector: savedConnector });
        }
    }, [connectors, connect, isConnected]);

    return (
        <div className="p-2 bg-black rounded-full shadow-lg inline-block">
            {isConnected ? (
                <button
                    onClick={() => disconnect()}
                    className="flex items-center justify-center text-white px-2 py-1 rounded"
                    title="Log out"
                >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </button>
            ) : (
                <button 
                    onClick={() => open()} 
                    className="text-white font-bold px-4 rounded"
                >
                    Log in
                </button>
            )}
        </div>
    );
}