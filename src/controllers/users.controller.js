export const getUserById = async (req, res) =>{
    const {id} = req.params;
    res.status(200).json(`user by id ${id}`);
};

export const createNewUser = async () =>{

    res.status(200).json('user created');
};

export const updateUserById = async () =>{
    const {id} = req.params;
    res.status(200).json(`user updated ${id}`);
};