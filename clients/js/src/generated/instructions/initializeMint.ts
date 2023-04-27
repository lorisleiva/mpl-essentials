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
  Option,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type InitializeMintInstructionAccounts = {
  mint: PublicKey;
  rent?: PublicKey;
};

// Data.
export type InitializeMintInstructionData = {
  discriminator: number;
  decimals: number;
  mintAuthority: PublicKey;
  freezeAuthority: Option<PublicKey>;
};

export type InitializeMintInstructionDataArgs = {
  decimals: number;
  mintAuthority: PublicKey;
  freezeAuthority: Option<PublicKey>;
};

export function getInitializeMintInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  InitializeMintInstructionDataArgs,
  InitializeMintInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    InitializeMintInstructionDataArgs,
    any,
    InitializeMintInstructionData
  >(
    s.struct<InitializeMintInstructionData>(
      [
        ['discriminator', s.u8()],
        ['decimals', s.u8()],
        ['mintAuthority', s.publicKey()],
        ['freezeAuthority', s.option(s.publicKey())],
      ],
      { description: 'InitializeMintInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 0 })
  ) as Serializer<
    InitializeMintInstructionDataArgs,
    InitializeMintInstructionData
  >;
}

// Args.
export type InitializeMintInstructionArgs = InitializeMintInstructionDataArgs;

// Instruction.
export function initializeMint(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: InitializeMintInstructionAccounts & InitializeMintInstructionArgs
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
    'rent',
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111')
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, true),
  });

  // Rent.
  keys.push({
    pubkey: resolvedAccounts.rent,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.rent, false),
  });

  // Data.
  const data =
    getInitializeMintInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
