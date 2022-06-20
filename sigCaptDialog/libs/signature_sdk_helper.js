function integrityStatusDesc(status) {
	switch (status) {
		case Module.IntegrityStatus.OK: return "Integrity correct";
		case Module.IntegrityStatus.FAIL: return "Signature tampered";
		case Module.IntegrityStatus.MISSING: return "The signature has not integrity data";
		case Module.IntegrityStatus.WRONG_TYPE: return "The type of the key is incorrect, please try with another type";
		case Module.IntegrityStatus.INSUFFICIENT_DATA: return "Insufficiente data";
		case Module.IntegrityStatus.UNCERTAIN: return "The intetrity is uncertain";
		case Module.IntegrityStatus.NOT_SUPPORTED: return "The integrity type is not supported in this version of Signature SDK";
	}
}

function dataStatusDesc(status) {
	switch (status) {
		case Module.DataStatus.GOOD: return "Signed data correct";
		case Module.DataStatus.NO_HASH: return "The signature has not attached any data";
		case Module.DataStatus.BAD_TYPE: return "The type of the hash is incorrect, please try with another type";
		case Module.DataStatus.BAD_HASH: return "The hash of the document it is different from the provided";
		case Module.DataStatus.ERROR: return "Unknown error";
		case Module.DataStatus.UNCERTAIN: return "The data is uncertain";
		case Module.DataStatus.SIG_MOVED: return "The signature has been moved";
	}
}

function isEncryptedBinary(data) {
    var string = new TextDecoder().decode(data);
	return (string.startsWith("wgssAES_") || string.startsWith("wgssRSA_"));
}

