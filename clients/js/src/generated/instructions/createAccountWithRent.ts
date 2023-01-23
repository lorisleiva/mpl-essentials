/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  ACCOUNT_HEADER_SIZE,
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@lorisleiva/js-core';

// Accounts.
export type CreateAccountWithRentInstructionAccounts = {
  /** The account paying for the storage */
  payer?: Signer;
  /** The account being created */
  newAccount: Signer;
  /** System program */
  systemProgram?: PublicKey;
};

// Arguments.
export type CreateAccountWithRentInstructionData = {
  discriminator: number;
  space: bigint;
  programId: PublicKey;
};

export type CreateAccountWithRentInstructionArgs = {
  space: number | bigint;
  programId: PublicKey;
};

export function getCreateAccountWithRentInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  CreateAccountWithRentInstructionArgs,
  CreateAccountWithRentInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    CreateAccountWithRentInstructionArgs,
    CreateAccountWithRentInstructionData,
    CreateAccountWithRentInstructionData
  >(
    s.struct<CreateAccountWithRentInstructionData>(
      [
        ['discriminator', s.u8],
        ['space', s.u64],
        ['programId', s.publicKey],
      ],
      'CreateAccountWithRentInstructionArgs'
    ),
    (value) =>
      ({ discriminator: 0, ...value } as CreateAccountWithRentInstructionData)
  ) as Serializer<
    CreateAccountWithRentInstructionArgs,
    CreateAccountWithRentInstructionData
  >;
}

// Instruction.
export function createAccountWithRent(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: CreateAccountWithRentInstructionAccounts &
    CreateAccountWithRentInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplSystemExtras').publicKey;

  // Resolved accounts.
  const payerAccount = input.payer ?? context.payer;
  const newAccountAccount = input.newAccount;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // New Account.
  signers.push(newAccountAccount);
  keys.push({
    pubkey: newAccountAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(newAccountAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Data.
  const data =
    getCreateAccountWithRentInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = Number(input.space) + ACCOUNT_HEADER_SIZE;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
