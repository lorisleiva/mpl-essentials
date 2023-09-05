/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Data.
export type SetComputeUnitPriceInstructionData = {
  discriminator: number;
  /** Transaction compute unit price used for prioritization fees. */
  microLamports: bigint;
};

export type SetComputeUnitPriceInstructionDataArgs = {
  /** Transaction compute unit price used for prioritization fees. */
  microLamports: number | bigint;
};

export function getSetComputeUnitPriceInstructionDataSerializer(): Serializer<
  SetComputeUnitPriceInstructionDataArgs,
  SetComputeUnitPriceInstructionData
> {
  return mapSerializer<
    SetComputeUnitPriceInstructionDataArgs,
    any,
    SetComputeUnitPriceInstructionData
  >(
    struct<SetComputeUnitPriceInstructionData>(
      [
        ['discriminator', u8()],
        ['microLamports', u64()],
      ],
      { description: 'SetComputeUnitPriceInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 3 })
  ) as Serializer<
    SetComputeUnitPriceInstructionDataArgs,
    SetComputeUnitPriceInstructionData
  >;
}

// Args.
export type SetComputeUnitPriceInstructionArgs =
  SetComputeUnitPriceInstructionDataArgs;

// Instruction.
export function setComputeUnitPrice(
  context: Pick<Context, 'programs'>,
  input: SetComputeUnitPriceInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'splComputeBudget',
    'ComputeBudget111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {};

  // Arguments.
  const resolvedArgs: SetComputeUnitPriceInstructionArgs = { ...input };

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getSetComputeUnitPriceInstructionDataSerializer().serialize(
    resolvedArgs as SetComputeUnitPriceInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
