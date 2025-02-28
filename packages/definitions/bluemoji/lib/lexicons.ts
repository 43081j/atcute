/* eslint-disable */
// This file is automatically generated, do not edit!

/**
 * @module
 * Contains type declarations for Bluemoji lexicons
 */

import '@atcute/client/lexicons';
import '@atcute/bluesky/lexicons';

declare module '@atcute/client/lexicons' {
	namespace BlueMojiCollectionDefs {
		interface CollectionView {
			[Brand.Type]?: 'blue.moji.collection.defs#collectionView';
			cid: At.CID;
			creator: AppBskyActorDefs.ProfileView;
			indexedAt: string;
			/**
			 * Minimum string length: 1 \
			 * Maximum string length: 64
			 */
			name: string;
			uri: At.Uri;
			avatar?: string;
			/** Minimum: 0 */
			collectionItemCount?: number;
			/**
			 * Maximum string length: 3000 \
			 * Maximum grapheme length: 300
			 */
			description?: string;
			descriptionFacets?: AppBskyRichtextFacet.Main[];
			labels?: ComAtprotoLabelDefs.Label[];
		}
	}

	/** Get a single emoji from a repository. Requires auth. */
	namespace BlueMojiCollectionGetItem {
		interface Params {
			/** The Bluemoji alias/rkey. */
			name: string;
			/** The handle or DID of the repo. */
			repo: string;
		}
		type Input = undefined;
		interface Output {
			item: BlueMojiCollectionItem.ItemView;
			uri: At.Uri;
		}
	}

	namespace BlueMojiCollectionItem {
		/** A custom emoji */
		interface Record {
			$type: 'blue.moji.collection.item';
			createdAt: string;
			/** Open union to allow for future formats */
			formats: Brand.Union<Formats_v0>;
			/** Should be in the format :emoji: */
			name: string;
			/** @default false */
			adultOnly?: boolean;
			alt?: string;
			copyOf?: At.Uri;
			/**
			 * Maximum string length: 1
			 * @default "◌"
			 */
			fallbackText?: string;
			/** Self-label values for this emoji. Effectively content warnings. */
			labels?: Brand.Union<ComAtprotoLabelDefs.SelfLabels>;
		}
		/** Limiting blobs to 256kb because there may be many on page and these get optimised by ImgProxy anyway */
		type Blob_v0 = At.Blob;
		/** 64kb should be enough for anybody */
		type Bytes_v0 = At.Bytes;
		interface Formats_v0 {
			[Brand.Type]?: 'blue.moji.collection.item#formats_v0';
			apng_128?: Bytes_v0;
			gif_128?: Blob_v0;
			lottie?: Bytes_v0;
			original?: At.Blob;
			png_128?: Blob_v0;
			webp_128?: Blob_v0;
		}
		interface ItemView {
			[Brand.Type]?: 'blue.moji.collection.item#itemView';
			formats: Formats_v0;
			name: string;
			/** @default false */
			adultOnly?: boolean;
			alt?: string;
			createdAt?: string;
		}
	}

	/** List a range of Bluemoji in a repository, matching a specific collection. Requires auth. */
	namespace BlueMojiCollectionListCollection {
		interface Params {
			cursor?: string;
			/**
			 * The number of records to return. \
			 * Minimum: 1 \
			 * Maximum: 100
			 * @default 50
			 */
			limit?: number;
			/** Flag to reverse the order of the returned records. */
			reverse?: boolean;
		}
		type Input = undefined;
		interface Output {
			items: BlueMojiCollectionItem.ItemView[];
			cursor?: string;
		}
		interface ItemView {
			[Brand.Type]?: 'blue.moji.collection.listCollection#itemView';
			record: BlueMojiCollectionItem.ItemView;
			uri: At.Uri;
		}
	}

	/** Write a Bluemoji record, creating or updating it as needed. Requires auth, implemented by AppView. */
	namespace BlueMojiCollectionPutItem {
		interface Params {}
		interface Input {
			item: BlueMojiCollectionItem.ItemView;
			/** The handle or DID of the repo (aka, current account). */
			repo: string;
			/**
			 * Can be set to 'false' to skip Lexicon schema validation of record data.
			 * @default true
			 */
			validate?: boolean;
		}
		interface Output {
			uri: At.Uri;
		}
		interface Errors {}
	}

	/** Copy a single emoji from another repo. Requires auth. */
	namespace BlueMojiCollectionSaveToCollection {
		interface Params {}
		interface Input {
			/**
			 * The source Bluemoji name/rkey. \
			 * Maximum string length: 15
			 */
			name: string;
			/** The handle or DID of the repo to copy from. */
			source: string;
			/** The alias to save the Bluemoji to in the current logged-in user's repo. */
			renameTo?: string;
		}
		interface Output {
			item: BlueMojiCollectionItem.ItemView;
			uri: At.Uri;
		}
		interface Errors {
			EmojiNotFound: {};
			DestinationExists: {};
		}
	}

	namespace BlueMojiPacksDefs {
		interface PackItemView {
			[Brand.Type]?: 'blue.moji.packs.defs#packItemView';
			subject: BlueMojiCollectionItem.ItemView;
			uri: At.Uri;
		}
		interface PackView {
			[Brand.Type]?: 'blue.moji.packs.defs#packView';
			cid: At.CID;
			creator: AppBskyActorDefs.ProfileView;
			indexedAt: string;
			/**
			 * Minimum string length: 1 \
			 * Maximum string length: 64
			 */
			name: string;
			uri: At.Uri;
			avatar?: string;
			/**
			 * Maximum string length: 3000 \
			 * Maximum grapheme length: 300
			 */
			description?: string;
			descriptionFacets?: AppBskyRichtextFacet.Main[];
			labels?: ComAtprotoLabelDefs.Label[];
			/** Minimum: 0 */
			packItemCount?: number;
			viewer?: PackViewerState;
		}
		interface PackViewBasic {
			[Brand.Type]?: 'blue.moji.packs.defs#packViewBasic';
			cid: At.CID;
			/**
			 * Minimum string length: 1 \
			 * Maximum string length: 64
			 */
			name: string;
			uri: At.Uri;
			avatar?: string;
			/**
			 * Maximum string length: 3000 \
			 * Maximum grapheme length: 300
			 */
			description?: string;
			descriptionFacets?: BlueMojiRichtextFacet.Main[];
			indexedAt?: string;
			/** Minimum: 0 */
			itemCount?: number;
			labels?: ComAtprotoLabelDefs.Label[];
			viewer?: PackViewerState;
		}
		interface PackViewerState {
			[Brand.Type]?: 'blue.moji.packs.defs#packViewerState';
			savedToCollection?: boolean;
		}
	}

	/** Get a list of Bluemoji packs created by the actor. */
	namespace BlueMojiPacksGetActorPacks {
		interface Params {
			actor: string;
			cursor?: string;
			/**
			 * Minimum: 1 \
			 * Maximum: 100
			 * @default 50
			 */
			limit?: number;
		}
		type Input = undefined;
		interface Output {
			packs: BlueMojiPacksDefs.PackViewBasic[];
			cursor?: string;
		}
	}

	/** Gets a 'view' (with additional context) of a specified pack. */
	namespace BlueMojiPacksGetPack {
		interface Params {
			/** Reference (AT-URI) of the pack record to hydrate. */
			pack: At.Uri;
			cursor?: string;
			/**
			 * Minimum: 1 \
			 * Maximum: 100
			 * @default 50
			 */
			limit?: number;
		}
		type Input = undefined;
		interface Output {
			items: BlueMojiPacksDefs.PackItemView[];
			pack: BlueMojiPacksDefs.PackView;
			cursor?: string;
		}
	}

	/** Get views for a list of Bluemoji packs. */
	namespace BlueMojiPacksGetPacks {
		interface Params {
			/** Maximum array length: 25 */
			uris: At.Uri[];
		}
		type Input = undefined;
		interface Output {
			packs: BlueMojiPacksDefs.PackViewBasic[];
		}
	}

	namespace BlueMojiPacksPack {
		/** A shareable Bluemoji pack */
		interface Record {
			$type: 'blue.moji.packs.pack';
			createdAt: string;
			/**
			 * Minimum string length: 1 \
			 * Maximum string length: 64
			 */
			name: string;
			/** @default false */
			adultOnly?: boolean;
			/**
			 * Maximum string length: 3000 \
			 * Maximum grapheme length: 300
			 */
			description?: string;
			descriptionFacets?: BlueMojiRichtextFacet.Main[];
			icon?: At.Blob;
			/** Self-label values for this emoji. Effectively content warnings. */
			labels?: Brand.Union<ComAtprotoLabelDefs.SelfLabels>;
		}
	}

	namespace BlueMojiPacksPackitem {
		/** Record representing a Bluemoji's inclusion in a specific pack. The AppView will ignore duplicate item records. */
		interface Record {
			$type: 'blue.moji.packs.packitem';
			createdAt: string;
			/** Reference (AT-URI) to the pack record (blue.moji.packs.pack). */
			pack: At.Uri;
			/** Reference (AT-URI) to the Bluemoji item record (blue.moji.collection.item). */
			subject: At.Uri;
		}
	}

	namespace BlueMojiRichtextFacet {
		interface Main {
			[Brand.Type]?: 'blue.moji.richtext.facet';
			/** DID of the user posting the Bluemoji */
			did: string;
			formats: Brand.Union<Formats_v0>;
			/** Name of the Bluemoji in :emoji: format */
			name: string;
			/** @default false */
			adultOnly?: boolean;
			alt?: string;
			/** Self-label values for this emoji. Effectively content warnings. */
			labels?: Brand.Union<ComAtprotoLabelDefs.SelfLabels>;
		}
		/** On the facet, only the CID is provided as this can be combined with the DID to create CDN URLs for non-animated blobs. For APNG and dotLottie, raw Bytes are served and require a com.atproto.repo.getRecord roundtrip on render so are marked with a boolean */
		interface Formats_v0 {
			[Brand.Type]?: 'blue.moji.richtext.facet#formats_v0';
			/** @default false */
			apng_128?: boolean;
			gif_128?: At.CID;
			/** @default false */
			lottie?: boolean;
			png_128?: At.CID;
			webp_128?: At.CID;
		}
	}

	interface Records {
		'blue.moji.collection.item': BlueMojiCollectionItem.Record;
		'blue.moji.packs.pack': BlueMojiPacksPack.Record;
		'blue.moji.packs.packitem': BlueMojiPacksPackitem.Record;
	}

	interface Queries {
		'blue.moji.collection.getItem': {
			params: BlueMojiCollectionGetItem.Params;
			output: BlueMojiCollectionGetItem.Output;
		};
		'blue.moji.collection.listCollection': {
			params: BlueMojiCollectionListCollection.Params;
			output: BlueMojiCollectionListCollection.Output;
		};
		'blue.moji.packs.getActorPacks': {
			params: BlueMojiPacksGetActorPacks.Params;
			output: BlueMojiPacksGetActorPacks.Output;
		};
		'blue.moji.packs.getPack': {
			params: BlueMojiPacksGetPack.Params;
			output: BlueMojiPacksGetPack.Output;
		};
		'blue.moji.packs.getPacks': {
			params: BlueMojiPacksGetPacks.Params;
			output: BlueMojiPacksGetPacks.Output;
		};
	}

	interface Procedures {
		'blue.moji.collection.putItem': {
			input: BlueMojiCollectionPutItem.Input;
			output: BlueMojiCollectionPutItem.Output;
		};
		'blue.moji.collection.saveToCollection': {
			input: BlueMojiCollectionSaveToCollection.Input;
			output: BlueMojiCollectionSaveToCollection.Output;
		};
	}
}
