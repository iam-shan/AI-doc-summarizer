const crypto = require('crypto');

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

module.exports ={
    generateSessionId,
    updateUserSession
}