import { toBase16, toBase58Btc } from '@atcute/multibase';
import { secp256k1 } from '@noble/curves/secp256k1';

import type { PrivateKey, PrivateKeyExportable, PublicKey, VerifyOptions } from '../types.js';
import { concatBuffers, toSha256 } from '../utils.js';

export const SECP256K1_PUBLIC_PREFIX = Uint8Array.from([0xe7, 0x01]);
export const SECP256K1_PRIVATE_PREFIX = Uint8Array.from([0x81, 0x26]);

export class Secp256k1PublicKey implements PublicKey {
	readonly type = 'secp256k1';

	/** @internal */
	protected _publicKey: Uint8Array;

	constructor(publicKey: Uint8Array) {
		this._publicKey = publicKey;
	}

	bytes(): Uint8Array {
		return this._publicKey;
	}

	did(): `did:key:${string}` {
		const encoded = toBase58Btc(concatBuffers([SECP256K1_PUBLIC_PREFIX, this._publicKey]));
		return `did:key:z${encoded}`;
	}

	async verify(sig: Uint8Array, data: Uint8Array, options?: VerifyOptions): Promise<boolean> {
		const allowMalleable = options?.allowMalleableSig ?? false;
		const hashed = await toSha256(data);

		return secp256k1.verify(sig, hashed, this._publicKey, {
			lowS: !allowMalleable,
			format: !allowMalleable ? 'compact' : undefined,
		});
	}
}

export class Secp256k1PrivateKey extends Secp256k1PublicKey implements PrivateKey {
	/** @internal */
	protected _privateKey: Uint8Array;

	constructor(privateKey: Uint8Array) {
		const publicKey = secp256k1.getPublicKey(privateKey);

		super(publicKey);
		this._privateKey = privateKey;
	}

	async sign(data: Uint8Array): Promise<Uint8Array> {
		const hashed = await toSha256(data);
		const sig = secp256k1.sign(hashed, this._privateKey, { lowS: true });

		// return raw 64 byte sig not DER-encoded
		return sig.toCompactRawBytes();
	}
}

export class Secp256k1PrivateKeyExportable extends Secp256k1PrivateKey implements PrivateKeyExportable {
	export(type: 'hex' | 'multikey'): string;
	export(type: 'bytes'): Uint8Array;
	export(type: 'bytes' | 'hex' | 'multikey'): string | Uint8Array {
		const privateKey = this._privateKey;

		switch (type) {
			case 'bytes': {
				return privateKey;
			}
			case 'hex': {
				return toBase16(privateKey);
			}
			case 'multikey': {
				const encoded = toBase58Btc(concatBuffers([SECP256K1_PRIVATE_PREFIX, privateKey]));
				return `z${encoded}`;
			}
		}

		throw new Error(`unknown "${type}" export type`);
	}
}

export const createSecp256k1Keypair = (): Secp256k1PrivateKeyExportable => {
	const privateKey = secp256k1.utils.randomPrivateKey();
	return new Secp256k1PrivateKeyExportable(privateKey);
};
