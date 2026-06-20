// useShare — Hook principal pour interagir avec le contrat PerShare
// Utilise wagmi v2 + viem

import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useMemo } from 'react';
import { parseEther, formatEther } from 'viem';
import { PERSHARE_ABI, ERC20_ABI, ADDRESSES } from '../lib/contract';

const CHAIN = 'bscTestnet'; // Changer en 'bsc' pour mainnet
const CONTRACT = ADDRESSES[CHAIN].perShare;

if (!CONTRACT) {
  throw new Error("Contrat non déployé ou adresse manquante dans contract.ts");
}

// ── Lecture ───────────────────────────────────────────────────────────────────

export function useShare(id: bigint) {
  // @ts-ignore
  const result = useReadContracts({
    contracts: [
      { address: CONTRACT, abi: PERSHARE_ABI, functionName: 'getShareDetails', args: [id] },
      { address: CONTRACT, abi: PERSHARE_ABI, functionName: 'getShareStatus', args: [id] },
      { address: CONTRACT, abi: PERSHARE_ABI, functionName: 'getShareMembers', args: [id] },
    ],
    query: { refetchInterval: 5000 }
  });

  const data = useMemo(() => {
    if (!result.data || !result.data[0].result || !result.data[1].result || !result.data[2].result) return undefined;
    
    const details = result.data[0].result as readonly any[];
    const status = result.data[1].result as readonly any[];
    const members = result.data[2].result as readonly any[];

    return {
      name: details[0],
      creator: details[1],
      stablecoin: details[2],
      destination: details[3],
      targetAmount: details[4],
      deadline: details[5],
      threshold: details[6],
      totalReceived: status[0],
      currentValidations: status[1],
      currentDistValidations: status[2],
      sent: status[3],
      refunded: status[4],
      tokensDistributed: status[5],
      expectedToken: status[6],
      members: members
    };
  }, [result.data]);

  return { ...result, data };
}

export function useProgress(id: bigint) {
  return useReadContract({
    address: CONTRACT,
    abi: PERSHARE_ABI,
    functionName: 'getProgress',
    args: [id],
    query: { refetchInterval: 5000 }
  });
}

export function useContribution(id: bigint, member: `0x${string}`) {
  return useReadContract({
    address: CONTRACT,
    abi: PERSHARE_ABI,
    functionName: 'getContribution',
    args: [id, member],
    query: { refetchInterval: 5000 }
  });
}

export function useUserTotalContribution(shareIds: bigint[], member: `0x${string}`) {
  const contracts = shareIds.map(id => ({
    address: CONTRACT,
    abi: PERSHARE_ABI,
    functionName: 'getContribution',
    args: [id, member]
  }));
  // @ts-ignore
  return useReadContracts({ contracts, query: { refetchInterval: 5000 } });
}

export function useHasValidated(id: bigint, member: `0x${string}`) {
  return useReadContract({
    address: CONTRACT,
    abi: PERSHARE_ABI,
    functionName: 'hasValidated',
    args: [id, member],
    query: { refetchInterval: 5000 }
  });
}

export function useHasValidatedDist(id: bigint, member: `0x${string}`) {
  return useReadContract({
    address: CONTRACT,
    abi: PERSHARE_ABI,
    functionName: 'hasValidatedDist',
    args: [id, member],
    query: { refetchInterval: 5000 }
  });
}

export function useShareCount() {
  return useReadContract({
    address: CONTRACT,
    abi: PERSHARE_ABI,
    functionName: 'shareCount',
    query: { refetchInterval: 5000 }
  });
}

export function useTokenBalance(tokenAddress: `0x${string}`, account: `0x${string}`) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [account],
    query: { refetchInterval: 5000 }
  });
}

// ── Ecriture ──────────────────────────────────────────────────────────────────

export function useCreateShare() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createShare = (
    name: string,
    members: `0x${string}`[],
    stablecoin: `0x${string}`,
    destination: `0x${string}`,
    targetAmount: string,
    deadlineTimestamp: number,
    threshold: number
  ) => {
    writeContract({
      address: CONTRACT,
      abi: PERSHARE_ABI,
      functionName: 'createShare',
      args: [
        name,
        members,
        stablecoin,
        destination,
        parseEther(targetAmount),
        BigInt(deadlineTimestamp),
        BigInt(threshold)
      ],
    });
  };

  return { createShare, hash, isPending, isConfirming, isSuccess };
}

export function useApprove() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = (
    stablecoin: `0x${string}`,
    amount: string
  ) => {
    writeContract({
      address: stablecoin,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [CONTRACT, parseEther(amount)],
    });
  };

  return { approve, hash, isPending, isConfirming, isSuccess };
}

export function useContribute() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const contribute = (id: bigint, amount: string) => {
    writeContract({
      address: CONTRACT,
      abi: PERSHARE_ABI,
      functionName: 'contribute',
      args: [id, parseEther(amount)],
    });
  };

  return { contribute, hash, isPending, isConfirming, isSuccess };
}

export function useValidate() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const validate = (id: bigint) => {
    writeContract({
      address: CONTRACT,
      abi: PERSHARE_ABI,
      functionName: 'validate',
      args: [id],
    });
  };

  return { validate, hash, isPending, isConfirming, isSuccess };
}

export function useSetExpectedToken() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const setExpectedToken = (id: bigint, tokenAddress: `0x${string}`) => {
    writeContract({
      address: CONTRACT,
      abi: PERSHARE_ABI,
      functionName: 'setExpectedToken',
      args: [id, tokenAddress],
    });
  };

  return { setExpectedToken, hash, isPending, isConfirming, isSuccess };
}

export function useValidateDistribution() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const validateDistribution = (id: bigint, tokenAddress: `0x${string}`) => {
    writeContract({
      address: CONTRACT,
      abi: PERSHARE_ABI,
      functionName: 'validateDistribution',
      args: [id, tokenAddress],
    });
  };

  return { validateDistribution, hash, isPending, isConfirming, isSuccess };
}

export function useRefund() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const refund = (id: bigint) => {
    writeContract({
      address: CONTRACT,
      abi: PERSHARE_ABI,
      functionName: 'refund',
      args: [id],
    });
  };

  return { refund, hash, isPending, isConfirming, isSuccess };
}

// ── Utilitaires ───────────────────────────────────────────────────────────────

export function formatUSDT(amount: bigint): string {
  return parseFloat(formatEther(amount)).toFixed(2);
}

export function getShareStatus(share: any): 'active' | 'sent' | 'refunded' | 'expired' {
  if (share.sent) return 'sent';
  if (share.refunded) return 'refunded';
  if (BigInt(Math.floor(Date.now() / 1000)) > share.deadline) return 'expired';
  return 'active';
}

export function getShareProgress(share: any): number {
  if (share.targetAmount === BigInt(0)) return 0;
  return Number((share.totalReceived * BigInt(100)) / share.targetAmount);
}
