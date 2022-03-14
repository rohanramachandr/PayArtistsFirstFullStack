module.exports = (req, res, next) => {
    if (!req.user){
        console.log("user not logged in");
        return res.status(401).send({ error: 'You must log in!' });
    }
    console.log("user logged in");
  
    next();

};