/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type BurnTokenInstructionAccounts = {
  account: PublicKey;
  mint: PublicKey;
  authority?: Signer;
};

// Data.
export type BurnTokenInstructionData = {
  discriminator: number;
  amount: bigint;
};

export type BurnTokenInstructionDataArgs = { amount: number | bigint };

export function getBurnTokenInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<BurnTokenInstructionDataArgs, BurnTokenInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    BurnTokenInstructionDataArgs,
    any,
    BurnTokenInstructionData
  >(
    s.struct<BurnTokenInstructionData>(
      [
        ['discriminator', s.u8()],
        ['amount', s.u64()],
      ],
      { description: 'BurnTokenInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 8 })
  ) as Serializer<BurnTokenInstructionDataArgs, BurnTokenInstructionData>;
}

// Args.
export type BurnTokenInstructionArgs = BurnTokenInstructionDataArgs;

// Instruction.
export function burnToken(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: BurnTokenInstructionAccounts & BurnTokenInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Account.
  keys.push({
    pubkey: resolvedAccounts.account,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.account, true),
  });

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, true),
  });

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Data.
  const data =
    getBurnTokenInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
