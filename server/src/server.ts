import app from './app';
import {config} from './config/config';

const PORT =config.port;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})