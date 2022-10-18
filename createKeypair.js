const crypto = require('crypto');
const fs = require('fs');


function genKeyPair() {                       // rsa algrothms to genereate the key pair
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits = standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // " Public Key Cryptography Standards 1 "
            format: 'pem', // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // " Public Key Cryptography Standards 1 "
            format: 'pem',
        }
    });

    fs.writeFileSync(__dirname + '/keys/id-rsa_pub.pem', keyPair.publicKey);
    fs.writeFileSync(__dirname + '/keys/id_rsa_priv.pem', keyPair.privateKey);
}

genKeyPair();