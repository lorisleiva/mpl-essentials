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
  WrappedInstruction,
  getProgramAddressWithFallback,
} from '@lorisleiva/js-core';
import { GuardType, getGuardTypeSerializer } from '../types';

// Accounts.
export type routeInstructionAccounts = {
  candyGuard: PublicKey;
  candyMachine: PublicKey;
  payer: Signer;
};

// Arguments.
export type routeInstructionArgs = {
  /** The target guard type. */
  guard: GuardType;
  /** Arguments for the guard instruction. */
  data: Uint8Array;
  label: Option<string>;
};

// Data.
type routeInstructionData = routeInstructionArgs;
export function getrouteInstructionDataSerializer(
  context: Pick<Context, 'serializer' | 'eddsa'>
): Serializer<routeInstructionArgs> {
  const s = context.serializer;
  return s.struct<routeInstructionData>(
    [
      ['guard', getGuardTypeSerializer(context)],
      ['data', s.bytes],
      ['label', s.option(s.string)],
    ],
    'routeInstructionData'
  );
}

// Instruction.
export function route(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  accounts: routeInstructionAccounts,
  args: routeInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'candyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );

  // Candy Guard.
  keys.push({
    pubkey: accounts.candyGuard,
    isSigner: false,
    isWritable: false,
  });

  // Candy Machine.
  keys.push({
    pubkey: accounts.candyMachine,
    isSigner: false,
    isWritable: false,
  });

  // Payer.
  signers.push(accounts.payer);
  keys.push({
    pubkey: accounts.payer.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Data.
  const data = getrouteInstructionDataSerializer(context).serialize(args);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
