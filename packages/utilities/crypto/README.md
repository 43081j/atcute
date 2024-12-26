# @atcute/crypto

cryptographic utilities

```ts
import { createSecp256k1Keypair, verifySigWithDidKey } from './index.js';

const keypair = createSecp256k1Keypair();

// `.sign()` hashes the data and signs it
const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
const sig = await keypair.sign(data);

// `.did()` serializes the public key as a did:key
// e.g. `did:key:zQ3shVRtgqTRHC7Lj4DYScoDgReNpsDp3HBnuKBKt1FSXKQ38`
const didPublicKey = keypair.did();

// `.verify()` can be used to check if the signature is valid, but to save the
// hassle of figuring out the key type, we can use `verifySigWithDidKey()`
const ok = await verifySigWithDidKey(didPublicKey, sig, data);

expect(ok).toBe(true);
```