/**
 * Copyright (C) 2024 Wacom.
 * Use of this source code is governed by the MIT License that can be found in the LICENSE file.
 */

class SignSDKHelper {
	
	constructor(sigSDK) {
		this.sigSDK = sigSDK;
	}
	
    integrityStatusDesc(status) {
	    switch (status) {
		    case this.sigSDK.IntegrityStatus.OK: return "Integrity correct";
		    case this.sigSDK.IntegrityStatus.FAIL: return "Signature tampered";
		    case this.sigSDK.IntegrityStatus.MISSING: return "The signature has no integrity data";
		    case this.sigSDK.IntegrityStatus.WRONG_TYPE: return "The type of the key is incorrect, please try with another type";
		    case this.sigSDK.IntegrityStatus.INSUFFICIENT_DATA: return "Insufficient data";
		    case this.sigSDK.IntegrityStatus.UNCERTAIN: return "The integrity is uncertain";
		    case this.sigSDK.IntegrityStatus.NOT_SUPPORTED: return "The integrity type is not supported in this version of Signature SDK";
	    }
    }

    dataStatusDesc(status) {
	    switch (status) {
		    case this.sigSDK.DataStatus.GOOD: return "Signed data correct";
		    case this.sigSDK.DataStatus.NO_HASH: return "The signature has not attached any data";
		    case this.sigSDK.DataStatus.BAD_TYPE: return "The type of the hash is incorrect, please try with another type";
		    case this.sigSDK.DataStatus.BAD_HASH: return "The hash of the document is different from the provided";
		    case this.sigSDK.DataStatus.ERROR: return "Unknown error";
		    case this.sigSDK.DataStatus.UNCERTAIN: return "The data is uncertain";
		    case this.sigSDK.DataStatus.SIG_MOVED: return "The signature has been moved";
	    }
    }

    isEncryptedBinary(data) {
        var string = new TextDecoder().decode(data);
	    return (string.startsWith("wgssAES_") || string.startsWith("wgssRSA_"));
    }

}

export default SignSDKHelper;