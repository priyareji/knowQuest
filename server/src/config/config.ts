import dotev from 'dotenv';

dotev.config();

export const config = {
    mongoURI:process.env.MONGODB_URI || 'mongodb://localhost:27017/knowQuest',
    port:process.env.PORT || 3000
}