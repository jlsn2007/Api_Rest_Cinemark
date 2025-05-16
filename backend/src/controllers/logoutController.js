const logoutController = {};

logoutController.logout = async (req, res) => {
    //Clean cookies to delete de token

    res.clearCookie("authToken");

    return res.json({ message: "Session closed" });

};

export default logoutController;