function validateCpf(req, res, next) {
    const { CPF } = req.body;
    if (CPF.length != 11) return res.status(400).json({ message: 'CPF precisa conter 11 digitos' });
    let findFriend = [];
};