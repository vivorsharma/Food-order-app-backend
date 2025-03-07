import express, { Response, Request } from "express";
import cors from 'cors';
import "dotenv/config"
import mongoose from "mongoose";
import myUserRoute from './routes/MyUserRoute'
import { v2 as cloudinary } from 'cloudinary';
import MyRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute"
import orderRoute from './routes/OrderRoutes'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("Connected to database")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req: Request, res: Response) => {
    res.send({ message: "health OK!" })
})

app.use('/api/my/user', myUserRoute)
app.use('/api/my/restaurant', MyRestaurantRoute)
app.use('/api/restaurant', restaurantRoute)
app.use('/api/order',orderRoute)

const port = 7000;

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})
