/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Serializer } from '@lorisleiva/js-core';

/**
 * Gaurd to specify the maximum number of mints in a guard set.
 *
 * List of accounts required:
 *
 * 0. `[writable]` Mint tracker PDA. The PDA is derived
 * using the seed `["allocation", allocation id,
 * candy guard pubkey, candy machine pubkey]`.
 */

export type Allocation = {
  /** Unique identifier of the allocation. */
  id: number;
  /** The size of the allocation. */
  size: number;
};

export function getAllocationSerializer(
  context: Pick<Context, 'serializer' | 'eddsa'>
): Serializer<Allocation> {
  const s = context.serializer;
  return s.struct<Allocation>(
    [
      ['id', s.u8],
      ['size', s.u32],
    ],
    'Allocation'
  );
}
