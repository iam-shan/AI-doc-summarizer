const crypto = require('crypto');
const { Sequelize } = require('sequelize');

const generateSessionId = async()=>{
    //creating a unique session id
    const session_id = crypto.randomBytes(16).toString('hex');
    return session_id;
}

const updateUserSession = async (req, sessionId) => {
  try {
    const user = await req.app.get('models')['users'].findByPk(req.user.id);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedSessions = user.sessions ? [...user.sessions, sessionId] : [sessionId];

    await user.update({ sessions: updatedSessions });
  } catch (error) {
    console.error('Error updating user session:', error);
    throw error;
  }
};

const getSessions = async(req, res)=>{
    try {
        if(!req.body.user_id) return res.status(400).send({msg: "user_id is missing in payload"})
        const {user_id} = req.body;
        const userData = await req.app.get('models')['users'].findOne({ where: { id:user_id } });
        if(userData){
            let sessions = userData["dataValues"]["sessions"]
            const files = await req.app.get('models')['files'].findAll({
                where: {
                  session_id: {
                    [Sequelize.Op.in]: sessions, // Check if session_id is in user's sessions
                  },
                },
                attributes: ['filename', 'session_id'], // Only fetch filename and session_id
              });

              const data = files.map(file => ({
                fileName: file.filename,
                session_id: file.session_id,
              }));
              return res.status(200).send({"msg":"success", data: data})
        }else{
            return res.status(401).send({msg:"No user found with that id"})
        }

    } catch (error) {
        console.error('Error fetching session:');
        throw error;
    }
}

module.exports ={
    generateSessionId,
    updateUserSession,
    getSessions
}