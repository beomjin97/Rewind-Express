import mongoose from 'mongoose';
import 'dotenv/config';

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  const username = 'uouProject';
  const password = process.env.MONGO_PASSWORD;
  const uri = `mongodb+srv://${username}:${password}@cluster0.jv9pc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  mongoose.connect(uri, { dbName: 'rewind' }, (error) => {
    if (error) {
      console.log('mongoDB connect error', error);
    } else {
      console.log('mongoDB connect success');
    }
  });
};

mongoose.connection.on('error', (error) => {
  console.error('mongoDB connect error', error);
});
mongoose.connection.on('disconnection', () => {
  console.error('mongoDB has disconnected, try reconnect');
  connect();
});

export default connect;
