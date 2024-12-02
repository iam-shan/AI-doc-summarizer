

exports.createSession = async (fileId) => {
    const sessionId = `session-${fileId}-${Date.now()}`;
    // Save session details in your relational database
    return sessionId;
};
