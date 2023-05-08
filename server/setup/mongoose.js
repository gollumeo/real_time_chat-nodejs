import libs from './libs.js';
const { mongoose } = libs;

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database successfully');
    } catch (error) {
        console.log(`Connection failed: ${error}`);
        throw error;
    }
};
