export function formatAddress(address: `0x${string}` | undefined): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
} 