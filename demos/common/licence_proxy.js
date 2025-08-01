import express from "express";
import cors from "cors";
import crypto from "crypto";
import fetch from "node-fetch";

const app = express();
app.use(cors());
const host = 'localhost';
const port = 8000;

app.listen(port, () => {
	console.log(`Server is running on http://${host}:${port}`);
});

app.get("/", async function (req, res) {	
	const key = "COPY YOUR KEY HERE";
    const secret = "COPY YOUR SECRET HERE";
	try {
		//import the secret as a signing key
	    const signKey = await crypto.subtle.importKey("raw", Buffer.from(secret, "base64"), {
		    name: "HMAC",
		    hash: "SHA-256"		
	    }, false, ["sign"]);		

		//sign the key using a SHA-256 algorith with the previsoly generated signing key
        const signature = await crypto.subtle.sign("HMAC", signKey, Buffer.from(key));		
		const hashedKey = encodeURIComponent(Buffer.from(signature).toString("base64"));

		const url = "https://lms-tx.azurewebsites.net/api/Client/"+key+"?hashedKey="+hashedKey;
		const fetchHeader = {
			//get the Autorhization header passed from the caller (Signature SDK setLicenceProxy function)
			Authorization: req.headers['authorization']
		};

		const fecthOptions = {
			method: "GET",
            headers: fetchHeader
		};

		//ask the Licence server for the licence
        const response = await fetch(url, fecthOptions); 
		const licenceTxt = await response.text();
		res.end(licenceTxt);

    } catch (ex) {
		res.end(ex);
	}
});
