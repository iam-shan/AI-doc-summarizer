const crypto = require('crypto');
const { Sequelize } = require('sequelize');

const generateSessionId = async() => {
    const session_id = crypto.randomBytes(16).toString('hex');
    return session_id;
};

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

const getSessions = async(req, res) => {
    try {
        if (!req.body.user_id) {
            return res.status(400).send({msg: "user_id is missing in payload"});
        }

        const {user_id} = req.body;
        const userData = await req.app.get('models')['users'].findOne({ 
            where: { id: user_id } 
        });

        if (!userData) {
            return res.status(401).send({msg: "No user found with that id"});
        }

        const sessions = userData.dataValues.sessions;
        
        // Check if sessions exist and is not empty
        if (!sessions || !Array.isArray(sessions) || sessions.length === 0) {
            return res.status(200).send({
                msg: "success", 
                data: [] // Return empty array if no sessions
            });
        }

        // Filter out any null or invalid session IDs
        const validSessions = sessions.filter(sessionId => sessionId);

        if (validSessions.length === 0) {
            return res.status(200).send({
                msg: "success",
                data: []
            });
        }

        const files = await req.app.get('models')['files'].findAll({
            where: {
                session_id: {
                    [Sequelize.Op.in]: validSessions
                }
            },
            attributes: ['filename', 'session_id']
        });

        const data = files.map(file => ({
            fileName: file.filename,
            session_id: file.session_id,
        }));

        return res.status(200).send({
            msg: "success", 
            data: data
        });

    } catch (error) {
        console.error('Error fetching sessions:', error);
        return res.status(500).send({
            msg: "Error fetching sessions",
            error: error.message
        });
    }
};

const getChatsBasedOnSessionId = async(req, res) => {
    try {
        if (!req.body.session_id) {
            return res.status(400).send({"msg":"session_id is missing"});
        }

        const { session_id } = req.body;
        
        const chats = await req.app.get('models')['chats'].findAll({
            where: {
                session_id: session_id
            }
        });

        return res.status(200).send({
            msg: "success",
            data: chats || []
        });
    } catch (error) {
        console.error('Error fetching chats:', error);
        return res.status(500).send({
            msg: "Error fetching chats",
            error: error.message
        });
    }
};

module.exports = {
    generateSessionId,
    updateUserSession,
    getSessions,
    getChatsBasedOnSessionId    
};