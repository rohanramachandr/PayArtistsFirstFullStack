//production keys
// do commit this
module.exports = {
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    artworkBucketName: process.env.ARTWORK_BUCKET_NAME,
    musicBucketName: process.env.MUSIC_BUCKET_NAME,
    cloudfrontUrl: process.env.CLOUD_FRONT_URL,
    cloudfrontPublicKey: process.env.CLOUD_FRONT_PUBLIC_KEY_ID,
    cloudfrontPrivateKey: process.env.RSA_PRIVATE_KEY_CLOUD_FRONT
};