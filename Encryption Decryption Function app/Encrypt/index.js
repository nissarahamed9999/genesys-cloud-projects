const crypto = require('crypto');

/**
 * Genesys Function App Action entry point
 * @param {Object} event - Input payload from Genesys workflow
 * @returns {Object} - Output payload to Genesys workflow
 */
exports.handler = async (event) => {
  try {
    const plainText = event.dataToEncrypt || 'Default text';
    const keyHex = event.encryptionKey || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'; // 64-char hex
    const ivHex = event.iv || ' '; // 32-char hex

    const secretKey = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex.slice(0, 32), 'hex');

    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encryptedData: encrypted,
      original: plainText
    };
  } catch (error) {
    return {
      error: 'Encryption failed',
      details: error.message
    };
  }
};