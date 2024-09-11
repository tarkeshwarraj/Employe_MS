import mongoose from 'mongoose';

const connectDB = async () => {

    try{
        //frontend mein axios sa connect karte the yaha DB ko mongoose sa connect kar raha hai
        await mongoose.connect('mongodb+srv://tarkeshwar:E7Q5eCllulVOaskL@cluster0.iy1jx73.mongodb.net/EmployeeMS?retryWrites=true&w=majority',{
            useNewUrlParser: true,
        useUnifiedTopology: true
        });

        console.log('MongoDB connected...')

        //Switch to the specific database
        

    }catch(error){
        console.log('Error connection to mongoDB Atlas:', error);
    }

}

export default connectDB;