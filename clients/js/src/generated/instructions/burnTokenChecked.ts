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
export type BurnTokenCheckedInstructionAccounts = {
  account: PublicKey;
  mint: PublicKey;
  authority?: Signer;
};

// Data.
export type BurnTokenCheckedInstructionData = {
  discriminator: number;
  amount: bigint;
  decimals: number;
};

export type BurnTokenCheckedInstructionDataArgs = {
  amount: number | bigint;
  decimals: number;
};

export function getBurnTokenCheckedInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  BurnTokenCheckedInstructionDataArgs,
  BurnTokenCheckedInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    BurnTokenCheckedInstructionDataArgs,
    any,
    BurnTokenCheckedInstructionData
  >(
    s.struct<BurnTokenCheckedInstructionData>(
      [
        ['discriminator', s.u8()],
        ['amount', s.u64()],
        ['decimals', s.u8()],
      ],
      { description: 'BurnTokenCheckedInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 15 })
  ) as Serializer<
    BurnTokenCheckedInstructionDataArgs,
    BurnTokenCheckedInstructionData
  >;
}

// Args.
export type BurnTokenCheckedInstructionArgs =
  BurnTokenCheckedInstructionDataArgs;

// Instruction.
export function burnTokenChecked(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: BurnTokenCheckedInstructionAccounts & BurnTokenCheckedInstructionArgs
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
    getBurnTokenCheckedInstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
