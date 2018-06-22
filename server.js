const express = require('express');
const app = express();
const PORT= 3000;
app.get('/', (req, res)=> {
    res.send('WORKING')
});
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})