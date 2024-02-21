/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findAssociatedTokenPda } from '../../hooked';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  expectSome,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type CreateTokenIfMissingInstructionAccounts = {
  /** The account paying for the token account creation if needed */
  payer?: Signer;
  /** The token account that may or may not exist */
  token?: PublicKey | Pda;
  /** The mint account of the provided token account */
  mint: PublicKey | Pda;
  /** The owner of the provided token account */
  owner?: PublicKey | Pda;
  /** The associated token account which may be the same as the token account */
  ata?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Token program */
  tokenProgram?: PublicKey | Pda;
  /** Associated Token program */
  ataProgram?: PublicKey | Pda;
};

// Data.
export type CreateTokenIfMissingInstructionData = { discriminator: number };

export type CreateTokenIfMissingInstructionDataArgs = {};

export function getCreateTokenIfMissingInstructionDataSerializer(): Serializer<
  CreateTokenIfMissingInstructionDataArgs,
  CreateTokenIfMissingInstructionData
> {
  return mapSerializer<
    CreateTokenIfMissingInstructionDataArgs,
    any,
    CreateTokenIfMissingInstructionData
  >(
    struct<CreateTokenIfMissingInstructionData>([['discriminator', u8()]], {
      description: 'CreateTokenIfMissingInstructionData',
    }),
    (value) => ({ ...value, discriminator: 0 })
  ) as Serializer<
    CreateTokenIfMissingInstructionDataArgs,
    CreateTokenIfMissingInstructionData
  >;
}

// Instruction.
export function createTokenIfMissing(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateTokenIfMissingInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenExtras',
    'TokExjvjJmhKaRBShsBAsbSvEWMA1AgUNK7ps4SAc2p'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    payer: { index: 0, isWritable: true, value: input.payer ?? null },
    token: { index: 1, isWritable: false, value: input.token ?? null },
    mint: { index: 2, isWritable: false, value: input.mint ?? null },
    owner: { index: 3, isWritable: false, value: input.owner ?? null },
    ata: { index: 4, isWritable: true, value: input.ata ?? null },
    systemProgram: {
      index: 5,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    tokenProgram: {
      index: 6,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    ataProgram: {
      index: 7,
      isWritable: false,
      value: input.ataProgram ?? null,
    },
  };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.owner.value) {
    resolvedAccounts.owner.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.ata.value) {
    resolvedAccounts.ata.value = findAssociatedTokenPda(context, {
      owner: expectPublicKey(resolvedAccounts.owner.value),
      mint: expectPublicKey(resolvedAccounts.mint.value),
      tokenProgramId: expectPublicKey(resolvedAccounts.tokenProgram.value),
    });
  }
  if (!resolvedAccounts.token.value) {
    resolvedAccounts.token.value = expectSome(resolvedAccounts.ata.value);
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.ataProgram.value) {
    resolvedAccounts.ataProgram.value = context.programs.getPublicKey(
      'splAssociatedToken',
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
    );
    resolvedAccounts.ataProgram.isWritable = false;
  }

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
  const data = getCreateTokenIfMissingInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
