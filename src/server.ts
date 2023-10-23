import app from './app';
import dotenv from "dotenv";
if(process.env.NODE_ENV === "production") dotenv.config();
else dotenv.config({path: ".env"});
console.log('NODE_ENV',process.env.NODE_ENV);
app.listen(process.env.PORT, () => {
	console.log(`App is running at port %d on %s mode at ${new Date()}`, process.env.PORT, process.env.NODE_ENV);
});
export default app;