import app from "./app";
const PORT = 13001;
if(app){
    app.listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
     });
}
else{
    console.log('APP is undefined');
    
}
