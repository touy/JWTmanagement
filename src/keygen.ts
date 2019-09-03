import crypto from 'crypto';
import fs from 'fs';
class Keygen {
    constructor() {
        let secret = "";
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }, (err, publicKey, privateKey) => {
            // sign String
            var signerObject = crypto.createSign("RSA-SHA256");
            signerObject.update(secret);
            var signature = signerObject.sign({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, "base64");
            console.info("signature: %s", signature);
            //verify String
            var verifierObject = crypto.createVerify("RSA-SHA256");
            verifierObject.update(secret);
            var verified = verifierObject.verify({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, signature, "base64");
            console.info("is signature ok?: %s", verified);

            fs.writeFileSync('../public.key', publicKey);
            let fs1 = fs.readFileSync('../public.key');
            fs.writeFileSync('../private.key', privateKey);
            let fs2 = fs.readFileSync('../private.key');
        });
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'touyaraLaoAppS'
            }
        }, (err, publicKey, privateKey) => {
            // Handle errors and use the generated key pair.
            if (err) {
                console.log(err);
            }
            else {
                fs.writeFileSync('../public.key', publicKey);
                let fs1 = fs.readFileSync('../public.key');
                fs.writeFileSync('../private.key', privateKey);
                let fs2 = fs.readFileSync('../private.key');

                console.log('public key', publicKey);
                console.log('private key', privateKey);


                let p1 = fs1.toString().split('\n');
                let p2 = fs2.toString().split('\n')
                p1.shift();
                p1.pop();
                p1.pop();
                p2.shift();
                p2.pop();
                p2.pop();
                console.log('public key', p1.join('\n'));
                console.log('private key', p2.join('\n'));

            }
        });


    }

}
//new Keygen();
export default new Keygen();