import mongoose from 'mongoose';

const connectToMongo = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/BLOG", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (res) {
            console.log("✅ Connected successfully ");
        }
    } catch (error) {
        console.error("👹 Connection failed:", error.message);
    }
};

export default connectToMongo;
