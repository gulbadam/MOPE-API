const Clarifai = require("clarifai");
const app = new Clarifai.App({
    apiKey: 'aa771fc1104f4d49827dac5a21154465'
});
const handleApiCall = (req, res,) => {
    const {input} = req.body;
    console.log("input" + input);

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
        const {id} = req.body;
        
        console.log("id", id)
        db('users').where('id', '=', id)
            .increment('entries', 1)
            .returning('entries')
            .then(entries => {
                res.json(entries[0]);
            })
            .catch(err => res.status(400).json('unable to get entries'))
        }
const handleApiColors =(req, res) => {
    const {
        input
    } = req.body;
    console.log("inputCOLOR " + input);

    app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", input)
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
    }

const handleApiDemographics =(req, res) => {
     const {
         input
     } = req.body;
     console.log("inputDEMOGRAPHICS " + input);

     app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", input)
         .then(data => {
             console.log("demographics")
             console.log(data)
             res.json(data);
         })
         .catch(err => res.status(400).json('unable to work with API'))
     }
const handleApiGeneral = (req, res) => {
         const {input} = req.body;
         app.models.predict("aaa03c23b3724a16a56b629203edc62c", input)
             .then(data => {
                 console.log("general")
                 console.log(data)
                 res.json(data);
             })
             .catch(err => res.status(400).json('unable to work with API'))
         }
     


module.exports = {
    handleImage,
    handleApiCall,
    handleApiColors,
    handleApiDemographics,
    handleApiGeneral
}