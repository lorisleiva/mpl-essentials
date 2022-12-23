/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Serializer } from '@lorisleiva/js-core';

/** PDA to track the number of mints. */
export type MintTracker = { count: number };

export function getMintTrackerSerializer(
  context: Pick<Context, 'serializer' | 'eddsa'>
): Serializer<MintTracker> {
  const s = context.serializer;
  return s.struct<MintTracker>([['count', s.u32]], 'MintTracker');
}
