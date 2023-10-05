import mongoose from "mongoose";

let isConnected: boolean = false; // track the connection

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true); // to avoid deprecation warning

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  // if not connected, connect
  try {
    // uri is the connection string to MongoDB Atlas or local MongoDB
    // second argument is an object of options
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt", // name of the database,
      // useNewUrlParser: true, comment this because it is deprecated ts error
      // useUnifiedTopology: true, comment this because it is deprecated ts error
    });
    // interface ConnectOptions extends mongodb.MongoClientOptions {
    //   /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
    //   bufferCommands?: boolean;
    //   /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
    //   dbName?: string;
    //   /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
    //   user?: string;
    //   /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
    //   pass?: string;
    //   /** Set to false to disable automatic index creation for all models associated with this connection. */
    //   autoIndex?: boolean;
    //   /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
    //   autoCreate?: boolean;
    // }

    isConnected = true; // set isConnected to true

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    console.error(`MongoDB connection error: ${error}`);
  }
};
