const config = {

    app: {
        port: process.env.PORT || 3000
    }, 

    db: {
        connectionUrl: process.env.MONGO_URL || 'mongodb+srv://sa:hola123@cluster0.dzend.mongodb.net/dbHireATutor?retryWrites=true&w=majority'
    }
}

module.exports = config;