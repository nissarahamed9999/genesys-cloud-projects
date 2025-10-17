const crypto = require('crypto');

/**
 * Genesys Function App Action entry point
 * @param {Object} event - Input payload from Genesys workflow
 * @returns {Object} - Output payload to Genesys workflow
 */
exports.handler = async (event) => {
  try {
    const encryptedHex = event.encryptedData;
    const keyHex = event.encryptionKey || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'; // 64-char hex
    const ivHex = event.iv || 'abcdef9876543210abcdef9876543210'; // 32-char hex

    if (!encryptedHex) {
      throw new Error('Missing encryptedData in input');
    }

    const secretKey = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex.slice(0, 32), 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return {
      decryptedData: decrypted,
      encryptedInput: encryptedHex
    };
  } catch (error) {
    return {
      error: 'Decryption failed',
      details: error.message
    };
  }
};