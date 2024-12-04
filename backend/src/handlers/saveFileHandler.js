
const saveFile = async(req, session_id)=>{
    try {
        const fileRecord = await req.app.get('models')['files'].create({
            filename: req.file.originalname,
            content: req.file.buffer, // Save file content as binary
            session_id,
          });
        return fileRecord.id;
    } catch (error) {
        console.log(error)
    }
}

const retriveFile = async(req, res)=>{
    try {
        // const session_id = req.body.session_id;
        const session_id = "15e4c7ce063d88755b6cf57c4fa3e089";
        console.log("1")
        if(!session_id) return res.status(400).send({msg:"session id is missing"})
        const file = await req.app.get('models')['files'].findOne({ where: { session_id } });
    console.log(file);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
          }
          res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

    // Send the binary content of the file
   return res.status(200).send(file.content);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

module.exports = { saveFile,retriveFile}